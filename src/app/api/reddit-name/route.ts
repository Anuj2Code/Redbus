import prisma from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const data =  await prisma.user.findUnique({
    where: {
      email: email
    },
    select: {
      createdSubbreddits:{
        select:{
          name:true,
          id:true,
          userId:true,
          User:{
            select:{
              userName:true
            }
          }
        }
      }
    }
  })

  if (!data) {
    return NextResponse.json({
      message: "Not Found",
      status: "red",
    })
  }

  return NextResponse.json({
    data: data,
    message: "Post ",
    status: "green",
  })
}
