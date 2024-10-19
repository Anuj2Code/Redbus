import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        if (!user) {
            return redirect("/api/auth/login");
        }
        const { memberId, serverId } = await req.json()
        const server = await prisma.server.update({
            where: {
                id: serverId,
                userId: user.id
            },
            data: {
                Members: {
                    delete: {
                        id: memberId
                    }
                }
            },
            include: {
                Members: {
                    include: {
                        User: true
                    }
                }
            }
        })
        return NextResponse.json(server)
    } catch (error) {
        console.log("[removeMember]", error);
    }
}