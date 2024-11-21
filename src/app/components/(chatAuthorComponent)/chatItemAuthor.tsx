"use client"

import { User } from "@prisma/client";
import { UserAvatar } from "../UserAvatar"

interface chatItemProps {
    id: string;
    content: string;
    timestamp: string;
    Member: User;
    socketUrl: string;
    socketQuery: Record<string, string>
}

export default function ChatBody({ id, content, timestamp, Member }: chatItemProps) {

    return (
        <div className="relative group mt-4 flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <div className="cursor-pointer hover:drop-shadow-md transition">
                    <UserAvatar src={Member.imageUrl as string} username={Member.userName as string} />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p className="font-semibold text-sm hover:underline cursor-pointer">
                                {Member.userName}
                            </p>
                        </div>
                        <span className="text-sm text-zinc-400">
                            {timestamp}
                        </span>
                    </div>
                    <p className="text-sm text-zinc-300">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    )
}