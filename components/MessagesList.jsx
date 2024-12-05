"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useIsAdmin } from "@/hooks/useIsAdmin";

const MessagesList = ({ messages }) => {
  const messagesEndRef = useRef(null);
  const isAdmin = useIsAdmin();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col pt-5 px-5 h-full overflow-y-auto">
      <div className="flex-1"></div>
      <div className="flex flex-col space-y-5">
        {messages.map((message) => {
          if (!message) return null;

          return (
            <div className="flex gap-2" key={message.id}>
              <div className="h-10 w-10 rounded-full shrink-0 overflow-hidden">
                <Image
                  src={
                    isAdmin
                      ? message.user_profile_picture
                      : message.user_anon_profile_picture
                  }
                  className={`h-full w-full object-cover ${
                    !isAdmin && "blur-sm"
                  }`}
                  alt={`${
                    isAdmin ? message.user_real_name : message.user_anon_name
                  } profile`}
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1
                    className={`font-bold select-none text-muted-foreground ${
                      !isAdmin && "blur-sm"
                    }`}
                  >
                    {isAdmin ? message.user_real_name : message.user_anon_name}
                  </h1>
                  <h1 className="text-sm text-muted-foreground select-none">
                    {(() => {
                      const date = new Date(message.created_at);
                      const now = new Date();
                      const diffInSeconds = Math.floor((now - date) / 1000);

                      if (diffInSeconds < 5) return "maintenant";

                      if (diffInSeconds < 60)
                        return `il y a ${diffInSeconds} secondes`;

                      if (date.toDateString() === now.toDateString()) {
                        return date.toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                      }

                      return date.toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                    })()}
                  </h1>
                </div>
                <p className="text-foreground break-all">{message.text}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessagesList;
