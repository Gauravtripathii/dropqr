import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import File from "@/models/fileModel";

connect();

export async function POST(request) {
    try {
        const { name, email, downloadLink, plan } = await request.json();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found, auth problem!" }, { status: 404 });
        }

        const newFile = new File({
            name,
            email,
            downloadLink,
            plan,   // lite, pro, elite
        });
        const savedFile = await newFile.save();

        return NextResponse.json({
            success: true,
            savedFile
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

