import CloseIcon from '@mui/icons-material/Close';
import Logo from '../Logo';

import { motion } from "framer-motion";
import { useSession } from 'next-auth/react';
import NavLink from 'next/link';
import { signOut } from 'next-auth/react';

export default function Nav({ closeNavCallback }) {

    const { status } = useSession();

    const handleSignout = async () => {
        await signOut();
    }

    return (
        <nav className="absolute top-0 left-0 bg-lighter-black w-screen h-[100svh] flex flex-col gap-10 px-7 sm:px-10 py-5">
            <div className="flex items-center justify-between">
                <Logo />
                <span
                    className="cursor-pointer border-2 border-lighter-black hover:border-foreground-green hover:bg-lighter-black p-1 rounded-lg"
                    onClick={closeNavCallback}
                >
                    {/* <CloseIcon className="text-gray-400 md:hidden" fontSize="medium" /> */}
                    <CloseIcon className="text-gray-400 hidden md:block" fontSize="large" />
                </span>
            </div>
            <motion.div
                className="flex flex-col md:text-[25px]"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.25 }}
            >
                {
                    status === "authenticated" &&
                    <NavLink href="/upload" className="border-b border-gray-400 hover:bg-background py-3 px-2 font-semibold cursor-pointer">Upload</NavLink>
                }
                <p className="border-b border-gray-400 hover:bg-background py-3 px-2 font-semibold cursor-pointer">Contact Us</p>
                {
                    status === "authenticated" &&
                    <p onClick={() => handleSignout()} className="border-b border-gray-400 hover:bg-background py-3 px-2 font-semibold cursor-pointer">Signout</p>
                }
            </motion.div>
        </nav>
    );
}
