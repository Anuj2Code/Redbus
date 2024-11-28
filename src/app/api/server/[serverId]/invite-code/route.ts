import prisma from "../../../../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest,NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req:NextRequest,{params}:{params:{serverId:string}}) {
    try {
        const {getUser} = getKindeServerSession();
        const user = await getUser();
        if(!user){
            return new NextResponse("UnAuthorized",{status:401})
        }
        if(!params.serverId){
            return new NextResponse("serverId is missing",{status:400})
        }

        const server = await prisma.server.update({
            where:{
                id:params.serverId,
                userId:user.id
            },
            data:{
                inviteCode:uuidv4()
            }
        })
        return NextResponse.json(server)
    } catch (error) {
        console.log("[server_ID 7]",error);
        return NextResponse.json("Internal error",{status:500})
    }
}