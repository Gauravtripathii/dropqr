import { NextResponse } from "next/server";
import File from "@/models/fileModel";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        const fileId = await request.json();
    
        const id = new mongoose.Types.ObjectId(fileId.fileId);
        await File.findByIdAndDelete(id);

        return NextResponse.json({
            message: "File deleted successfully!",
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
