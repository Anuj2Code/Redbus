"use client";

import { Member, Message, User } from "@prisma/client";
import ChatWelcome from "./ChatWelcome";
import { format } from "date-fns"
import { useChatQuery } from "../../hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment,useRef,ElementRef } from "react";
import ChatItem from "./ChatItem";
import { useChatSocket } from "../../hooks/use-chat-socket";
import { useChatScroll } from "../../hooks/use-chat-scroll";

const DATE_FORMAT = "d MMM yyyy, HH"

type MessagesWithMemberProfile = Message & {
    member: Member & {
        User: User
    }
}

interface chatMessageProps {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    type: "channel" | "conversation"
}

export default function ChatMessage({
    name,
    member,
    paramValue,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    type
}: chatMessageProps) {

    const queryKey = `chat:${chatId}`
    const addKey = `chat:${chatId}:messages`;
    const updateKey = `chat:${chatId}:message:update`;

    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null);

    const { data, status, fetchNextPage, isFetchingNextPage,hasNextPage } = useChatQuery({
        apiUrl,
        paramKey,
        queryKey,
        paramValue
    })
    
    useChatSocket({
        queryKey,
        addKey,
        updateKey
    })

    useChatScroll({
        chatRef,
        bottomRef,
        loadmore:fetchNextPage,
        shouldLoadMore:!isFetchingNextPage && !!hasNextPage,
        count:data?.pages?.[0]?.items?.length ?? 0
    })
    if (status === "loading") {
        return (
            <div className="flex flex-col h-[72vh] items-center justify-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-sm text-zinc-400">Loading Message ...</p>
            </div>
        )
    }
    if (status === "error") {
        return (
            <div className="flex flex-col h-[72vh] items-center justify-center">
                <ServerCrash className="h-7 w-7 text-zinc-500  my-4" />
                <p className="text-sm text-zinc-400">Something went wrong !</p>
            </div>
        )
    }

    return (
        <div ref={chatRef} className=" flex flex-col overflow-y-auto h-[72vh]">
            {!hasNextPage && <div className="flex-1" />}
            {!hasNextPage &&  ( <ChatWelcome type={type} name={name} />)}
            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                        <Loader2 className="h-6 w-6 text-zinc-500 animate-spin"/>
                    ):(
                        <button className="text-zinc-400 my-4 hover:text-zinc-300 text-sm transition" onClick={()=>fetchNextPage()}>
                            Load previous messages
                        </button>
                    )}
                </div>
            )}
            <div className="flex flex-col-reverse mt-auto">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group?.items?.map((message: MessagesWithMemberProfile) => (
                            <ChatItem
                                key={message.id}
                                id={message.id}
                                currentMember={member}
                                content={message.content}
                                fileUrl={message.fileUrl}
                                deleted={message.deleted}
                                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                isUpdated={message.updatedAt !== message.createdAt}
                                socketUrl={socketUrl}
                                socketQuery={socketQuery}
                                member={message.member}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
            <div ref={bottomRef}/>
        </div>
    )
}

