import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../lib/db";
import { channelType, MemberRole } from "@prisma/client";
import Serverheader from "./ServerHeader";
import { ScrollArea } from "../../components/ui/scroll-area";
import ServerSearch from "./ServerSearch";
import { Hash, Mic, Shield, Video } from "lucide-react";
import { Separator } from "../../components/ui/separator";
import ServerSection from "./ServerSection";
import ServerChannel from "./ServerChannel";
import ServerMembers from "./ServerMembers";

interface props {
    serverId: string
}

const iconMap = {
    [channelType.TEXT]: <Hash className="mr-2 h-4 w-4 " />,
    [channelType.AUDIO]: <Mic className="mr-2 h-4 w-4 " />,
    [channelType.VIDEO]: <Video className="mr-2 h-4 w-4 " />,
}

const roleIcon = {
    [MemberRole.ADMIN]: <Shield className="text-red-500" />,
    [MemberRole.GENERATOR]: <Shield className="text-green-500" />,
    [MemberRole.GUEST]: <Shield className="text-green-500" />
}

export default async function ServerSidebar({ serverId }: props) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const server = await prisma.server.findUnique({
        where: {
            id: serverId
        },
        include: {
            channel: {
                orderBy: {
                    createdAt: "asc"
                }
            },
            Members: {
                include: {
                    User: true
                },
                orderBy: {
                    role: "asc"
                }
            }
        }
    })
    // console.log(server,"server data hai ??");

    const textChannel = server?.channel.filter((channel) => channel.type === channelType.TEXT);
    const audioChannel = server?.channel.filter((channel) => channel.type === channelType.AUDIO);
    const videoChannel = server?.channel.filter((channel) => channel.type === channelType.VIDEO);
    const members = server?.Members.filter((member) => member.userId !== user.id);

    if (!server) {
        return redirect("/")
    }

    const role = server.Members.find((member) => member.userId === user.id)?.role;

    return (
        <div className="flex flex-col h-full text-primary bg-[#2B2D31] max-[780px]:w-full">
            <Serverheader server={server} role={role} />
            <ScrollArea className="flex px-3">
                <div className="mt-2">
                    <ServerSearch
                        data={[
                            {
                                label: "Text Channels",
                                type: 'channel',
                                data: textChannel?.map((channel) => (
                                    {
                                        id: channel.id,
                                        name: channel.name,
                                        icon: iconMap[channel.type]
                                    }
                                ))
                            },
                            {
                                label: "Video Channels",
                                type: 'channel',
                                data: videoChannel?.map((channel) => (
                                    {
                                        id: channel.id,
                                        name: channel.name,
                                        icon: iconMap[channel.type]
                                    }
                                ))
                            },
                            {
                                label: "Voice channels",
                                type: 'channel',
                                data: audioChannel?.map((channel) => (
                                    {
                                        id: channel.id,
                                        name: channel.name,
                                        icon: iconMap[channel.type]
                                    }
                                ))
                            },
                            {
                                label: "Members",
                                type: 'members',
                                data: members?.map((member) => (
                                    {
                                        id: member.id,
                                        name: member.User.userName,
                                        icon: roleIcon[member.role]
                                    }
                                ))
                            },
                        ]}
                    />
                </div>
                <Separator className="bg-zinc-700 rounded-md my-2 w-full" />
                {!!textChannel && (
                    <div className="mb-2">
                        <ServerSection sectionType="channel" channelType={channelType.TEXT} role={role} server={server} label="Text Channels" />
                    </div>
                )}
                {textChannel?.map((channel) => (
                    <ServerChannel
                        key={channel.id}
                        server={server}
                        role={role}
                        channel={channel}
                    />
                ))}
                {!!audioChannel && (
                    <div className="mb-2">
                        <ServerSection sectionType="channel" channelType={channelType.AUDIO} role={role} server={server} label="Audio Channels" />
                    </div>
                )}
                {audioChannel?.map((channel) => (
                    <ServerChannel
                        key={channel.id}
                        server={server}
                        role={role}
                        channel={channel}
                    />
                ))}
                {!!videoChannel && (
                    <div className="mb-2">
                        <ServerSection sectionType="channel" channelType={channelType.VIDEO} role={role} server={server} label="Video Channels" />
                    </div>
                )}
                {videoChannel?.map((channel) => (
                    <ServerChannel
                        key={channel.id}
                        server={server}
                        role={role}
                        channel={channel}
                    />
                ))}
                {!!members && (
                    <div className="mb-2">
                        <ServerSection sectionType="members" role={role} server={server} label="Members" />
                    </div>
                )}
                {members?.map((member,idx:any) => (
                    <ServerMembers members={member} server={server}  key={idx}/>
                ))}
            </ScrollArea>
        </div>
    )
}