"use server";

import {
  adaptivePlanAdjustments,
  type AdaptivePlanAdjustmentsInput,
  type AdaptivePlanAdjustmentsOutput,
} from "@/ai/flows/adaptive-plan-adjustments";

export async function getAdaptivePlanAdjustments(
  input: AdaptivePlanAdjustmentsInput
): Promise<{ data?: AdaptivePlanAdjustmentsOutput; error?: string }> {
  try {
    const output = await adaptivePlanAdjustments(input);
    return { data: output };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || "An unknown error occurred." };
  }
}
