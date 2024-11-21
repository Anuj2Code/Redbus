import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { DirectMessage } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const MESSAGES_PATCH = 10;

export async function GET(req: NextRequest) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        const { searchParams } = new URL(req.url);
        const cursor = searchParams.get("cursor");
        const conversationId = searchParams.get("conversationId")

        if (!user) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }
        if (!conversationId) {
            return new NextResponse("channel ID is missing", { status: 401 })
        }

        let messages: DirectMessage[] = []

        if (cursor) {
            messages = await prisma.directMessage.findMany({
                take: MESSAGES_PATCH,
                skip: 1,
                cursor: {
                    id: cursor
                },
                where: {
                    conversationId
                },
                include: {
                    member: {
                        include: {
                            User: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
        }
        else {
            messages = await prisma.directMessage.findMany({
                take: MESSAGES_PATCH,
                where: {
                    conversationId
                },
                include: {
                    member: {
                        include: {
                            User: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
        }

        let nextCursor = null;
        if (messages.length === MESSAGES_PATCH) {
            nextCursor = messages[MESSAGES_PATCH - 1].id;
        }

        return NextResponse.json({
            items: messages,
            nextCursor
        })
    } catch (error) {
        console.log("[get_Direct_Messages]", error);
        return NextResponse.json("Internal Error", { status: 500 })
    }
}