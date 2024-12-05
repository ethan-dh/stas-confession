import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export function useIsAdmin() {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user?.publicMetadata?.admin) {
      setIsAdmin(true);
      return;
    }
    const admin_ids = [
      "user_2pZYxSJBq2cDJIg0cg10LctkFa7",
      "user_2peiXDr9ZRKpLZzZqdNcwnmqeHj",
      "user_2pZpbEkEEPAlbjjpokvktkwzyN4",
    ];
    setIsAdmin(user && admin_ids.includes(user?.id));
  }, [user]);

  return isAdmin;
}
