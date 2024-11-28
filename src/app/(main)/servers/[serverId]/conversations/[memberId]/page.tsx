import ChatHeader from "../../../../../components/ChatHeader";
import ChatInput from "../../../../../components/ChatInput";
import ChatMessage from "../../../../../components/ChatMessages";
import { MediaRoom } from "../../../../../components/media-room";
import { getOrCreateConverstion } from "../../../../../lib/conversation";
import prisma from "../../../../../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";

interface conversationProps {
    params: {
        serverId: string,
        memberId: string
    },
    searchParams: {
        video?: boolean
    }
}

export default async function Conversation({ params, searchParams }: conversationProps) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login");
    }
    const currentMember = await prisma.member.findFirst({
        where: {
            serverId: params.serverId,
            userId: user.id
        },
        include: {
            User: true
        }
    })
    if (!currentMember) {
        return redirect("/");
    }

    const conversation = await getOrCreateConverstion(currentMember.id, params.memberId);
    if (!conversation) {
        return redirect(`/servers/${params.serverId}`);
    }
    const { memberOne, memberTwo } = conversation
    let otherMember = memberOne.id === user.id ? memberTwo : memberOne

    return (
        <div className="bg-black flex flex-col h-full">
            <ChatHeader
                imageUrl={otherMember.User.imageUrl!}
                name={otherMember.User.userName!}
                serverId={params.serverId}
                type="conversation"
            />
            {searchParams.video && (
                <MediaRoom
                  chatId={conversation.id}
                  video={true}
                  audio={true}
                />
            )}
            {!searchParams.video && (
                <>
                    <ChatMessage
                        member={currentMember}
                        name={otherMember.User.userName as string}
                        chatId={conversation.id}
                        type="conversation"
                        apiUrl="/api/direct-messages"        // for fetching the messages from the server
                        paramKey="conversationId"
                        paramValue={conversation.id}
                        socketUrl="/api/socket/direct-messages"  // this is for triggering the new messages from the socket
                        socketQuery={{
                            conversationId: conversation.id
                        }}
                    />
                    <ChatInput
                        name={otherMember.User.userName as string}
                        type="conversation"
                        apiUrl="/api/socket/direct-messages"
                        query={{
                            conversationId: conversation.id
                        }}
                    />
                </>
            )}
        </div>
    )
}


// if you look carefully then you find memberId from params is the id of the person whom we need to chat