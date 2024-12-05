"use client";

import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { toast } from "sonner";
export default function Home() {
  const user = useUser();
  useEffect(() => {
    // Ajout d'un petit délai pour s'assurer que le composant toast est monté
    setTimeout(() => {
      toast.message(
        "Le site peut présenter des ralentissements dans le chargement des messages dans les prochains jours."
      );
    }, 100);
  }, []);
  return (
    <div className="max-w-3xl mx-auto md:py-10 h-dvh">
      <div className="h-full border rounded-md flex flex-col">
        <ChatHeader />
        {/* {user.isSignedIn && <ChatMessages />} */}
        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  );
}
