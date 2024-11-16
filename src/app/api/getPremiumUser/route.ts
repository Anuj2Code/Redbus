import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    if (!user) {
        return redirect("/api/auth/login");
    }
    try {
        const result = await prisma.userSubcription.findUnique({
            where: {
                email: user?.email as string
            },
            select: {
                active: true,
                paymentId: true
            }
        })
        if (!result) {
            return NextResponse.json({ isOk: false });
        }
        return NextResponse.json({ result, isOk: true });
    } catch (error) {
        console.log(error);
    }
}

/*
if you pass query through qs string 
then in the
api 
you have to get those query
using new URL method of nextjs.
*/
