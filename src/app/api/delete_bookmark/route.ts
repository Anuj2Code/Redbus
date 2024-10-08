import prisma from "@/app/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { id } = await req.json()
    try {
        await prisma.save.delete({
            where: {
                postId: id
            }
        })
        return NextResponse.json({
            message: "Bookmark delete",
            status: "green",
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Something went wrong",
            status: "red",
        })
    }
}