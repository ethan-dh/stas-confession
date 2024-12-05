"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useIsAdmin } from "@/hooks/useIsAdmin";

const MessagesList = ({ messages, deleteMessage }) => {
  const messagesEndRef = useRef(null);
  const isAdmin = useIsAdmin();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fonction de confirmation de suppression
  const handleDelete = (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
      deleteMessage(id);
    }
  };

  return (
    <div className="flex-1 flex flex-col pt-5 px-5 h-full overflow-y-auto">
      <div className="flex-1"></div>
      <div className="flex flex-col space-y-5">
        {messages.map((message) => {
          if (!message) return null;

          const isSenderAdmin = message.is_admin;

          return (
            <div className="flex gap-2" key={message.id}>
              <div className="h-10 w-10 rounded-full shrink-0 overflow-hidden">
                <Image
                  src={
                    isAdmin
                      ? message.user_profile_picture
                      : message.user_anon_profile_picture
                  }
                  className={`h-full w-full object-cover `}
                  alt={`${
                    isAdmin ? message.user_real_name : message.user_anon_name
                  } profile`}
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1
                    className={`font-bold select-none text-muted-foreground ${
                      !isAdmin && "blur-sm"
                    }`}
                  >
                    {isAdmin ? message.user_real_name : message.user_anon_name}
                  </h1>
                  {isSenderAdmin && (
                    <span className="ml-2 px-2 py-0.5 bg-blue-500 text-white text-xs rounded">
                      Admin
                    </span>
                  )}
                  <div className="flex items-center space-x-2">
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
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(message.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Supprimer le message"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
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
