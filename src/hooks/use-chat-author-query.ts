import { useSocket } from "@/app/components/providers/socket-provider";
import { useQuery } from "@tanstack/react-query";
import qs from "query-string"

interface useChatProps{
    apiUrl: string;
    queryKey: string;
    chatId:string
}

export const useChatAuthor = ({queryKey,apiUrl,chatId}:useChatProps)=>{
    const { isConnected } = useSocket();
    
    const fetchMessage = async () => {
        const url = qs.stringifyUrl({
            url: apiUrl,
            query: {
                conversationId:chatId
            }
        }, { skipNull: true })
        const res = await fetch(url);
        return res.json()
    }

  const {data,status} = useQuery({
        queryKey:[queryKey],
        queryFn:fetchMessage,
        refetchInterval:isConnected?false:1000,
    })

    return {
        data,
        status
    }
}