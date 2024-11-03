import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "../lib/db";
import { InitialModel } from "../components/modals/create-server";
import { redirect } from "next/navigation";

export default async function serverPage() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    const server = await prisma.server.findFirst({
        where:{
            Members:{
              some:{
                userId:user?.id
              }
            }
        }
    }) 
    
    if(server){
      return redirect(`/servers/${server.id}`)
    }
    return (
        <div>
          <InitialModel/>
        </div>
    )
} 