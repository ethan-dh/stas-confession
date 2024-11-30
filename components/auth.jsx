import React, { useState } from "react";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        <p className="flex items-center gap-2">
          Se connecter <LogIn />
        </p>
      </Button>

      {showModal && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
          <div className="bg-background p-8 rounded-lg shadow-xl relative border ">
            <Button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4"
            >
              ✕
            </Button>

            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-center">
                <h1 className="text-2xl font-bold">Connectez vous</h1>
                <span className="text-sm text-muted-foreground">
                  C&apos;est 100% anonyme
                </span>
              </div>
              <SignIn />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;

// <>
//   <SignedIn>
//     <Button>Se connecter</Button>
//   </SignedIn>

//   <SignedOut>
//     <Button>Se connecter</Button>
//   </SignedOut>
// </>
