import prisma from "../../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest,NextResponse } from "next/server"

export async function POST(req:NextRequest){
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }
    const {postId,text} = await req.json();
    try {
        await prisma.comment.create({
            data: {
                postId: postId,
                text: text,
                userId: user.id,
            }
        })
        return NextResponse.json({
            message: "Commented",
            status: "green",
        })
    } catch (error) {
        console.log(error,27);
    }
}
