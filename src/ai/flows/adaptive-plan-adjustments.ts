// src/ai/flows/adaptive-plan-adjustments.ts
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
import {z} from 'genkit';

// Define the input schema
const AdaptivePlanAdjustmentsInputSchema = z.object({
  recentPainLevels: z
    .array(z.number())
    .describe('An array of recent pain levels (1-10), with the most recent pain level at the end of the array.'),
  activityData: z
    .string()
    .describe('A summary of the user recent activities and exercises, including duration and intensity.'),
  medicationAdherence: z
    .number()
    .describe('A number (0-1) representing the user medication adherence, where 1 means 100% adherence.'),
  currentPlan: z
    .string()
    .describe('The user current daily plan, including workout routines, nutrition guidance and wellness tips.'),
});
export type AdaptivePlanAdjustmentsInput = z.infer<typeof AdaptivePlanAdjustmentsInputSchema>;

// Define the output schema
const AdaptivePlanAdjustmentsOutputSchema = z.object({
  suggestedAdjustments: z
    .string()
    .describe('A string containing the AI suggested adjustments to the user current daily plan.'),
});
export type AdaptivePlanAdjustmentsOutput = z.infer<typeof AdaptivePlanAdjustmentsOutputSchema>;

// Define the main function
export async function adaptivePlanAdjustments(
  input: AdaptivePlanAdjustmentsInput
): Promise<AdaptivePlanAdjustmentsOutput> {
  return adaptivePlanAdjustmentsFlow(input);
}

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

// Define the flow
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
