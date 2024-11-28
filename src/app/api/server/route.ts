import prisma from "../../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { NextResponse,NextRequest } from "next/server";
import {v4 as uuidv4} from "uuid"

export async function POST(req:NextRequest) {
   try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login");
    }
    const {name,imageUrl} = await req.json();
    const server = await prisma.server.create({
        data:{
            userId:user.id,
            name:name,
            imageUrl:imageUrl,
            inviteCode:uuidv4(),
            channel:{
                create:[
                    {
                        name:"general",
                        userId:user.id,
                    }
                ]
            },
            Members:{
                create:[
                    {
                        userId:user.id,
                        role :MemberRole.ADMIN
                    }
                ]
            }
        }
    })
    return NextResponse.json(server)
   } catch (error) {
    console.log(error);
    
   }
}