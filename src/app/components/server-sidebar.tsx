import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../lib/db";
import { channelType } from "@prisma/client";
import Serverheader from "./ServerHeader";

interface props{
    serverId:string
}

export default async function ServerSidebar({serverId}:props) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const server = await prisma.server.findUnique({
        where:{
            id:serverId
        },
        include:{
            channel:{
                orderBy:{
                    createdAt:"asc"
                }
            },
            Members:{
                include:{
                    User:true
                },
                orderBy:{
                   role:"asc"
                }
            }
        }
    })

    const textChannel  = server?.channel.filter((channel)=> channel.type===channelType.TEXT);
    const audioChannel = server?.channel.filter((channel)=> channel.type===channelType.AUDIO);
    const videoChannel = server?.channel.filter((channel)=> channel.type===channelType.VIDEO);
    const members = server?.Members.filter((member)=> member.userId!==user.id);

    if(!server){
       return redirect("/")
    }

    const role = server.Members.find((member)=>member.userId===user.id)?.role;

    return (
        <div className="flex flex-col h-full text-primary bg-[#2B2D31]">
            <Serverheader server={server} role={role}/>
        </div>
    )
}