import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// creating an order

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
  });

export async function POST(req: Request) {
    const { amount } = await req.json();
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
    });
  
    return NextResponse.json(order);
  }