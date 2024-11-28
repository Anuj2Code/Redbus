import prisma from "../../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Message } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const MESSAGES_PATCH = 10;

export async function GET(req: NextRequest) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        const { searchParams } = new URL(req.url);
        const cursor = searchParams.get("cursor");
        const channelId = searchParams.get("channelId")

        if (!user) {
            return new NextResponse("UnAuthorized", { status: 401 })
        }
        if(!channelId){
            return new NextResponse("channel ID is missing", { status: 401 })
        }

        let messages:Message[] = []

        if(cursor){
         messages =  await prisma.message.findMany({
             take:MESSAGES_PATCH,
             skip:1,
             cursor:{
                id:cursor
             },
             where:{
                channelId
             },
             include:{
                member:{
                    include:{
                        User:true
                    }
                }
             },
             orderBy:{
                createdAt:"desc"
             }
         })
        }
        else{
            messages =  await prisma.message.findMany({
                take:MESSAGES_PATCH,
                where:{
                   channelId
                },
                include:{
                   member:{
                       include:{
                           User:true
                       }
                   }
                },
                orderBy:{
                   createdAt:"desc"
                }
            })
        }

        let nextCursor = null;
        if(messages.length===MESSAGES_PATCH){
            nextCursor = messages[MESSAGES_PATCH-1].id;
        }

        return NextResponse.json({
            items:messages,
            nextCursor
        })
    } catch (error) {
        console.log("[get_Messages]", error);
        return NextResponse.json("Internal Error", { status: 500 })
    }
}