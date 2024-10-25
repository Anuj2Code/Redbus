"use client"

import { channelType, MemberRole } from "@prisma/client"
import { serverWithMemberChannelWithProfile } from "../../../types";
import { Actiontooltip } from "./ui/tooltip-action";
import { Plus, Settings } from "lucide-react";
import Link from "next/link";
import { useModal } from "@/hooks/use-modal-store";

interface serverSectionProps {
    label: string;
    role: MemberRole | undefined;
    sectionType: "channel" | "members";
    channelType?: channelType;
    server?: serverWithMemberChannelWithProfile;
}

export default function ServerSection({ label, role, sectionType, channelType, server }: serverSectionProps) {
    
    const {onOpen} = useModal();
    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-sm uppercase font-semibold text-zinc-400">{label}</p>
            {role !== MemberRole.GUEST && sectionType === 'channel' && (
                <Actiontooltip label="Create Channel" side="top">
                    <Link href="/createChannel" >
                        <button className="text-zinc-500 hover:text-zinc-600 transition " onClick={()=> onOpen("channel",{server})}>
                            <Plus className="h-4 w-4 "></Plus>
                        </button>
                    </Link>
                </Actiontooltip>
            )}
              {role === MemberRole.ADMIN && sectionType === 'members' && (
                <Actiontooltip label="Members" side="top">
                        <button className="text-zinc-500 hover:text-zinc-600 transition ">
                            <Settings className="h-4 w-4 "></Settings>
                        </button>
                </Actiontooltip>
            )}
        </div>
    )
}