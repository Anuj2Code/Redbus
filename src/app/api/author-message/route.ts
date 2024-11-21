import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { AuthorMessage } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        const { searchParams } = new URL(req.url);
        const conversationId = searchParams.get("conversationId")
        if (!user) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }
        if (!conversationId) {
            return new NextResponse("conversation ID is missing", { status: 401 })
        }
        let messages: AuthorMessage[] = [];
        messages = await prisma.authorMessage.findMany({
            where: {
                AuthorconversationId: conversationId
            },
            include: {
                user: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return NextResponse.json({
            items: messages,
        })
    }
    catch (error) {
        console.log("[get_Direct_Messages]", error);
        return NextResponse.json("Internal Error", { status: 500 })
    }
}
