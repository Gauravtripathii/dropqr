import Logo from "../Logo";
import Nav from "./Nav";

import MenuIcon from '@mui/icons-material/Menu';

import { useState } from "react";

import { motion } from "framer-motion";

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const closeNavCallback = () => {
        setIsNavOpen(false);
    }

    return (
        <header className="border-b border-gray-400 py-5 px-7 sm:px-10 flex items-center justify-between">
            <Logo />

            <span
                className="cursor-pointer border-2 border-background hover:border-foreground-green hover:bg-lighter-black p-1 rounded-lg
                lg:hidden"
                onClick={() => setIsNavOpen(true)}
            >
                <MenuIcon className="text-gray-400 md:hidden" fontSize="medium" />
                <MenuIcon className="text-gray-400 hidden md:block" fontSize="large" />
            </span>

            {
                isNavOpen &&
                <Nav closeNavCallback={closeNavCallback} />
            }


            <motion.div
                className="md:text-[25px] hidden md:flex"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.25 }}
            >
                <p className="font-semibold cursor-pointer hover:text-foreground-green transition-all">Contact Us</p>
            </motion.div>
        </header>
    );
}
