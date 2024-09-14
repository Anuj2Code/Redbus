import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "../lib/db"
import { redirect } from "next/navigation"
import { SettingsForm } from "../components/SettingsForm";


async function getData(userId:string){
   const data = await prisma.user.findUnique({
    where:{
      id:userId
    },
    select:{
      userName:true,
      email:true
    }
   })
  return data;
}

export default async function SettingsPage() {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  if(!user){
    return redirect("/api/auth/login");
  }
  const data = await getData(user?.id)
  return (
    <div className="w-auto items-center h-screen mx-auto flex flex-col bg-black">
      <div className="px-14 w-[80%]">
      <SettingsForm username={data?.userName} email={data?.email}/>
      </div>
    </div>
  )
}

