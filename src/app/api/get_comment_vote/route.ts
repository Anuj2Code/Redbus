import prisma from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const { commentId } = await req.json();
    const data = await prisma.comment.findFirst({
        where:{
             id:commentId,
        },
         select:{
            votes:{
                select:{
                    voteType:true
                }
            },
            userId:true
         }
    })
    if (!data) {
        return NextResponse.json({
          message: "Not Found",
          status: "red",
        })
      }
    
      return NextResponse.json({
        data:data,
        message: "done",
        status: "green",
      })
}