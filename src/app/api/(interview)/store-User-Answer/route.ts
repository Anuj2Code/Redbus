import prisma from "../../../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { getUser } = getKindeServerSession()
        const user = await getUser();
        const { mockId, question, correctAnswer, userAnswer, feedback, rating } = await req.json();
        const data = await prisma.mockFeedback.create({
            data: {
                MockIdRef: mockId,
                question: question,
                correctAnswer: correctAnswer,
                userAnswer: userAnswer,
                feedback: feedback,
                rating: rating,
                userId: user?.id as string
            }
        })
        return NextResponse.json({ data: data }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error while creating the session" }, { status: 401 })
    }
}