"use client";

import React from "react";
import { Input } from "./ui/input";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useIsAdmin } from "@/hooks/useIsAdmin";

const ChatInput = () => {
  const supabase = supabaseBrowser();
  const { user } = useUser();
  const isAdmin = useIsAdmin();
  const [isAdminChecked, setIsAdminChecked] = React.useState(false);

  const handleSendMessage = async (text) => {
    const generateAnonName = (username) => {
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

      // Utiliser le nom d'utilisateur comme seed pour la génération aléatoire
      const getRandomChar = (index) => {
        let hash = 0;
        const str = username + index.toString();
        for (let i = 0; i < str.length; i++) {
          hash = (hash << 5) - hash + str.charCodeAt(i);
          hash = hash & hash;
        }
        return chars[Math.abs(hash) % chars.length];
      };

      return username
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          return getRandomChar(index);
        })
        .join("");
    };

    const generateAnonProfilePicture = (userId) => {
      return `https://picsum.photos/seed/${userId}/128`;
    };

    const { error } = await supabase.from("messages").insert({
      text: text,
      user_id: user.id,
      user_real_name: user.fullName,
      user_anon_name: generateAnonName(user.fullName),
      user_profile_picture: user.imageUrl,
      user_anon_profile_picture: generateAnonProfilePicture(user.id),
      is_admin: isAdminChecked,
    });
    if (error) {
      toast.message(error.message);
    }
  };

  return (
    <div className="p-5">
      {isAdmin && (
        <div className="mb-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isAdminChecked}
              onChange={(e) => setIsAdminChecked(e.target.checked)}
              className="mr-2"
            />
            Marquer comme admin
          </label>
        </div>
      )}
      <Input
        disabled={!user}
        placeholder={!user ? "Veuillez vous connecter" : "Envoyer un message"}
        enterKeyHint="send"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = "";
            if (isAdmin) {
              setIsAdminChecked(false);
            }
          }
        }}
      />
    </div>
  );
};

export default ChatInput;
