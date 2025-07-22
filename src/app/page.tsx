import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { PainEntryDialog } from "@/components/dashboard/pain-entry-dialog";
import { PersonalizedPlan } from "@/components/dashboard/personalized-plan";
import { AdaptivePlanCard } from "@/components/dashboard/adaptive-plan-card";
import { TelehealthCard } from "@/components/dashboard/telehealth-card";
import { MessagingCard } from "@/components/dashboard/messaging-card";
import { HeartPulse, Activity, Bed } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <DashboardHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Welcome back, Alex
            </h1>
            <p className="mt-1 text-muted-foreground">
              Here's your health summary for today.
            </p>
          </div>
          <PainEntryDialog />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            title="Pain Level"
            value="4/10"
            trend="10% decrease"
            trendDirection="down"
            icon={HeartPulse}
            iconColor="text-red-500"
          />
          <SummaryCard
            title="Activity"
            value="45 mins"
            trend="5% increase"
            trendDirection="up"
            icon={Activity}
            iconColor="text-green-500"
          />
          <SummaryCard
            title="Sleep"
            value="7.5 hrs"
            trend="Stable"
            trendDirection="up"
            icon={Bed}
            iconColor="text-blue-500"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AdaptivePlanCard />
          </div>
          <div className="space-y-8 lg:col-span-1">
            <PersonalizedPlan />
            <TelehealthCard />
            <MessagingCard />
          </div>
        </div>
      </main>
    </div>
  );
}
