import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Plus } from "lucide-react";

const appointments = [
  {
    doctor: "Dr. Evelyn Reed",
    specialty: "Pain Specialist",
    date: "2024-08-15",
    time: "10:30 AM",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "doctor woman"
  },
  {
    doctor: "Mark Chen, PT",
    specialty: "Physical Therapist",
    date: "2024-08-22",
    time: "02:00 PM",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "doctor man"
  },
];

export function TelehealthCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Telehealth</CardTitle>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Log a Call
        </Button>
      </CardHeader>
      <CardContent>
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">
          Upcoming Appointments
        </h3>
        <ul className="space-y-4">
          {appointments.map((appt, index) => (
            <li key={index} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={appt.avatar} data-ai-hint={appt.avatarHint} />
                <AvatarFallback>{appt.doctor.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{appt.doctor}</p>
                <p className="text-sm text-muted-foreground">{appt.specialty}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{appt.time}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(appt.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
