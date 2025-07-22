"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import { getAdaptivePlanAdjustments } from "@/app/actions";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  recentPainLevels: z.string().min(1, "Please enter at least one pain level."),
  activityData: z.string().min(10, "Please describe your recent activity."),
  medicationAdherence: z.number().min(0).max(1),
  currentPlan: z.string().min(10, "Please describe your current plan."),
});

type FormValues = z.infer<typeof formSchema>;

export function AdaptivePlanCard() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [adjustment, setAdjustment] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recentPainLevels: "4, 5, 4",
      activityData: "Walked for 20 minutes, did gentle yoga for 15 minutes.",
      medicationAdherence: 0.8,
      currentPlan: "Morning: 30-min gentle stretching, 15-min walk. Afternoon: Rest. Nutrition: Anti-inflammatory diet. Wellness: 10-min mindfulness.",
    },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      setAdjustment(null);
      const painLevels = values.recentPainLevels.split(",").map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
      
      if (painLevels.length === 0) {
        form.setError("recentPainLevels", { message: "Please enter valid, comma-separated numbers." });
        return;
      }

      const result = await getAdaptivePlanAdjustments({
        ...values,
        recentPainLevels: painLevels,
      });

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      } else if (result.data) {
        setAdjustment(result.data.suggestedAdjustments);
      }
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Adaptive Plan Adjustments</CardTitle>
            <CardDescription>
              Let our AI suggest improvements to your plan based on your recent data.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="recentPainLevels"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recent Pain Levels (1-10)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 4, 5, 4" {...field} />
                    </FormControl>
                    <FormDescription>Comma-separated values.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="medicationAdherence"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>Medication Adherence</FormLabel>
                      <span className="text-sm font-medium text-primary">
                        {Math.round(field.value * 100)}%
                      </span>
                    </div>
                    <FormControl>
                      <Slider
                        min={0}
                        max={1}
                        step={0.1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="activityData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Data</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your recent activities..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentPlan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Plan</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your current plan..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-xs text-muted-foreground">Powered by GenAI</p>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Suggestions
            </Button>
          </CardFooter>
        </form>
      </Form>

      {isPending && (
        <div className="p-6 pt-0">
          <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
              <div className="space-y-2">
                  <p className="text-sm font-medium">AI is analyzing your data...</p>
                  <p className="text-sm text-muted-foreground">This may take a moment.</p>
              </div>
          </div>
        </div>
      )}

      {adjustment && (
        <div className="p-6 pt-0">
          <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertTitle>Suggested Adjustments</AlertTitle>
            <AlertDescription className="prose prose-sm dark:prose-invert">
              {adjustment}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </Card>
  );
}
