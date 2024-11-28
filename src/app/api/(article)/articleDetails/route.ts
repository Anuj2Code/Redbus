import prisma from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const articleId = searchParams.get("id")
        
        const result = await prisma.articleComment.findMany({
            where:{
                articleId:articleId as string
            },
            select:{
                text:true,
                User:true,
            }
        })
        return NextResponse.json({
            data:result,
            message: "Article data has been fetched",
            status: "green",
        })
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Sorry something went wrong!",
        };
    }
}
