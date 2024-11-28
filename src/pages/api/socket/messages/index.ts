import { NextApiRequest } from "next";
import { NextResponseServerIo } from "../../../../../types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../../../../app/lib/db";

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
        const { serverId, channelId } = req.query;

        if (!user) {
            res.status(401).json({
                error: "Unauthourised"
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

        const message = await prisma.message.create({
            data: {
                content,
                fileUrl:fileUrl || "",
                channelId: channelId as string,
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

        const channelKey = `chat:${channelId}:messages`;
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