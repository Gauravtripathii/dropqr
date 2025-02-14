"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import axios from "axios";

export default function Auth() {
  const { data, status } = useSession();

  const handleSignIn = async (platform) => {
    await signIn(platform);
  }

  const handleSignout = async () => {
    await signOut()
    .then(() => {
        const mongoSignout = async () => {
            await axios.get("/api/auth/mongosignout")
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        }
        mongoSignout();
    });
  }

  React.useEffect(() => {
    if (status === "authenticated") {
      console.log("Successfully logged in!");
      console.log(status, data.user.name, data.user.email);

      const handleAuth = async (name, email) => {
        await axios.post("/api/auth/verifiedSignup", { name, email })
        .then(response => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
      }
      handleAuth(data.user.name, data.user.email);
    }
  }, [status]);

  // console.log(data)
  return (
    <div className="flex flex-col w-screen h-[100svh] items-center justify-center">

      {
        status === "authenticated" ?
          <div className="">
            <button onClick={() => handleSignout()}>Signout</button>
          </div> :
          <div className="flex flex-col gap-5 text-3xl">
            <button onClick={() => handleSignIn("google")}>Signin with google</button>
            <button onClick={() => handleSignIn("github")}>Signin with github</button>
          </div>
      }

    </div>
  );
}