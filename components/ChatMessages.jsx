import React, { useEffect, useState } from "react";
import MessagesList from "./MessagesList";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ChatMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fonction pour récupérer les messages initialement
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select(
          "created_at, id, is_edit, text, user_anon_name, user_id, user_anon_profile_picture"
        )
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Erreur lors de la récupération des messages :", error);
      } else {
        setMessages(data);
      }
      setLoading(false);
    };

    fetchMessages();

    // Créer une chaîne pour la souscription en temps réel
    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new]);
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prevMessages) => {
            const updatedMessages = prevMessages.filter(
              (message) => message.id !== payload.old.id
            );
            console.log("Messages après suppression :", updatedMessages);
            return updatedMessages;
          });
        }
      )
      .subscribe();

    // Nettoyage de la souscription lors du démontage du composant
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return <MessagesList messages={messages} />;
}
