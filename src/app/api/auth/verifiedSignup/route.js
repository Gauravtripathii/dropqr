import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
    try {
        const { name, email } = await request.json();

        // if user already exists, just login
        const user = await User.findOne({ email });
        if (user) {
            // create token data
            const tokenData = {
                id: user._id,
                name: user.name,
                email: user.email
            };

            // create token
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

            const response = NextResponse.json({
                message: "Login Successful",
                success: true
            });

            response.cookies.set("token", token, { httpOnly: true });

            return response;
        }

        // save user
        const newUser = new User({ name, email });
        const savedUser = await newUser.save();

        // create token data
        const tokenData = {
            id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email
        };

        // create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        const response = NextResponse.json({
            name: savedUser.name,
            email: savedUser.email,
            success: true,
            message: "account created successfully!"
        });

        response.cookies.set("token", token, { httpOnly: true });

        return response;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
