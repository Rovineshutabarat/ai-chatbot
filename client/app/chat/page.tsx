"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Mic, Paperclip, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import ChatBubble from "@/components/features/chat/chat-bubble";

type Chat = {
  type: "USER" | "AI";
  content: string;
};

const ChatPage = () => {
  const [message, setMessage] = React.useState<string>("");
  const [chatList, setChatList] = React.useState<Chat[]>([]);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!scrollRef.current) return;

    const scrollEl = scrollRef.current.querySelector(
      "[data-radix-scroll-area-viewport]",
    );
    if (scrollEl) {
      (scrollEl as HTMLElement).scrollTo({
        top: (scrollEl as HTMLElement).scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatList]);

  async function handleSubmit() {
    if (!message.trim()) return;
    addChat({ type: "USER", content: message });
    setMessage("");

    setChatList((prev) => [...prev, { type: "AI", content: "" }]);

    const prompt = `
Kamu adalah asisten yang menulis jawaban dalam format Markdown yang rapi dan mudah dibaca.

Aturan format:
1. Gunakan heading (##) untuk setiap topik utama.
2. Gunakan list atau poin-poin jika menjelaskan langkah, kelebihan, atau jenis-jenis hal.
3. Gunakan paragraf pendek (maksimal 3 baris per paragraf).
4. Jika ada kode, bungkus dalam code block Markdown dengan bahasa yang sesuai. Contoh:
   \`\`\`javascript
   console.log("Hello");
   \`\`\`
5. Jangan buat teks terlalu panjang dalam satu baris agar tidak overflow pada tampilan web.
6. Hindari karakter yang bisa merusak tampilan HTML/React seperti <, > tanpa backtick.
7. Pastikan semua heading, list, dan kode terpisah oleh baris kosong agar tidak menempel.

Pertanyaan:
${message}
`;

    try {
      setIsProcessing(true);
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (!res.body) {
        console.error("Tidak ada stream dari server");
        return;
      }
      console.log(res);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;
        console.log(chunk);

        setChatList((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          if (updated[lastIndex].type === "AI") {
            updated[lastIndex] = {
              ...updated[lastIndex],
              content: updated[lastIndex].content + chunk,
            };
          }
          return updated;
        });
      }
    } catch (e) {
      setIsProcessing(false);
      addChat({ type: "AI", content: "Something went wrong." });
    } finally {
      setIsProcessing(false);
    }
  }

  const addChat = (newChat: Chat) => {
    setChatList((prev) => [...prev, newChat]);
  };

  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      await handleSubmit();
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-hidden">
        <ScrollArea ref={scrollRef} className="h-full p-6">
          <div className="mx-auto max-w-5xl space-y-6">
            {chatList.map((chat, index) => (
              <ChatBubble key={index} type={chat.type} content={chat.content} />
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="border-t p-6">
        <div className="mx-auto max-w-4xl">
          <div className="bg-muted flex items-center gap-2 rounded-4xl border px-5 py-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 cursor-pointer"
            >
              <Paperclip className="h-4 w-4" />
            </Button>

            <Input
              placeholder="Ask me anything..."
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 cursor-pointer"
            >
              <Mic className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              className="h-8 w-8 p-0 cursor-pointer"
              onClick={handleSubmit}
              disabled={!message.trim() || isProcessing}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
