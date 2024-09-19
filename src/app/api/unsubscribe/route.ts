import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { redditId, userId } = await request.json();
    try {
        const subExist = await prisma.subscription.findFirst({
            where: {
                subRedditId: redditId,
                userId: userId
            },
            select:{
                id:true
            }
        })
        if (!subExist) {
            return NextResponse.json({
                message: "You've not been subscribed to this subreddit, yet.",
            })
        }
        
      await prisma.subscription.delete({
        where:{
           userId:userId,
           id:subExist.id
        }
      })
        return NextResponse.json({
            message: "Subscription has been removed",
            status: "green",
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}