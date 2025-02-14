
export default function Pricing() {
    return (
        <div className="px-7 sm:px-10 pt-5 md:pt-24 flex flex-col gap-4">
            <div className="bg-lighter-black py-4 px-5 rounded-xl">
                <h1 className="text-[23px]">LiteLink (Free)</h1>
                <div className="text-[20px]">
                    <p className="">✅ 1 GB max file size</p>
                    <p className="">✅ 24-hour link expiration</p>
                    <p className="">✅ 10 downloads per file</p>
                    <p className="">❌ No file encryption</p>
                </div>
                <p className="text-[35px] text-center pt-5 font-semibold">₹0 per file</p>
            </div>

            <div className="bg-background-green py-4 px-5 rounded-xl">
                <h1 className="text-[23px]">EliteLink</h1>
                <div className="text-[20px]">
                    <p className="">✅ 5 GB max file size</p>
                    <p className="">✅ 30-day link expiration</p>
                    <p className="">✅ Password protection for downloads</p>
                    <p className="">✅ Unlimited downloads</p>
                    <p className="">✅ File encryption</p>
                </div>
                <p className="text-[35px] text-center pt-5 font-semibold">₹25 per file (~$0.30)</p>
            </div>

            <div className="bg-lighter-black py-4 px-5 rounded-xl">
                <h1 className="text-[23px]">ProLink</h1>
                <div className="text-[20px]">
                    <p className="">✅ 1 GB max file size</p>
                    <p className="">✅ 7-day link expiration</p>
                    <p className="">✅ Unlimited downloads</p>
                    <p className="">✅ File encryption</p>
                </div>
                <p className="text-[35px] text-center pt-5 font-semibold">₹10 per file (~$0.12)</p>
            </div>
        </div>
    )
}
