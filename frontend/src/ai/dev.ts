import { config } from 'dotenv';
config();

import { AIDrivenInsightsInput, AIDrivenInsightsOutput } from '@/ai/flows/ai-driven-insights-for-doctors';

// Import all flows to register them
import '@/ai/flows/ai-driven-insights-for-doctors.ts';

/**
 * A local mock AI service that provides static responses for development
 * when the actual AI service is unavailable.
 */
export async function mockAIService(input: AIDrivenInsightsInput): Promise<AIDrivenInsightsOutput> {
  // Simulate a brief delay to mimic API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { patientId, painScore, alerts } = input;
  
  // Generate appropriate recommendations based on pain score
  let insights = '';
  
  if (painScore >= 7) {
    insights = `Based on the high pain score (${painScore}/10), I recommend:
      1. Immediate reassessment of pain management protocol
      2. Consider increasing analgesic dosage (after checking contraindications)
      3. Evaluate for underlying causes of increased pain
      4. Schedule follow-up assessment within 24 hours`;
  } else if (painScore >= 4) {
    insights = `With a moderate pain score of ${painScore}/10:
      1. Continue current pain management regimen
      2. Monitor for changes in pain level
      3. Ensure patient is taking medication as prescribed
      4. Consider non-pharmacological interventions (relaxation, position changes)`;
  } else {
    insights = `Patient's pain appears well controlled (${painScore}/10):
      1. Maintain current treatment approach
      2. Gradually consider tapering pain medication if appropriate
      3. Document successful pain management strategies
      4. Educate patient on continuing self-management techniques`;
  }
  
  // Add information about alerts
  if (alerts.length > 0) {
    insights += `\n\nNote: Please address the following alerts: ${alerts.join(', ')}.`;
  }
  
  return { insights };
}