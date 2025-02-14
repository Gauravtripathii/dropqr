
export default function Hero() {
    return (
        <div className="px-7 sm:px-10 pt-5 md:pt-24 flex flex-col items-center justify-center gap-3 md:gap-10 h-[70svh]">
            <h1 className="text-[40px] md:text-[45px] md:w-1/2 md:font-semibold flex flex-col items-center justify-center">
                <span className="">Upload in seconds</span>
                <span className="text-foreground-green">Share with anyone</span>
            </h1>
            <p className="text-[18px] md:text-[20px] md:w-1/2 text-justify md:text-center">
                Effortless file sharing made simple. Upload your files, get an instant link and QR code, and share them anywhere. Need an API? Seamlessly integrate file uploads into your app with ease.
            </p>
            <div className="flex items-center justify-center gap-5 mt-2 md:w-1/2">
                <button className="bg-background-green hover:bg-green-700 transition-all border-2 border-foreground-green rounded-xl px-4 md:px-10 py-2 text-[18px] md:text-[20px]">Get Started</button>
                <button className="bg-lighter-black hover:bg-gray-700 transition-all border-2 border-gray-400 rounded-xl px-4 md:px-10 py-2 text-[18px] md:text-[20px]">Another Thing</button>
            </div>
        </div>
    );
}
