
import { useSocket } from "../app/components/providers/socket-provider";
import { useInfiniteQuery } from "@tanstack/react-query";
import qs from "query-string"

interface useChatProps{
    apiUrl: string;
    queryKey: string;
    paramValue: string
    paramKey: "channelId" | "conversationId"
}

export const useChatAuthor = ({queryKey,apiUrl,paramKey,paramValue}:useChatProps)=>{
 const {isConnected} = useSocket()
 const fetchMessage = async ({ pageParam = undefined }) => {
        const url = qs.stringifyUrl({
            url: apiUrl,
            query: {
                cursor: pageParam,
                [paramKey]: paramValue
            }
        }, { skipNull: true })
        const res = await fetch(url);
        return res.json()
    }

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
        queryKey:[queryKey],
        queryFn:fetchMessage,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        refetchInterval:isConnected?false:1000,
    })

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    }
}