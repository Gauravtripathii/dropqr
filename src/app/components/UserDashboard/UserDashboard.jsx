import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

export default function UserDashboard({ isUploaded }) {
    const {data} = useSession();

    const [filesByUser, setFilesByUser] = useState(null);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async (link) => {
        try {
            await navigator.clipboard.writeText(link);
            setIsCopied(true);
        } catch (err) {
            console.error("Failed to copy text:", err);
        }
    };

    useEffect(() => {
        const getFilesByUser = async () => {
            if (data) {
                await axios.post("/api/files/getFilesByUser", { user_email: data.user.email })
                .then(response => {
                    if (response.status === 200) {
                        setFilesByUser(response.data.files);
                        console.log("Files by user: ", filesByUser);
                    } else {
                        console.error("Error fetching files by user: ", response.statusText);
                    }
                })
                .catch(error => {
                    console.error("Error fetching files by user: ", error);
                });
            }
        }
        getFilesByUser();
    }, [ isUploaded, data ]);

    return (
        <div className="pt-10 px-5">
            <h1 className="text-3xl">Your Documents: </h1>
            <div className="">
                {
                    filesByUser ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                            {
                                filesByUser?.map((file, index) => (
                                    <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col">
                                        <h3 className="text-black text-xl">{file.name}</h3>
                                        <p className="text-gray-600">Plan: {file.plan}</p>
                                        <div className="w-full flex items-center justify-center gap-3">
                                            <input className="border w-[80%] px-1 py-2 rounded-md text-black" placeholder={file.downloadLink} readOnly />
                                            <button onClick={() => handleCopy(file.downloadLink)} className="border w-[20%] py-2 rounded-md bg-background-green border-background-green hover:bg-foreground-green text-center">
                                                {isCopied ? "Copied!" : "Copy Link"}
                                            </button>
                                        </div>
                                    </div>
                                )) 
                            }
                        </div>
                    ):
                    <div className="">Loading...</div>
                }
            </div>
        </div>
    );
}
