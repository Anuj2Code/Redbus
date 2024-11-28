import ServerSidebar from "../../../components/server-sidebar";
import prisma from "../../../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function MainLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params:{serverId:string}
}) {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }
   
    const server = await prisma.server.findUnique({
        where:{
            id:params.serverId,
            Members:{                     // this is so because those who are the member of server can load the server
                some:{
                    userId:user.id
                }
            }
        }
    })

    if(!server){
        return redirect("/")
    }
   
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed ">
             <ServerSidebar serverId ={server.id}/>
            </div>
            <main className="md:pl-[72px] h-full md:ml-52 bg-black">
                {children}
            </main>
        </div>
    )
}
