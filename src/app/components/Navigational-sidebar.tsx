import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
import prisma from "../lib/db";
import NavigationAction from "./Navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationItem from "./NavigationItem";

const NavigationSide = async() => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login");
    }

    const servers = await prisma.server.findMany({
        where:{
            Members:{
                some:{
                    userId:user.id
                }
            }
        }
    })

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full py-3 bg-[#262626]">
      <NavigationAction/>
      <Separator className="h-[2px] bg-zinc-300 rounded-md w-10 mx-auto"/>
       <ScrollArea className="flex-1 w-full">
         {servers.map((server)=>(
          <div key={server.id} className="mb-4">
             <NavigationItem id={server.id} name={server.name} image={server.imageUrl}/>
          </div>
         ))}
       </ScrollArea>
    </div>
  )
}

export default NavigationSide
