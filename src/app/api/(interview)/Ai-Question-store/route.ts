import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    try {
        const { content, jobPosition, Description, Experience } = await req.json();


        const data = await prisma.mockInterview.create({
            data: {
                MockResp: content,
                JobDesc: Description,
                JobExperience: Experience,
                JobPost: jobPosition,
                createdBy: user?.email as string,
                userId: user?.id as string,
                MockId: randomUUID()
            }
        })
        return NextResponse.json({ data: data }, { status: 201 });
    } catch (error) {
        console.error("Error creating mock interview:", error);
        return NextResponse.json(
            { error: "Failed to create mock interview." },
            { status: 500 }
        );
    }
}