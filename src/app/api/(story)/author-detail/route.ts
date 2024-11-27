import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("authorID");
    try {
        const data = await prisma.aIOutput.findMany({
            where: {
                userId: id as string
            },
            select: {
                content: true,
                prompt: true,
                createdBy: true,
                id: true,
                User: true,
                createdAt: true,
                StoryVote: true,
                follow: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return NextResponse.json({
            data: data,
            message: "Post query Fetched!",
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