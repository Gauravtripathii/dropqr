import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig";

connect();

export async function POST(request) {
    try {
        const { name, email } = await request.json();

        // if user already exists, just login
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({
                name: user.name,
                email: user.email,
                success: true,
                message: "account already exists!"
            });
        }

        // save user
        const newUser = new User({ name, email });
        const savedUser = await newUser.save();

        return NextResponse.json({
            name: savedUser.name,
            email: savedUser.email,
            success: true,
            message: "account created successfully!"
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
