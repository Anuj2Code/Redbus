import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        if (!user) {
            return redirect("/api/auth/login");
        }
        const {serverId} = await req.json();
        const server = await prisma.server.update({
            where:{
                id:serverId,
                userId:{
                    not:user.id
                },
                Members:{
                    some:{
                        userId:user.id
                    }
                }
            },
            data:{
                Members:{
                    deleteMany:{
                        userId:user.id
                    }
                }
            }
        })
        return NextResponse.json(server, { status: 200 });
    } catch (error) {
        console.log("[channel_leave]",error);        
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}