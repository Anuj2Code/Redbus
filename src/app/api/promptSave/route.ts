import prisma from "../../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {getUser} = getKindeServerSession()
    const user = await getUser()
   const {response,prompt,createdBy,generated} = await req.json() 
    try {
        const result = await prisma.aIOutput.create({
            data: {
                content: response,
                prompt: prompt,
                createdBy:createdBy,
                aiGenerated:generated,
                userId:user?.id as string
            }
        })
        return NextResponse.json({result,status:200,message:"Response has been saved to the database"})
    } catch (error) {
        console.log(error,"Error");        
    }
}