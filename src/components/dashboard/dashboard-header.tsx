"use client";

import {
  Bell,
  HeartHandshake,
  LayoutGrid,
  MessageSquare,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card">
      <div className="container flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-2">
          <HeartHandshake className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold text-primary">PainEase</h1>
        </div>

        <nav className="hidden items-center space-x-4 md:flex">
          <Button variant="ghost" className="text-foreground">
            <LayoutGrid className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="text-muted-foreground">
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </Button>
          <Button variant="ghost" className="text-muted-foreground">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>

        <div className="flex items-center justify-end space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <p className="text-sm">Your plan was updated by your coach.</p>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <p className="text-sm">New message from Dr. Smith.</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="https://placehold.co/100x100.png"
                    alt="User avatar"
                    data-ai-hint="person avatar"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
