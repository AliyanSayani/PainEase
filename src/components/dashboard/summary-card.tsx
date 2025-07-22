import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import type { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

type SummaryCardProps = {
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
  iconColor: string;
};

export function SummaryCard({
  title,
  value,
  trend,
  trendDirection,
  icon: Icon,
  iconColor,
}: SummaryCardProps) {
  const TrendIcon = trendDirection === "up" ? ArrowUp : ArrowDown;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("h-5 w-5", iconColor)} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="flex items-center text-xs text-muted-foreground">
          <TrendIcon
            className={cn(
              "mr-1 h-3 w-3",
              trendDirection === "up" ? "text-green-600" : "text-red-600"
            )}
          />
          <span
            className={cn(
              "mr-1 font-semibold",
              trendDirection === "up" ? "text-green-600" : "text-red-600"
            )}
          >
            {trend}
          </span>
          vs last week
        </p>
      </CardContent>
    </Card>
  );
}
