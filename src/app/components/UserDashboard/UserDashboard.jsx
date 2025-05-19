import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Image from "next/image";
import QRCodeGenerator from "../QRCodeGenerator/QRCodeGenerator";

export default function UserDashboard({ isUploaded, uploadedCallback }) {
    const {data} = useSession();

    const [filesByUser, setFilesByUser] = useState(null);
    const [isCopied, setIsCopied] = useState(false);

    const [qrFile, setQrFile] = useState(null);

    const handleCopy = async (link) => {
        try {
            await navigator.clipboard.writeText(link);
            setIsCopied(true);
        } catch (err) {
            console.error("Failed to copy text:", err);
        }
    };

    const deleteFile = async (fileId) => {
        await axios.post("/api/files/deleteFile", { fileId })
        .then(response => {
            if (response.status === 200) {
                toast.success("Document deleted!");
                uploadedCallback();
            }
        })
        .catch(error => {
            if (error.status === 500) {
                // console.log(error);
                toast.error("An error occurred, please try again!");
            }
        })
    }

    useEffect(() => {
        const getFilesByUser = async () => {
            if (data) {
                await axios.post("/api/files/getFilesByUser", { user_email: data.user.email })
                .then(response => {
                    if (response.status === 200) {
                        setFilesByUser(response.data.files);
                        // console.log("Files by user: ", filesByUser);
                    } else {
                        // console.error("Error fetching files by user: ", response.statusText);
                        toast.error("An error occurred, please try again!");
                    }
                })
                .catch(error => {
                    // console.error("Error fetching files by user: ", error);
                    if (error.response.status === 500) {
                        toast.error("An error occurred, please try again!");
                    } else if (error.response.status === 404) {
                        toast.error("No files found for this user!");
                    }
                });
            }
        }
        getFilesByUser();
    }, [ isUploaded, data ]);

    return (
        <div className="pt-10 px-5 relative">
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
                                            <Image alt="delete btn" src="/delete.png" height={300} width={300} className="w-[30px] cursor-pointer hover:rotate-12 duration-75" onClick={() => deleteFile(file._id)} />
                                        </div>
                                        <button className="bg-background-green hover:bg-opacity-80 text-white rounded-xl px-4 py-3 text-xl duration-200 mt-3" type="button" onClick={() => setQrFile(file.downloadLink)}>
                                            view QR code
                                        </button>
                                    </div>
                                )) 
                            }

                            {
                                qrFile && (
                                    <div className="w-full md:w-fit flex flex-col items-center justify-center gap-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-md rounded-lg p-4 z-50">
                                        <QRCodeGenerator url={qrFile} />
                                        <button onClick={() => setQrFile(null)} className="border px-5 py-2 rounded-md bg-background-green border-background-green hover:bg-foreground-green">
                                            Close QR Code
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    ):
                    <div className="">Loading...</div>
                }
            </div>
        </div>
    );
}
