import prisma from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = searchParams.get("page");
        const perPage = 2;

        console.log({ page }); // Debug page
        const skipValue = page ? (Number(page) - 1) * perPage : 0;
        console.log({ skipValue }); // Debug skip value

        const Post_data = await prisma.post.findMany({
            take: perPage,
            skip: skipValue,
            select: {
                title: true,
                createdAt: true,
                textContent: true,
                id: true,
                imageString: true,
                comments: {
                    select: {
                        id: true,
                        userId: true,
                        text: true,
                        createdAt: true,
                        User: true,
                        votes: {
                            select: {
                                userId: true,
                                voteType: true,
                            },
                        },
                        reply: {
                            select: {
                                text: true,
                                createdAt: true,
                                userName: true,
                                imageString: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
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
                createdAt: "desc",
            },
        });

        return NextResponse.json(
            { data: Post_data, message: "Post Fetched!", status: "green" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { status: "error", message: "Sorry something went wrong!" },
            { status: 500 }
        );
    }
}
