export default function AboutProduct() {
  return (
    <div className="bg-[#121212] text-[#fafafa] p-6 md:p-8 rounded-2xl shadow-md border border-[#242424] max-w-3xl mx-auto">
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-[#3ecf8e] mb-2">
          🎉 DropQR is 100% Free!
        </h2>
        <p className="text-lg text-gray-200">
          Enjoy lightning-fast QR code generation with file uploads — no sign-up, no charges.
        </p>
      </div>

      <div className="bg-[#242424] p-4 rounded-xl mb-4">
        <h3 className="text-xl font-semibold text-[#3ecf8e] mb-1">
          ✅ What’s included for free:
        </h3>
        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
          <li>Unlimited uploads and QR code generation</li>
          <li>No pricing tiers or paywalls</li>
          <li>All files auto-delete after 24 hours</li>
          <li>No ads, no trackers — completely private</li>
        </ul>
      </div>

      <div className="text-sm text-gray-400 mb-6">
        🔐 <span className="text-gray-300 font-medium">Your privacy matters.</span> Files are
        stored temporarily and are <span className="text-[#3ecf8e]">automatically deleted after 24 hours</span>.
      </div>
    </div>
  );
}
