import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
    try {
        const { amount, currency } = await request.json();

        var options = {
            amount,
            currency,
        };

        const order = razorpay.orders.create(options);

        const orderId = (await order).id;

        return NextResponse.json({ orderId, success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
