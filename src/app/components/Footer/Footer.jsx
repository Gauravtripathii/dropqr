import Logo from "../Logo";

export default function Footer() {
    return (
        <div className="px-6 py-5 mt-12 bg-lighter-black flex flex-col gap-5">
            <div className="flex flex-col gap-2 border-b-2 pb-5">
                <p>
                    Enter your email to recieve relevent updates and news about the app and more products from us.
                </p>
                <p className="flex gap-2">
                    <input type="text" placeholder="E-mail" className="text-black text-[17px] px-3 py-2 rounded-md w-[70%]" />
                    <button className="w-[30%] bg-background py-2 rounded-md text-[17px] uppercase text-center hover:bg-lighter-black">subscribe</button>
                </p>
            </div>
            <Logo />
        </div>
    );
}
