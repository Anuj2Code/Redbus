import prisma from "../../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Message } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const MESSAGES_PATCH = 10;

export async function GET(req: NextRequest) {
    try {
        // Retrieve the session and user
        const session = getKindeServerSession(); 
        const { getUser } = session;
        const user = await getUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized access. Please log in." },
                { status: 401 }
            );
        }

        // Extract query parameters
        const { searchParams } = new URL(req.url);
        const cursor = searchParams.get("cursor")
        const channelId = searchParams.get("channelId");

        if (!channelId) {
            return NextResponse.json(
                { error: "Channel ID is missing." },
                { status: 400 }
            );
        }

        // Initialize messages array
        let messages: Message[] = [];

        // Fetch messages based on cursor presence
        if (cursor) {
            messages = await prisma.message.findMany({
                take: MESSAGES_PATCH,
                skip: 1, // Skip the cursor itself
                cursor: {
                    id: cursor,
                },
                where: {
                    channelId,
                },
                include: {
                    member: {
                        include: {
                            User: true, // Include user details
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
        } else {
            messages = await prisma.message.findMany({
                take: MESSAGES_PATCH,
                where: {
                    channelId,
                },
                include: {
                    member: {
                        include: {
                            User: true, // Include user details
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
        }

        // Determine the next cursor
        let nextCursor: string | null = null;
        if (messages.length === MESSAGES_PATCH) {
            nextCursor = messages[messages.length - 1].id; // Use the last message ID as the cursor
        }

        // Return the messages and next cursor
        return NextResponse.json({
            items: messages,
            nextCursor,
        });
    } catch (error) {
        console.error("[get_Messages] Error fetching messages:", error);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}
