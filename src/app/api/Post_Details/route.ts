import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  const data = await prisma.post.findUnique({
    where: {
      id: id
    },
    select: {
      createdAt: true,
      title: true,
      imageString: true,
      textContent: true,
      subName: true,
      id: true,
      Vote: {
        select: {
          voteType: true,
        },
      },
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          text: true,
          User: {
            select: {
              imageUrl: true,
              userName: true,
            },
          },
        },
      },
      Subbreddits: {
        select: {
          name: true,
          createdAt: true,
          description: true,
        },
      },
      User: {
        select: {
          userName: true,
        },
      },
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
    message: "Post ",
    status: "green",
  })
}
