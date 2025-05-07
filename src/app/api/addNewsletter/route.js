import { NextResponse } from "next/server";
import Newsletter from "@/models/newsletterModel";
import { connect } from "@/dbConfig";

connect();

export async function POST(request) {
    try {
        const { email } = await request.json();
        const existingEmail = await Newsletter.findOne({ email });
        if (existingEmail) {
            await Newsletter.deleteOne({ email });
        }
        const newEmail = new Newsletter({ email });
        await newEmail.save();

        return NextResponse.json({ message: "Email added successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error adding email" }, { status: 500 });
    }
}
