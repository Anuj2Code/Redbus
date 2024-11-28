import prisma from "../../../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    try {
        const data = await prisma.mockInterview.findMany({
            where: {
                userId: user?.id as string
            },
            select: {
                JobDesc: true,
                JobExperience: true,
                JobPost: true,
                createdAt: true,
                MockId :true
            }
        })
        return NextResponse.json({ data: data }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ data: "Error in feedback" }, { status: 401 })
    }
}