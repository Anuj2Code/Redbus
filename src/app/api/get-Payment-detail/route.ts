import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const { getUser } = getKindeServerSession()
    const user = await getUser();
    try {
        const result = await prisma.userSubcription.findMany({
            where: {
                email: user?.email as string
            },
            select: {
                paymentId: true,
                active: true,
                email: true
            }
        })
        if (!result) {
            return NextResponse.json({ isOk: false })
        }
        return NextResponse.json({ isOk: true, result });
    } catch (error) {
        console.log(error, "[Error in fetching the data of the payment detail]");
        return NextResponse.json(error);
    }
}