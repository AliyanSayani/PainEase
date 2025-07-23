import {config} from 'dotenv';
config({path: '.env'});

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// This is the entrypoint for Genkit's dev server.
export default genkit({
  plugins: [googleAI({apiKey: process.env.GEMINI_API_KEY})],
  // The model to use for the prompt.
  model: 'googleai/gemini-1.5-flash-latest',
  // Log all traces to the console.
  traceStore: 'dev',
  // In a dev environment, use the dev-only-not-for-production-use-dotprompt-registry.
  dotprompt: {
    registry: 'dev',
  },
});
