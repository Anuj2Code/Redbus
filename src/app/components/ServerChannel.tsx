"use client";

import { cn } from "@/lib/utils";
import { channel, channelType, MemberRole, server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Actiontooltip } from "./ui/tooltip-action";
import Link from "next/link";
import { useModal } from "@/hooks/use-modal-store";

interface serverChannelProps {
    channel: channel;
    server: server;
    role?: MemberRole
}

const iconMap = {
    [channelType.TEXT]: Hash,
    [channelType.AUDIO]: Mic,
    [channelType.VIDEO]: Video
}

export default function ServerChannel({ channel, server, role }: serverChannelProps) {
    const params = useParams()
    const router = useRouter()
    const Icon = iconMap[channel.type];
    const onNavigate = () => {
        router.push(`/servers/${params.serverId}/channels/${channel.id}`);
    }
    const { onOpen } = useModal()
    return (
        <button
            onClick={onNavigate}
            className={cn("group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-500/10 transition mb-1 ")}
        >
            <Icon className="flex-shrink-0 h-5 w-5 text-zinc-500 " />
            <p className={cn("line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-400 transition", params?.channelId === channel.id && "text-primary")}>{channel.name}</p>
            {channel.name !== 'general' && role !== 'GUEST' && (
                <div className="ml-auto flex items-center gap-x-2">
                    <Actiontooltip label="Delete">
                        <Link href="/removeChannel" onClick={() => onOpen("deleteChannel", { server, channel })}>
                            <Trash
                                className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-400 transition"
                            />
                        </Link>
                    </Actiontooltip>
                </div>
            )}
            {channel.name === 'general' && (
                <Lock className="ml-auto h-4 w-4 text-zinc-400" />
            )}
        </button>
    )
}