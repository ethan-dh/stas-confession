"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const MessagesList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col p-5 h-full overflow-y-auto">
      <div className="flex-1"></div>
      <div className="flex flex-col space-y-5">
        {messages.map((message) => {
          if (!message) return null;

          return (
            <div className="flex gap-2" key={message.id}>
              <div className="h-10 w-10 rounded-full shrink-0 overflow-hidden">
                <img
                  src={message.user_anon_profile_picture}
                  className="h-full w-full object-cover"
                  alt={`${message.user_anon_name} profile`}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold select-none">
                    {message.user_anon_name}
                  </h1>
                  <h1 className="text-sm text-muted select-none">
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
                <p className="text-muted-foreground break-all">
                  {message.text}
                </p>
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
