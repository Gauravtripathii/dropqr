import Logo from "../Logo";
import { useState } from "react";
import axios from "axios";

export default function Footer() {
    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/api/addNewsletter", { email });
            if (response.status === 200) {
                alert("Email added successfully");
                setEmail("");
            } else {
                alert("Error adding email");
            }
        } catch (error) {
            console.error("Error adding email:", error);
            alert("Error adding email");
        }
    }

    return (
        <div className="px-6 py-5 mt-12 bg-lighter-black flex flex-col gap-5">
            <div className="flex flex-col gap-2 border-b-2 pb-5">
                <p>
                    Enter your email to recieve relevent updates and news about the app and more products from us.
                </p>
                <p className="flex gap-2">
                    <input type="text" placeholder="E-mail" value={email} onChange={event => setEmail(event.target.value)} className="text-black text-[17px] px-3 py-2 rounded-md w-[70%]" />
                    <button className="w-[30%] bg-background py-2 rounded-md text-[17px] uppercase text-center hover:bg-lighter-black" onClick={handleSubmit}>subscribe</button>
                </p>
            </div>
            <Logo />
        </div>
    );
}
