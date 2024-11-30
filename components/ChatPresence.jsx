import { supabaseBrowser } from "@/lib/supabase/browser";
import React, { useEffect, useState } from "react";

const ChatPresence = () => {
  const supabase = supabaseBrowser();
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    const channel = supabase.channel("messages", {
      config: {
        presence: {
          key: "user",
        },
      },
    });
    channel
      .on("presence", { event: "sync" }, () => {
        const presenceState = channel.presenceState();
        // Vérifier le nombre d'utilisateurs dans l'état de présence
        const userCount = Object.values(presenceState).reduce(
          (total, users) => {
            return total + users.length;
          },
          0
        );
        setOnlineCount(userCount);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
      <h1 className="text-sm text-neutral-400">
        {onlineCount}{" "}
        {onlineCount == 1 ? "personne en ligne" : "personnes en ligne"}
      </h1>
    </div>
  );
};

export default ChatPresence;
