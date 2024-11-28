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
        const vote = await prisma.storyVote.findFirst({
            where: {
                articleId: id as string,
                userId: user.id,
            },
        })
        if (vote) {
            if (vote.activeVote === true) {
                await prisma.storyVote.delete({
                    where: {
                        id: vote.id,
                    },
                })
            }
            else {
                await prisma.storyVote.update({
                    where: {
                        id: vote.id,
                    },
                    data: {
                        activeVote: true
                    }
                })
            }
        }else{
            await prisma.storyVote.create({
                data: {
                    activeVote: true,
                    articleId: id as string,
                    userId: user.id,
                },
            });
        }

        const voteNumber = await prisma.storyVote.count({
            where:{
                articleId: id as string,
                activeVote:true
            }
        })
        return NextResponse.json({ isOk: true,vote:voteNumber, })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ isOk: false })
    }
}