"use client";

import supabase from "@/config/supabase";
import { useRef, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import { useSession } from "next-auth/react";

// import Payment from "../components/Payment/Payment";

import UserDashboard from "../components/UserDashboard/UserDashboard";
import Header from "../components/Header/Header";

import toast from "react-hot-toast";

export default function Upload() {
    const { data } = useSession();

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploaded, setUploaded] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [plan, setPlan] = useState("lite");
    const [isUploaded, setIsUploaded] = useState(false);

    const [isWarningOpen, setIsWarningOpen] = useState(true);

    const inputRef = useRef(null);

    const uploadedCallback = () => {
        setIsUploaded(val => !val);
    }

    const handleUpload = async () => {
        if (selectedFile) {
            setIsUploading(true);

            // checks for lite plan
            if (plan === "lite" && selectedFile.size / 1024 / 1024 / 1024 > 1) {
                toast.error("Lite plan allows only 1GB file size!");
                return;
            }

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
            // console.log(selectedFile.size / 1024 / 1024 / 1024, "GB");
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
                    name: selectedFile.name,
                    email: data.user.email,
                    downloadLink: uploaded,
                    plan
                }).then(response => {
                    // console.log("Uploaded file logged onto database!", response);
                    toast.success("File uploaded successfully!");
                    setIsUploaded(true);
                }).catch(error => {
                    // console.log("Error while trying to log uploaded file info!", error);
                    if (error.response.status === 500) {
                        toast.error("An error occurred, please try again!");
                    } else if (error.response.status === 409) {
                        toast.error("File already exists!");
                    }
                })
                    .finally(() => {
                        setIsUploading(false);
                    });
            }
            logUploadedFileData();
        }
    }, [uploaded]);

    return (
        <div className="w-screen overflow-y-hidden">

            {
                isWarningOpen && (
                    <div className="">
                        <div className="bg-red-500 text-white text-center py-2 px-4 fixed top-0 left-0 right-0 z-50">
                            <p className="text-lg">Please do not upload any sensitive files.</p>
                            <button onClick={() => setIsWarningOpen(false)} className="absolute top-2 right-2 text-white font-bold">X</button>
                        </div>
                    </div>
                )
            }


            <Header />
            {
                !uploaded &&
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

                    {/* {
                        (plan !== "lite" && plan !== "") && (
                            <Payment amount={plan === "pro" ? "10" : "25"} />
                        )
                    } */}

                    <button
                        className="bg-background-green hover:bg-opacity-80 text-white rounded-xl px-4 py-3 text-xl duration-200 w-full"
                        type="button"
                        onClick={handleUpload}
                    >
                        { isUploading ? "Uploading..." : "Upload File" }
                    </button>
                </div>
            }

            {uploaded && (
                <div className="w-full flex items-center justify-center gap-3 mt-10">
                    <input className="border w-[50%] px-1 py-2 rounded-md" placeholder={uploaded} readOnly />
                    <button onClick={handleCopy} className="border px-5 py-2 rounded-md bg-background-green border-background-green hover:bg-foreground-green">
                        {isCopied ? "Copied!" : "Copy Link"}
                    </button>
                </div>
            )}

            {/* dashboard */}
            <UserDashboard isUploaded={isUploaded} uploadedCallback={uploadedCallback} />
        </div>
    );
}