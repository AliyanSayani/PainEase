'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting adaptive adjustments to a user's daily plan
 * based on their pain levels, activity data, and medication adherence.
 *
 * - adaptivePlanAdjustments - A function that takes user data and suggests plan adjustments.
 * - AdaptivePlanAdjustmentsInput - The input type for the adaptivePlanAdjustments function.
 * - AdaptivePlanAdjustmentsOutput - The output type for the adaptivePlanAdjustments function.
 */

import {ai} from '@/ai/genkit';
import {
  AdaptivePlanAdjustmentsInputSchema,
  type AdaptivePlanAdjustmentsInput,
  AdaptivePlanAdjustmentsOutputSchema,
  type AdaptivePlanAdjustmentsOutput,
} from '@/ai/schemas/adaptive-plan-adjustments';


const prompt = ai.definePrompt({
  name: 'adaptivePlanAdjustmentsPrompt',
  input: {schema: AdaptivePlanAdjustmentsInputSchema},
  output: {schema: AdaptivePlanAdjustmentsOutputSchema},
  prompt: `You are an AI assistant specializing in pain management.

You are helping a user to optimize their daily plan based on their recent pain levels, activity data and medication adherence.

Based on the following information, suggest personalized adjustments to the user daily plan. Focus on adjustments that can help optimize their pain management strategy and improve overall well-being.

Recent Pain Levels: {{{recentPainLevels}}}
Activity Data: {{{activityData}}}
Medication Adherence: {{{medicationAdherence}}}
Current Plan: {{{currentPlan}}}

Suggested Adjustments:`,
});

const adaptivePlanAdjustmentsFlow = ai.defineFlow(
  {
    name: 'adaptivePlanAdjustmentsFlow',
    inputSchema: AdaptivePlanAdjustmentsInputSchema,
    outputSchema: AdaptivePlanAdjustmentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

export async function adaptivePlanAdjustments(
  input: AdaptivePlanAdjustmentsInput
): Promise<AdaptivePlanAdjustmentsOutput> {
  return adaptivePlanAdjustmentsFlow(input);
}
