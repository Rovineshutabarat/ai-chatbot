import React from "react";
import Sidebar from "@/components/features/chat/sidebar";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function ChatLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      {children}
    </div>
  );
}
