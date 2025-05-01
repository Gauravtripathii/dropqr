"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
                // console.log(response);
                toast.success("Logged out successfully!");
            })
            .catch(error => {
                // console.log(error);
                toast.error("An error occurred, please try again!");
            });
        }
        mongoSignout();
    });
  }

  React.useEffect(() => {
    if (status === "authenticated") {
      // console.log("Successfully logged in!");
      // console.log(status, data.user.name, data.user.email);
      toast.success("Logged in successfully!");

      const handleAuth = async (name, email) => {
        await axios.post("/api/auth/verifiedSignup", { name, email })
        .then(response => {
            // console.log(response);
            toast.success("User verified successfully!");
        })
        .catch((error) => {
            // console.log(error);
            if (error.response.status === 500) {
                toast.error("An error occurred, please try again!");
            } else if (error.response.status === 409) {
                toast.error("User already exists, please login!");
            }
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