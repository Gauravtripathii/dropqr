import Image from "next/image";
import NavLink from "next/link";

export default function Logo() {
    return (
        <NavLink href="/" className="flex items-center gap-2 w-fit cursor-pointer">
            <Image src="/logo.png" alt="logo" height={100} width={100} className="h-[35px] w-[35px] md:h-[40px] md:w-[40px]" />
            <span className="text-[23px] md:text-[27px] font-semibold">dropqr</span>
        </NavLink>
    );
}
