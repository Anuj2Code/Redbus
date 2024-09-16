import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {redditId,userId} = await request.json();
    console.log(redditId,"8...");
    // const { getUser } = getKindeServerSession();
    // const user = await getUser();
    // if (!user) {
    //     return redirect("/api/auth/login");
    // }
    try {
        const subExist = await prisma.subscription.findFirst({
            where: {
                subRedditId: redditId,
                userId: userId
            }
        })
        if (subExist) {
            return {
                message: "You already Subscribed",
            }
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
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Sorry something went wrong!",
        };
    }
}