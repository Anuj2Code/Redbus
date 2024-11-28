import prisma from "../../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(req:NextRequest) {
    try {
        const { getUser } = getKindeServerSession()
        const user = await getUser()
        const count = await prisma.aIOutput.count({
            where: {
                createdBy: user?.email as string,
                aiGenerated:true
            }
        });
        return NextResponse.json(count);
    } catch (error) {
        console.log(error);
    }
}