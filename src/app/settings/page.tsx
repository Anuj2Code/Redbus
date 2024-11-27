import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "../lib/db"
import { redirect } from "next/navigation"
import { SettingsForm } from "../components/SettingsForm";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      userName: true,
      email: true
    }
  })
  return data;
}

export default async function SettingsPage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  
  if (!user) {
    return redirect("/api/auth/login");
  }
  
  const data = await getData(user?.id)
  
  return (
    <div className="w-full h-screen flex flex-col bg-black items-center justify-center px-4 sm:px-8 md:px-14">
      <div className="w-full max-w-2xl">
        <SettingsForm username={data?.userName} email={data?.email} />
      </div>
    </div>
  )
}

