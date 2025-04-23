"use client";

import supabase from "@/config/supabase";
import { useRef, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import { useSession } from "next-auth/react";

import Payment from "../components/Payment/Payment";

import UserDashboard from "../components/UserDashboard/UserDashboard";
import Header from "../components/Header/Header";

export default function Upload() {
    const { data } = useSession();

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploaded, setUploaded] = useState(null);
    const [isCopied, setIsCopied] = useState(false);
    const [plan, setPlan] = useState("");

    const inputRef = useRef(null);

    const handleUpload = async () => {
        if (selectedFile) {
            const filename = nanoid();

            const { data, error } = await supabase.storage
                .from("nextsupabase")
                .upload(
                    `${filename}.${selectedFile.name.split(".").pop()}`,
                    selectedFile
                );

            if (error) {
                console.error("Error uploading file:", error.message);
            } else {
                const { data: file } = await supabase.storage
                    .from("nextsupabase")
                    .getPublicUrl(data?.path);
                console.log(file);
                setUploaded(file?.publicUrl);
            }
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(uploaded);
            setIsCopied(true);
        } catch (err) {
            console.error("Failed to copy text:", err);
        }
    };

    useEffect(() => {
        if (uploaded) {
            const logUploadedFileData = async () => {
                await axios.post("/api/files/uploadFile", {
                    name: data.user.name,
                    email: data.user.email,
                    downloadLink: uploaded,
                    plan
                }).then(response => {
                    console.log("Uploaded file logged onto database!", response);
                }).catch(error => {
                    console.log("Error while trying to log uploaded file info!", error);
                });
            }
            logUploadedFileData();
        }
    }, [uploaded]);

    return (
        <div className="w-screen overflow-y-hidden">
            <Header />
            <div className="mt-10 px-5 container mx-auto max-w-[560px] flex flex-col gap-5">
                <div className="flex justify-between items-center border-b border-dashed border-gray-900 pb-3">
                    <h1 className="text-3xl font-semibold">Upload File</h1>
                </div>
                <input
                    type="file"
                    ref={inputRef}
                    onChange={(e) => {
                        setSelectedFile(e?.target?.files?.[0]);
                    }}
                />

                {/* PAYMENT NOT WORKING UNTILL KYC! */}

                {/* <select
                    name="plan"
                    id="plan"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    className="border rounded-xl px-4 py-2 mt-2 text-black"
                >
                    <option value="" disabled>choose your plan</option>
                    <option value="lite">Lite</option>
                    <option value="pro">Pro</option>
                    <option value="elite">Elite</option>
                </select> */}

                {
                    (plan !== "lite" && plan !== "") && (
                        <Payment amount={plan === "pro" ? "10" : "25"} />
                    )
                }

                <button
                    className="bg-background-green hover:bg-opacity-80 text-white rounded-xl px-4 py-3 text-xl duration-200 w-full"
                    type="button"
                    onClick={handleUpload}
                >
                    Upload File
                </button>

                {uploaded && (
                    <div className="flex">
                        <input className="border w-[85%]" placeholder={uploaded} readOnly />
                        <button onClick={handleCopy}>Copy</button>
                    </div>
                )}
            </div>

            {/* dashboard */}
            <UserDashboard />
        </div>
    );
}