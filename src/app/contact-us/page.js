"use client";

import Header from "../components/Header/Header";

export default function ContactUs() {
    return (
        <div className="w-screen overflow-y-hidden">
            <Header />
            <div className="flex flex-col items-center mt-16 px-4">
                <p className="mb-2 text-lg text-gray-300">
                    Connect with me on GitHub:
                </p>
                <a
                    href="https://github.com/gauravtripathii"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-blue-500 hover:text-blue-400 transition-colors duration-200"
                >
                    github.com/gauravtripathii
                </a>
            </div>


        </div>

    )
}