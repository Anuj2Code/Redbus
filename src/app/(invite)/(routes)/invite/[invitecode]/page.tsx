import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

interface pageProps{
    params:{
        invitecode:string
    }
}

export default async function invite({params}:pageProps) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user){
        return redirect("/api/auth/login");
    }
    if(!params.invitecode){
        return redirect("/");
    }
    const existingServer = await prisma.server.findFirst({
        where:{
            inviteCode:params.invitecode,
            Members:{
                some:{
                    userId:user.id
                }
            }
        }
    })

    if(existingServer){
       return redirect(`/servers/${existingServer.id}`)
    }

    const server = await prisma.server.update({
        where:{
            inviteCode:params.invitecode
        },
        data:{
            Members:{
                create:[
                    {
                        userId:user.id
                    }
                ]
            }
        }
    })
    if(server){
        return redirect(`/servers/${server.id}`);
    }
    return  null;
}