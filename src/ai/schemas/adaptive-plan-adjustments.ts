import {z} from 'zod';

// Define the input schema
export const AdaptivePlanAdjustmentsInputSchema = z.object({
  recentPainLevels: z
    .array(z.number())
    .describe(
      'An array of recent pain levels (1-10), with the most recent pain level at the end of the array.'
    ),
  activityData: z
    .string()
    .describe(
      'A summary of the user recent activities and exercises, including duration and intensity.'
    ),
  medicationAdherence: z
    .number()
    .describe(
      'A number (0-1) representing the user medication adherence, where 1 means 100% adherence.'
    ),
  currentPlan: z
    .string()
    .describe(
      'The user current daily plan, including workout routines, nutrition guidance and wellness tips.'
    ),
});
export type AdaptivePlanAdjustmentsInput = z.infer<
  typeof AdaptivePlanAdjustmentsInputSchema
>;

// Define the output schema
export const AdaptivePlanAdjustmentsOutputSchema = z.object({
  suggestedAdjustments: z
    .string()
    .describe(
      'A string containing the AI suggested adjustments to the user current daily plan.'
    ),
});
export type AdaptivePlanAdjustmentsOutput = z.infer<
  typeof AdaptivePlanAdjustmentsOutputSchema
>;
