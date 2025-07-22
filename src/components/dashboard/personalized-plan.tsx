import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Bike, Apple, Brain } from "lucide-react";

const planItems = [
  {
    icon: Bike,
    title: "Workout Routine",
    content: "30-minute gentle stretching, 15-minute walk.",
  },
  {
    icon: Apple,
    title: "Nutrition Guidance",
    content: "Focus on anti-inflammatory foods. Include leafy greens and berries.",
  },
  {
    icon: Brain,
    title: "Wellness Tips",
    content: "10-minute mindfulness meditation in the morning.",
  },
];

export function PersonalizedPlan() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Personalized Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="item-0">
          {planItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-primary" />
                  <span>{item.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                  <p className="text-sm text-muted-foreground">{item.content}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
