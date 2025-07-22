"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";

export function PainEntryDialog() {
  const [painLevel, setPainLevel] = useState([5]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Log Pain Level
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log Your Pain</DialogTitle>
          <DialogDescription>
            Track your pain level for today. This helps in personalizing your
            plan.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="pain-level">Pain Level</Label>
              <span className="font-semibold text-primary">{painLevel[0]}/10</span>
            </div>
            <Slider
              id="pain-level"
              min={0}
              max={10}
              step={1}
              value={painLevel}
              onValueChange={setPainLevel}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="e.g., sharp pain in the lower back after sitting."
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Log</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
