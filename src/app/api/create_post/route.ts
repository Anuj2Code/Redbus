import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = searchParams.get("page");
        const perPage = 2;
        const Post_data = await prisma.post.findMany({
            take: perPage,
            skip: page ? (Number(page) - 1) * perPage : 0,
            select: {
                title: true,
                createdAt: true,
                textContent: true,
                id: true,
                imageString: true,
                comments: {
                    select: {
                        id: true
                    }
                },
                User: {
                    select: {
                        userName: true,
                    },
                },
                subName: true,
                Vote: {
                    select: {
                        userId: true,
                        voteType: true,
                        postId: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return NextResponse.json({
            data: Post_data,
            message: "Post Fetched!",
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