import prisma from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const MockId = searchParams.get("id") as string
    try {
        const data = await prisma.mockInterview.findUnique({
            where: {
                MockId: MockId
            },
        })
        return NextResponse.json({ data: data }, { status: 201 })
    } catch (error) {
        console.error("Error creating mock interview:", error);
        return NextResponse.json(
            { error: "Failed to create mock interview." },
            { status: 500 }
        );
    }
}