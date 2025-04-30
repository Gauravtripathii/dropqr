import { NextResponse } from "next/server";
import File from "@/models/fileModel";
import { connect } from "@/dbConfig";

connect();

export async function POST(request) {
    try {
        const { user_email } = await request.json();

        const filesByUser = await File.find({ email: user_email });

        return NextResponse.json({
            files: filesByUser,
        }, { status: 200 });        
    } catch (error) {
        return NextResponse.json({
            error: error.message,
        }, { status: 500 });
    }
}
