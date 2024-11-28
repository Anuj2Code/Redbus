import ServerWelcome from "../../../components/ServerWelcome";
import prisma from "../../../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function ServerPage({params}:{params:{serverId:string}}) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login");
    }

    const server = await prisma.server.findUnique({
        where:{
            id:params.serverId,
            Members:{
                some:{
                    userId:user.id
                }
            }
        },
        include:{
            channel:{
                where:{
                    name:"general"
                },
                orderBy:{
                    createdAt:'asc'
                }
            },
        }
    })
    // // console.log(server,"server sdatat");
    // const initialChannels = server?.channel[0];
    // // if(initialChannels?.name!=='general') return null;
    // // return redirect(`/servers/${server?.id}/channels/${initialChannels?.id}`)
    return (
        <ServerWelcome name={server?.name as string} />
    )
}