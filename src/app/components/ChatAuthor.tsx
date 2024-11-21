import { useChatAuthor } from "@/hooks/use-chat-author-query";
import { Loader2, ServerCrash } from "lucide-react";

interface props {
    apiUrl: string;
    chatId: string
    socketUrl: string;
    socketQuery: Record<string, string>;
}

export default function ChatAuthorMessage({ apiUrl, chatId,  socketUrl, socketQuery }: props) {

    const queryKey = `chatAuthor:${chatId}`

    const { data, status } = useChatAuthor({ apiUrl, queryKey, chatId })
    console.log(data,'[data is from usechatQuery]');
    
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
        <div className=" flex flex-col overflow-y-auto h-[70vh] bg-black">
           hi
        </div>
    )
}