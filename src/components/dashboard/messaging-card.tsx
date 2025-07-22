import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const contacts = [
  {
    name: "Care Team",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "medical team",
    online: true,
  },
  {
    name: "Sarah (Coach)",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "woman coach",
    online: false,
  },
];

export function MessagingCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>In-App Messaging</CardTitle>
        <Button variant="ghost" size="icon">
          <Send className="h-5 w-5 text-muted-foreground" />
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {contacts.map((contact, index) => (
            <li key={index} className="flex items-center gap-4">
              <Avatar className="relative">
                <AvatarImage src={contact.avatar} data-ai-hint={contact.avatarHint} />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                {contact.online && (
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-card" />
                )}
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{contact.name}</p>
              </div>
              {contact.name === "Care Team" && (
                <Badge variant="secondary">2 New</Badge>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
