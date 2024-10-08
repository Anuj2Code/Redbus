
import React, { use } from "react";
import Link from "next/link";
import img1 from "../../../public/R.gif"
import Image from "next/image";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserDropdown } from "./UserDropdown";
import prisma from "../lib/db";

async function getData(email: string) {
 const data =  await prisma.user.findUnique({
    where: {
      email: email
    },
    select: {
      createdSubbreddits:{
        select:{
          name:true,
          id:true,
          userId:true
        }
      }
    }
  })
  return data
}

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let reddit
  if(user){
    const data = await getData(user?.email!)
     reddit = data?.createdSubbreddits.find((id)=> id.userId===user?.id)
  }
  
  return (
    <nav className="h-[10vh] w-full flex items-center  px-5 lg:px-14 justify-between bg-black z-50">
      <Link href="/" className="flex items-center gap-x-3">
        <div className="z-50">
          <Image
            className="rounded-full bg-black "
            src={img1}
            alt="Picture of the author"
            width={80}
            height={80}
          />
        </div>
      </Link>
      <div className="flex items-center gap-x-4">
        <div className="flex gap-6 mt-[10px] ">
          {user ? <UserDropdown userImage={user.picture} reddit={reddit?.name} /> : <>
            <div className="z-50">
              <button className="h-[40px] w-[160px] bg-orange-500 text-white rounded-lg z-50"><RegisterLink>Sign up</RegisterLink></button>
            </div>
            <div className="z-50">
              <button className="h-[40px] w-[160px] bg-orange-500 text-white rounded-lg z-50">
                <LoginLink>Log in</LoginLink>
              </button>
            </div>
          </>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar

