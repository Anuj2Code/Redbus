"use client"
import { useChatAuthor } from "../../hooks/useAuthorQuery";
import { Loader2, ServerCrash } from "lucide-react";
import ChatBody from "./(chatAuthorComponent)/chatItemAuthor";
import { format } from "date-fns"
import { useChatSocket } from "../../hooks/use-chat-socket";

const DATE_FORMAT = "d MMM yyyy, HH"

interface props {
    apiUrl: string;
    chatId: string
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
}

export default function ChatAuthorMessage({ apiUrl, chatId, socketUrl, paramKey, paramValue, socketQuery }: props) {

    const queryKey = `chatAuthor:${chatId}`
    const addKey = `chatAuthor:${chatId}:messages`;
    const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } = useChatAuthor({
        queryKey,
        apiUrl,
        paramKey,
        paramValue
    })

    useChatSocket({
        queryKey,
        addKey,
    })

    if (status === "loading") {
        return (
            <div className="flex flex-col h-[70vh] items-center justify-center bg-black">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-sm text-zinc-400">Loading Message ...</p>
            </div>
        )
    }
    if (status === "error") {
        return (
            <div className="flex flex-col h-[70vh] items-center justify-center bg-black">
                <ServerCrash className="h-7 w-7 text-zinc-500  my-4" />
                <p className="text-sm text-zinc-400">Something went wrong !</p>
            </div>
        )
    }

    return (
        <div className=" flex flex-col overflow-y-auto h-[70vh] bg-black">
            <div className="h-[600px] text-white z-50">
                {data?.pages?.map((group, i) => (
                    <>
                        {group.items.map((message: any) => (
                            <ChatBody
                                key={message.id}
                                id={message.id}
                                Member={message.user}
                                content={message.content}
                                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                socketUrl={socketUrl}
                                socketQuery={socketQuery}
                            />
                        ))}
                    </>
                ))}
            </div>
        </div>
    )
}