import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log("here")
        const response = NextResponse.json({
            message: "Logout Successfull",
            success: true
        });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });
        return response;
    } catch (error) {
        NextResponse.json({ message: error.message }, { status: 500 });
    }
}