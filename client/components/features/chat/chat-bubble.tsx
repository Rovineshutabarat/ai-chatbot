import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Copy, Share, ThumbsDown, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatBubbleProps = {
  type: "USER" | "AI";
  content: string;
};

const ChatBubble = ({ type, content }: ChatBubbleProps) => {
  const isUser = type === "USER";

  return (
    <div
      className={cn(
        "flex gap-4 items-start",
        isUser && "justify-end flex-row-reverse",
      )}
    >
      <Avatar>
        <AvatarFallback className={cn(isUser ? "bg-primary text-black" : "")}>
          {isUser ? "U" : "AI"}
        </AvatarFallback>
      </Avatar>

      <div className={cn("flex flex-1", isUser && "justify-end")}>
        <div
          className={cn(
            "rounded-2xl border p-4 max-w-3xl font-sans",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground",
          )}
        >
          <p className="mb-4">{content}</p>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 cursor-pointer"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 cursor-pointer"
            >
              <Share className="h-4 w-4" />
            </Button>
            {!isUser && (
              <div className="ml-auto flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 cursor-pointer"
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 cursor-pointer"
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
