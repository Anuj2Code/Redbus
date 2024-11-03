import { NextApiRequest } from "next";
import { NextResponseServerIo } from "../../../../../types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";

export default async function handler(req: NextApiRequest, res: NextResponseServerIo) {
    if (req.method !== "POST") {
        res.status(400).json({
            error: "Method not allowed"
        })
    }
    try {
        const { getUser } = getKindeServerSession(req)
        const user = await getUser();

        const { content, fileUrl } = req.body;
        const { conversationId } = req.query;
        console.log(conversationId,"converationId");
        
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


        const conversation = await prisma.conversation.findFirst({
            where: {
                id: conversationId as string,
                OR: [
                    {
                        memberOne: {
                            userId: user?.id
                        }
                    },
                    {
                        memberTwo: {
                            userId: user?.id
                        }
                    }
                ]
            },
            include: {
                memberOne: {
                    include: {
                        User: true
                    }
                },
                memberTwo: {
                    include: {
                        User: true
                    }
                }
            }
        })

        if(!conversation){
            res.status(404).json({
                message: "Conversation not found"
            })
        }

        const member = conversation?.memberOne.userId===user?.id ? conversation?.memberOne :conversation?.memberTwo

        if (!member) {
            res.status(404).json({
                message: "Member not found"
            })
        }

        const message = await prisma.directMessage.create({
            data: {
                content,
                fileUrl: fileUrl || "",
                conversationId: conversationId as string,
                memberId: member?.id!
            },
            include: {
                member: {
                    include: {
                        User: true
                    }
                }
            }
        })

        const channelKey = `chat:${conversationId}:messages`;
        res?.socket?.server?.io.emit(channelKey, message)
        res.status(200).json(message)
    }
    catch (error) {
        console.log("[handler_sending_message]", error);
        res.status(402).json({
            message: "Internal error"
        })
    }
}