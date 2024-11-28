
import prisma from "../../../lib/db";
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
        const {name,type,serverId} = await req.json();
        
        if(name==='general'){
            return new NextResponse("Name cannot be general",{status:400})
        }
        const server = await prisma.server.update({
            where:{
                id:serverId,
                userId:user.id
            },
            data:{
                channel:{
                    create:{
                        userId:user.id,
                        name:name,
                        type:type
                    }
                }
            }
        })
        return NextResponse.json(server, { status: 200 });
    } catch (error) {
        console.log("[channel_error]",error);        
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
