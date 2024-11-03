import ChatHeader from "@/app/components/ChatHeader";
import ChatInput from "@/app/components/ChatInput";
import ChatMessage from "@/app/components/ChatMessages";
import { MediaRoom } from "@/app/components/media-room";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { channelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface channelIdProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

export default async function channelIdPage({ params }: channelIdProps) {
    const { getUser } = getKindeServerSession()
    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login");
    }

    const channel = await prisma.channel.findUnique({
        where: {
            id: params.channelId
        }
    })

    const members = await prisma.member.findFirst({  // finding youserlf
        where: {
            serverId: params.serverId,
            userId: user.id
        }
    })

    if (!channel || !members) {
        return redirect("/");
    }

    return (
        <div className="bg-black flex flex-col h-full">
            <ChatHeader name={channel.name} serverId={channel.serverId} type="channel" />
           {channel.type === channelType.TEXT && (
            <>
            <ChatMessage
                name={channel.name}
                member={members}
                chatId={channel.id}
                type="channel"
                apiUrl="/api/messages"            // this is the api from where we fetch messages
                socketUrl="/api/socket/messages"  // this is socket url where we triggering the new messages
                socketQuery={{
                    channelId: channel.id,
                    serverId: channel.serverId
                }}
                paramKey="channelId"
                paramValue={channel.id}
            />
            <ChatInput
                name={channel.name}
                type="channel"
                apiUrl="/api/socket/messages"
                query={{
                    channelId: channel.id,
                    serverId: channel.serverId
                }}
            />
            </>
           )}
           {channel.type === channelType.AUDIO && (
            <MediaRoom chatId={channel.id} audio={true} video={false}/>
           )}
           {channel.type === channelType.VIDEO && (
            <MediaRoom chatId={channel.id} audio={true} video={true}/>
           )}
        </div>
    )
}