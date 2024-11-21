import { useSocket } from "@/app/components/providers/socket-provider";
import { Member, Message, User } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type socketProps = {
    addKey: string;
    updateKey?: string;
    queryKey: string;
}

type MessageWithMemberProfile = Message & {
    member: Member & {
        User: User
    }
}

export const useChatSocket = ({ addKey, updateKey, queryKey }: socketProps) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) return;
        socket.on(updateKey, (message: MessageWithMemberProfile) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return oldData;
                }

                const newData = oldData.pages.map((page: any) => ({
                    ...page,
                    items: page.items.map((item: MessageWithMemberProfile) =>
                        item.id === message.id ? message : item
                    ),
                }));

                return {
                    ...oldData,
                    pages: newData,
                };
            });
        });

        socket.on(addKey, (message: MessageWithMemberProfile) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return {
                        pages: [
                            {
                                items: [message], // Start with the new message in items array
                            },
                        ],
                    };
                }

                const newData = [...oldData.pages];
                newData[0] = {
                    ...newData[0],
                    // Corrected to spread items as an array
                    items: [message, ...newData[0].items],
                };

                return {
                    ...oldData,
                    pages: newData,
                };
            });
        });

        return () => {
            socket.off(addKey);
            socket.off(updateKey);
        };
    }, [queryClient, addKey, queryKey, updateKey, socket]);
};