"use client";

import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import { Input } from "@/components/ui/input";
export default function Home() {
  return (
    <div className="max-w-3xl mx-auto md:py-10 h-dvh">
      <div className="h-full border rounded-md flex flex-col">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  );
}
