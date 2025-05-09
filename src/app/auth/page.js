"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import axios from "axios";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Auth() {
  const router = useRouter();

  const { data, status } = useSession();

  const handleSignIn = async (platform) => {
    await signIn(platform);
  }

  const handleSignout = async () => {
    await signOut()
  }

  React.useEffect(() => {
    if (status === "authenticated") {
      // console.log(status, data.user.name, data.user.email);

      const handleAuth = async (name, email) => {
        await axios.post("/api/auth/verifiedSignup", { name, email })
          .then(response => {
            // console.log("verified signup success", response);
            // router.push("/upload");
            setTimeout(() => {
              // console.log("Redirecting now...");
              // redirect("/upload");
              // router.refresh();
              router.push("/upload");
            }, 1000);
          })
          .catch((error) => {
            // console.log("verified signup error", error);
            if (error.response.status === 500) {
              toast.error("An error occurred, please try again!");
            } else if (error.response.status === 409) {
              toast.error("User already exists, please login!");
            }
          });
      }
      handleAuth(data.user.name, data.user.email);
    }
    else if (status === "unauthenticated") {
      const mongoSignout = async () => {
        await axios.get("/api/auth/mongosignout")
          .then(response => {
            // console.log(response);
          })
          .catch(error => {
            // console.log(error);
            toast.error("An error occurred, please try again!");
          });
      }
      mongoSignout();
    }
  }, [status]);

  // console.log(data)
  return (
    <div className="flex flex-col w-screen h-[100svh] items-center justify-center p-5">

      {
        status === "authenticated" ?
          <div className="text-2xl text-center">
            <Image alt="who are you meme" src="/gold-chain-welcome.gif" width={500} height={500} />
            <p className="flex flex-col">
              <span>Redirecting...</span>
              <span>(If not working, <Link href="/upload" className="underline">click here</Link>)</span>
            </p>
          </div> :
          <div className="flex flex-col gap-5 text-3xl border rounded-md p-5">
            <Image alt="who are you meme" src="/wait-a-minute-who-are-you.gif" width={500} height={500} />
            <button onClick={() => handleSignIn("google")}>Continue with Google</button>
            <button onClick={() => handleSignIn("github")}>Continue with GitHub</button>
          </div>
      }

    </div>
  );
}