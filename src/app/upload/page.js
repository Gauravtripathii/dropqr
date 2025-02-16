"use client";

import supabase from "@/config/supabase";
import { useRef, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Upload() {
    const { data } = useSession();

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploaded, setUploaded] = useState(null);
    const [isCopied, setIsCopied] = useState(false);
    const [plan, setPlan] = useState("lite");

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
            //   setTimeout(() => setIsCopied(false), 2000); 
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
        <div className="w-full h-screen flex justify-center px-10 pt-5">
            <div className="container mx-auto max-w-[560px] flex flex-col gap-5">
                <div className="flex justify-between items-center border-b border-dashed border-gray-900 pb-3">
                    <h1 className="text-3xl font-semibold font-mono">Upload File</h1>
                </div>
                <input
                    type="file"
                    ref={inputRef}
                    onChange={(e) => {
                        setSelectedFile(e?.target?.files?.[0]);
                    }}
                />
                <button
                    className="bg-green-600 hover:bg-opacity-80 text-white rounded-xl px-4 py-3 text-xl duration-200 w-full font-mono"
                    type="button"
                    onClick={handleUpload}
                >
                    Upload File
                </button>
                {/* {uploaded && <img src={uploaded} className="max-w-[400px]" />} */}
                {uploaded && (
                    <div className="flex">
                        <input className="border w-[85%]" placeholder={uploaded} readOnly />
                        <button onClick={handleCopy}>Copy</button>
                    </div>
                )}
            </div>
        </div>
    );
}