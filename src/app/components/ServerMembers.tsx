"use client"

import { cn } from "@/lib/utils";
import { Member, MemberRole, server, User } from "@prisma/client"
import { Shield } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { UserAvatar } from "./UserAvatar";

interface serverMembers {
    members: (Member & { User: User });
    server: server;
}
const roleIcon = {
    [MemberRole.ADMIN]: <Shield className="text-green-500 h-4 w-4" />,
    [MemberRole.GUEST]: null,
    [MemberRole.GENERATOR]: null
}

export default function ServerMembers({ members, server }: serverMembers) {
    const router = useRouter();
    const params = useParams();
    const onClick = ()=>{
        router.push(`/servers/${params.serverId}/conversations/${members.id}`)
    }
    const icon = roleIcon[members.role]
    return (
        <div>
            <button onClick={onClick} className={cn("group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/50 transition mb-1 ", params?.memberId === members.id && "bg-zinc-700")}>
                <UserAvatar src={members.User.imageUrl!} username={members.User.userName!} className="h-8 w-8" />
                <p className={cn("font-semibold text-sm text-zinc-500  group-hover:text-zinc-300 transition",params.membersId===members.id && "bg-zinc-700")}>{members.User.userName}</p>
              {icon}
            </button>
        </div>
    )
}