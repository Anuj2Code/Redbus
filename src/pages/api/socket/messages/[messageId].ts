import { NextApiRequest } from "next";
import { NextResponseServerIo } from "../../../../../types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import { MemberRole } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextResponseServerIo) {
    if (req.method !== "POST" && req.method !== "DELETE") {
        res.status(400).json({
            error: "Method not allowed"
        })
    }
    try {
        const { getUser } = getKindeServerSession(req)
        const user = await getUser();

        const { content } = req.body;
        const { serverId, channelId, messageId } = req.query;
         console.log(content,"content hai");
         
        if (!user) {
            res.status(401).json({
                error: "Unauthourised mmm"
            })
        }
        if (!serverId) {
            res.status(404).json({
                error: "Serverid is missing"
            })
        }
        if (!channelId) {
            res.status(404).json({
                error: "ChannelId is missing"
            })
        }
        if (!messageId) {
            res.status(404).json({
                error: "ChannelId is missing"
            })
        }
        if (!content) {
            res.status(404).json({
                error: "Content is missing"
            })
        }

        const server = await prisma.server.findFirst({
            where: {
                id: serverId as string,
                Members: {
                    some: {
                        userId: user?.id
                    }
                }
            },
            include: {
                Members: true
            }
        })

        if (!server) {
            res.status(404).json({
                error: "Server not found"
            })
        }

        const channel = await prisma.channel.findFirst({
            where: {
                id: channelId as string,
                serverId: serverId as string
            }
        })
        if (!channel) {
            res.status(404).json({
                message: "channel not found"
            })
        }

        const member = server?.Members.find((member) => member.userId === user?.id)
        if (!member) {
            res.status(404).json({
                message: "Member not found"
            })
        }

        let message = await prisma.message.findFirst({
            where: {
                id: messageId as string
            },
            include: {
                member: {
                    include: {
                        User: true
                    }
                }
            }
        })

        if (!message || message.deleted) {
            res.status(404).json({
                message: "Message not found"
            })
        }

        const messageOwner = message?.memberId === user?.id;
        const isAdmin = member?.role === MemberRole.ADMIN;
        const canModify = messageOwner || isAdmin
        if (!canModify) {
            res.status(401).json({
                error: "Unauthourise access"
            })
        }

        if (req.method === "DELETE") {
            message = await prisma.message.update({
                where: {
                    id: messageId as string
                },
                data: {
                    fileUrl: "",
                    content: "Message has been deleted",
                    deleted: true
                },
                include: {
                    member: {
                        include: {
                            User: true
                        }
                    }
                }
            })
        }

        if (req.method === "POST") {
            message = await prisma.message.update({
                where: {
                    id: messageId as string
                },
                data: {
                    content:content,
                },
                include: {
                    member: {
                        include: {
                            User: true
                        }
                    }
                }
            })
        }
        const updateKey = `chat:${channelId}:message:update`
        res?.socket?.server?.io.emit(updateKey, message)
        res.status(200).json(message)
    } catch (error) {
        console.log("[handler_Updating_sending_message]", error);
        res.status(402).json({
            message: "Internal error"
        })
    }
}