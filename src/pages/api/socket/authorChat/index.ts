import { NextApiRequest } from "next";
import { NextResponseServerIo } from "../../../../../types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";

export default async function handler(req:NextApiRequest,res:NextResponseServerIo) {
    if (req.method !== "POST") {
        res.status(400).json({
            error: "Method not allowed"
        })
    }
    try {
        const { getUser } = getKindeServerSession(req)
        const user = await getUser();
        const { content } = req.body;
        const { conversationId } = req.query;
        if (!user) {
            res.status(401).json({
                error: "Unauthourised"
            })
        }
        if (!conversationId) {
            res.status(404).json({
                error: "conversationId is missing"
            })
        }
        if (!content) {
            res.status(404).json({
                error: "Content is missing"
            })
        }
        const conversation = await prisma.authorConverstaion.findFirst({
            where:{
                id:conversationId as string,
                OR:[
                   {
                    userIdOne:user?.id
                   },{
                    userIdTwo:user?.id
                   }
                ]
            },
            include:{
                UserOne:true,
                UserTwo:true
            }
        })

        const creator = conversation?.UserOne.id===user?.id ? conversation?.UserOne : conversation?.UserTwo;

        if(creator){
            res.status(404).json({
                message: "Member not found"
            })
        }

        const message = await prisma.authorMessage.create({
            data:{
                content,
                AuthorconversationId:conversationId as string,
                userId:creator?.id!
            },
            include:{
               user:true
            }
        })
        const channelKey = `chatAuthor:${conversationId}:messages`;
        res?.socket?.server?.io.emit(channelKey, message)
        res.status(200).json(message)
    } 
    catch (error) {
        console.log("[handler_sending_message_author]", error);
        res.status(402).json({
            message: "Internal error"
        })
    }
}