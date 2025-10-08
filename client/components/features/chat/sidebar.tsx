"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  MessageCircle,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

const Sidebar = () => {
  const { session, logout, isLoading } = useAuth();

  return (
    <div className="bg-muted flex w-80 flex-col border-r min-h-screen justify-between">
      {/* Header + Chat list */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="border-b p-4">
          <Button className="w-full cursor-pointer">
            <Plus />
            New Chat
          </Button>
        </div>

        {/* Chat list */}
        <div className="flex min-h-0 flex-col">
          <div className="px-4 py-2">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
                Recent Chats
              </h3>
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input placeholder="Search chats..." className="text-sm" />
          </div>

          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-1 pb-4">
                {[...Array(5)].map((_, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="h-auto w-full justify-start p-3 text-left cursor-pointer"
                  >
                    <div className="flex w-full items-start gap-2">
                      <MessageCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">
                          Example Chat {i + 1}
                        </div>
                        <div className="text-muted-foreground mt-0.5 truncate text-xs">
                          Short preview text...
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Footer / Avatar section */}
      <div className="border-t p-3">
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex w-full items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-accent transition">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={""}
                    alt={session.user.username}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg uppercase bg-primary text-primary-foreground">
                    {session.user.username?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>


                <div className="flex flex-1 flex-col text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {session.user.username}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {session.user.email}
                  </span>
                </div>

                <ChevronsUpDown className="size-4 ml-auto text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={""}
                      alt={session.user.username}
                    />
                    <AvatarFallback className="rounded-lg uppercase bg-primary">
                      {session.user.username?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {session.user.username}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {session.user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sparkles />
                  Upgrade to Pro
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
                disabled={isLoading}
                className="cursor-pointer"
              >
                <LogOut />
                {isLoading ? "Please wait..." : "Log out"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">
              You are not logged in
            </p>
            <Link href="/auth/login" className="w-full">
              <Button className="w-full cursor-pointer">Login / Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
