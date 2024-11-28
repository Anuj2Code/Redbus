import prisma from "../../../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    try {
        const vote = await prisma.follow.findFirst({
            where: {
                articleId: id as string,
                userId: user.id,
            },
        })
        if (vote) {
            if (vote.activeFollower === true) {
                await prisma.follow.delete({
                    where: {
                        id: vote.id,
                    },
                })
            }
            else {
                await prisma.follow.update({
                    where: {
                        id: vote.id,
                    },
                    data: {
                        activeFollower: true
                    }
                })
            }
        }else{
            await prisma.follow.create({
                data: {
                    activeFollower: true,
                    articleId: id as string,
                    userId: user.id,
                },
            });
        }

        const FollowerNumber = await prisma.follow.count({
            where:{
                articleId: id as string,
                activeFollower:true
            }
        })
        const isFollowed = await prisma.follow.findFirst({
            where:{
                articleId: id as string,
                userId: user.id,
            }
        })

        return NextResponse.json({ isOk: true,vote:FollowerNumber,follow:isFollowed?true:false })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ isOk: false })
    }
}