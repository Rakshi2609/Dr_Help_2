import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { env } from 'process';

// Load API key from environment or use a development fallback
const getApiKey = () => {
  const apiKey = env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;
  
  // For development/demo purposes only
  if (!apiKey) {
    console.warn('No Google API key found. Using development mode with potential limitations.');
  }
  
  return apiKey;
};

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: getApiKey(),
      options: {
        // Add timeout to prevent hanging requests
        timeout: 10000,
        // Add retry logic
        retry: {
          attempts: 2,
          backoff: 'exponential',
        },
      }
    }),
  ],
  // Use a simpler model as fallback if needed
  model: 'googleai/gemini-2.5-flash',
  // Add a default fallback timeout
  requestOptions: {
    timeout: 15000,
  },
});
