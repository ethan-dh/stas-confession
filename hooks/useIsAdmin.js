import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export function useIsAdmin() {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const admin_ids = [
      "user_2pZYxSJBq2cDJIg0cg10LctkFa7",
      "user_2peiXDr9ZRKpLZzZqdNcwnmqeHj",
    ];
    setIsAdmin(user && admin_ids.includes(user?.id));
  }, [user]);

  return isAdmin;
}
