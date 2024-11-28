import prisma from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { redditId, userId } = await request.json();
    try {
        const subExist = await prisma.subscription.findFirst({
            where: {
                subRedditId: redditId,
                userId: userId
            }
        })
        if (subExist) {
            return NextResponse.json({
                status: "red",
                message: "You already Subscribed! ",
            })
        }
        await prisma.subscription.create({
            data: {
                subRedditId: redditId,
                userId: userId
            }
        })
        return NextResponse.json({
            message: "subscribed",
            status: "green",
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}