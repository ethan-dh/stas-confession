import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs";
import React from "react";
import Auth from "./auth";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import ChatPresence from "./ChatPresence";

const ChatHeader = () => {
  return (
    <div className="h-20">
      <div className="p-5 border-b flex items-center justify-between h-full">
        <div>
          <h1 className="text-xl font-bold">StAs Confession</h1>
          <ChatPresence />
        </div>
        <SignedOut>
          <Auth />
        </SignedOut>
        <SignedIn>
          <UserButton />
          {/* <Button>
            <SignOutButton>
              <p className="flex items-center gap-2">
                Se déconnecter <LogOut />
              </p>
            </SignOutButton>
          </Button> */}
        </SignedIn>
      </div>
    </div>
  );
};

export default ChatHeader;
