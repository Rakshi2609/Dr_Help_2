'use server';
/**
 * @fileOverview An AI-driven insights tool for doctors, providing recommendations based on patient data.
 *
 * - getAIDrivenInsights - A function that retrieves AI-driven insights and recommendations for a patient.
 * - AIDrivenInsightsInput - The input type for the getAIDrivenInsights function.
 * - AIDrivenInsightsOutput - The return type for the getAIDrivenInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIDrivenInsightsInputSchema = z.object({
  patientId: z.string().describe('The ID of the patient.'),
  vitalsSummary: z.string().describe('A summary of the patient vitals.'),
  painScore: z.number().describe('The current pain score of the patient.'),
  alerts: z.array(z.string()).describe('A list of alerts for the patient.'),
});
export type AIDrivenInsightsInput = z.infer<typeof AIDrivenInsightsInputSchema>;

const AIDrivenInsightsOutputSchema = z.object({
  insights: z.string().describe('AI-driven insights and recommendations for the patient.'),
});
export type AIDrivenInsightsOutput = z.infer<typeof AIDrivenInsightsOutputSchema>;

import { mockAIService } from '@/ai/dev';

export async function getAIDrivenInsights(input: AIDrivenInsightsInput): Promise<AIDrivenInsightsOutput> {
  try {
    // First try the AI flow
    try {
      return await aiDrivenInsightsFlow(input);
    } catch (aiError) {
      console.warn('Primary AI flow failed, trying fallback service:', aiError);
      
      // If we're in development mode or AI service fails, use our mock service
      if (process.env.NODE_ENV === 'development' || !process.env.GOOGLE_API_KEY) {
        return await mockAIService(input);
      }
      
      // If all else fails, generate basic insights
      throw aiError; // Re-throw to trigger the catch below
    }
  } catch (error) {
    console.error('All AI services failed:', error);
    // Return very basic fallback insights when everything fails
    return {
      insights: `Based on the patient's pain score (${input.painScore}) and vitals data, consider reviewing current pain management protocol. ${
        input.alerts.length > 0 ? `Note that the following alerts require attention: ${input.alerts.join(', ')}.` : ''
      }`
    };
  }
}

const prompt = ai.definePrompt({
  name: 'aiDrivenInsightsPrompt',
  input: {schema: AIDrivenInsightsInputSchema},
  output: {schema: AIDrivenInsightsOutputSchema},
  prompt: `You are an AI assistant providing insights for doctors.

  Based on the following patient data, provide potential recommendations:

  Patient ID: {{{patientId}}}
  Vitals Summary: {{{vitalsSummary}}}
  Pain Score: {{{painScore}}}
  Alerts: {{#each alerts}}{{{this}}}\n{{/each}}

  Provide your insights and recommendations in a concise manner.
  `,
});

// Helper function to generate insights locally when API fails
function generateFallbackInsights(input: AIDrivenInsightsInput): AIDrivenInsightsOutput {
  const { painScore, alerts } = input;
  
  // Generate appropriate recommendations based on pain level
  let recommendations = '';
  
  if (painScore >= 7) {
    recommendations = `The patient is reporting a high pain score of ${painScore}. Consider immediate assessment and possible adjustment of pain medication.`;
  } else if (painScore >= 4) {
    recommendations = `The patient is reporting moderate pain (${painScore}/10). Regular monitoring and scheduled pain medication is advised.`;
  } else {
    recommendations = `The patient's pain appears to be under control (${painScore}/10). Continue current treatment plan and monitor for changes.`;
  }
  
  // Add alert-specific recommendations
  if (alerts.length > 0) {
    recommendations += ` Patient has ${alerts.length} active alert(s) that require attention: ${alerts.join(', ')}.`;
  }
  
  return {
    insights: recommendations
  };
}

const aiDrivenInsightsFlow = ai.defineFlow(
  {
    name: 'aiDrivenInsightsFlow',
    inputSchema: AIDrivenInsightsInputSchema,
    outputSchema: AIDrivenInsightsOutputSchema,
    // Set timeout to avoid hanging
    timeout: 5000,
  },
  async input => {
    try {
      // Try to get insights from the AI model
      const {output} = await prompt(input);
      return output!;
    } catch (error) {
      // Log error and use fallback
      console.error('AI model error:', error);
      return generateFallbackInsights(input);
    }
  }
);
