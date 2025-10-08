import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Mic, Paperclip, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import ChatBubble from "@/components/features/chat/chat-bubble";

const ChatPage = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-6">
          <div className="mx-auto max-w-5xl space-y-6">
            <ChatBubble
              type="USER"
              content=" User message example kjasbdkjabsdkjbasdkjbdkj Lorem
                          ipsum dolor sit amet, consectetur adipisicing elit.
                          Blanditiis in natus nihil nostrum odio omnis quasi,
                          recusandae sint voluptates! Possimus. Lorem ipsum
                          dolor sit amet, consectetur adipisicing elit. Culpa
                          facere, libero. Dicta doloribus earum nulla pariatur
                          sint sit velit voluptatum."
            />
            <ChatBubble
              type="AI"
              content=" User message example kjasbdkjabsdkjbasdkjbdkj Lorem
                          ipsum dolor sit amet, consectetur adipisicing elit.
                          Blanditiis in natus nihil nostrum odio omnis quasi,
                          recusandae sint voluptates! Possimus. Lorem ipsum
                          dolor sit amet, consectetur adipisicing elit. Culpa
                          facere, libero. Dicta doloribus earum nulla pariatur
                          sint sit velit voluptatum."
            />
            <ChatBubble
              type="USER"
              content=" User message example kjasbdkjabsdkjbasdkjbdkj Lorem
                          ipsum dolor sit amet, consectetur adipisicing elit.
                          Blanditiis in natus nihil nostrum odio omnis quasi,
                          recusandae sint voluptates! Possimus. Lorem ipsum
                          dolor sit amet, consectetur adipisicing elit. Culpa
                          facere, libero. Dicta doloribus earum nulla pariatur
                          sint sit velit voluptatum."
            />
            <ChatBubble
              type="AI"
              content=" User message example kjasbdkjabsdkjbasdkjbdkj Lorem
                          ipsum dolor sit amet, consectetur adipisicing elit.
                          Blanditiis in natus nihil nostrum odio omnis quasi,
                          recusandae sint voluptates! Possimus. Lorem ipsum
                          dolor sit amet, consectetur adipisicing elit. Culpa
                          facere, libero. Dicta doloribus earum nulla pariatur
                          sint sit velit voluptatum."
            />
          </div>
        </ScrollArea>
      </div>

      {/* Input area */}
      <div className="border-t p-6">
        <div className="mx-auto max-w-4xl">
          <div className="bg-muted flex items-center gap-2 rounded-4xl border px-5 py-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 cursor-pointer"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Ask me anything..."
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 cursor-pointer"
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button size="sm" className="h-8 w-8 p-0 cursor-pointer">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
