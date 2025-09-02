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

export async function getAIDrivenInsights(input: AIDrivenInsightsInput): Promise<AIDrivenInsightsOutput> {
  return aiDrivenInsightsFlow(input);
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

const aiDrivenInsightsFlow = ai.defineFlow(
  {
    name: 'aiDrivenInsightsFlow',
    inputSchema: AIDrivenInsightsInputSchema,
    outputSchema: AIDrivenInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
