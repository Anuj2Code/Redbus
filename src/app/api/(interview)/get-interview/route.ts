import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const {searchParams} = new URL(req.url)
    const id = searchParams.get("id");
    try {
       const data = await prisma.mockFeedback.findMany({
        where:{
            MockIdRef:id as string
        },
        select:{
            question:true,
            correctAnswer:true,
            userAnswer:true,
            feedback:true,
            rating:true,
            User:true
        }
       })
       return NextResponse.json({data:data},{status:201})
    } catch (error) {
        console.log(error);
        return NextResponse.json({data:"Error in feedback"},{status:401})
    }
}