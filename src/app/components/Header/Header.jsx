import Logo from "../Logo";
import Nav from "./Nav";

import MenuIcon from '@mui/icons-material/Menu';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import NavLink from "next/link";
import { signOut } from "next-auth/react";

export default function Header() {
    const { status } = useSession();

    const [isNavOpen, setIsNavOpen] = useState(false);

    const closeNavCallback = () => {
        setIsNavOpen(false);
    }

    const handleSignout = async () => {
        await signOut();
    }

    return (
        <header className="border-b border-gray-400 py-5 px-7 sm:px-10 flex items-center justify-between">
            <Logo />

            <span
                className="cursor-pointer border-2 border-background hover:border-foreground-green hover:bg-lighter-black p-1 rounded-lg
                lg:hidden"
                onClick={() => setIsNavOpen(true)}
            >
                <MenuIcon className="text-gray-400" fontSize="large" />
            </span>

            {
                isNavOpen &&
                <Nav closeNavCallback={closeNavCallback} />
            }


            <motion.div
                className="md:text-[25px] hidden lg:flex gap-3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.25 }}
            >
                {
                    status === "authenticated" &&
                    <NavLink href="/upload" className="font-semibold cursor-pointer hover:text-foreground-green transition-all ml-5">Upload</NavLink>
                }
                <p className="font-semibold cursor-pointer hover:text-foreground-green transition-all">
                    <NavLink href="/contact-us">Contact Us</NavLink>
                </p>
                {
                    status === "authenticated" &&
                    <p onClick={() => handleSignout()} className="font-semibold cursor-pointer hover:text-foreground-green transition-all ml-5">Signout</p>
                }
            </motion.div>
        </header>
    );
}
