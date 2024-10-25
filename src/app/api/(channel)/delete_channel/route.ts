
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        if (!user) {
            return redirect("/api/auth/login");
        }
        const {channelId,serverId} = await req.json();
  
        const server = await prisma.server.update({
            where:{
                id:serverId,
                Members:{
                    some:{
                        userId:user.id,
                        role:{
                            in:[MemberRole.ADMIN]
                        }
                    }
                }
            },
            data:{
                channel:{
                    delete:{
                        id:channelId,
                        name:{
                            not:"general"
                        }
                    }
                }
            }
        })
        return NextResponse.json(server, { status: 200 });
    } catch (error) {
        console.log("[Channel_delete]",error);        
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
