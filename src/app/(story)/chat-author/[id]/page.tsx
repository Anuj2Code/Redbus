import AuthorTop from "@/app/components/(chatAuthorComponent)/AuthorTop";
import ChatAuthorMessage from "@/app/components/ChatAuthor";
import ChatSender from "@/app/components/ChatSender";
import { getOrCreateAuthorConverstaion } from "@/app/lib/conversationAuthor";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function ChatAuthor({ params }: { params: { id: string } }) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login");
    }
    const userName = await prisma.user.findUnique({
        where: {
            id: params.id
        },
        select: {
            userName: true
        }
    })
    if (!userName) {
        return (
            <div>
                <p>User not found</p>
            </div>
        );
    }

    const conversation = await getOrCreateAuthorConverstaion(user.id, params.id);
    if (!conversation) {
        return (
            <div>
                <p>We cannot create conversation</p>
            </div>
        );
    }
    const { UserOne, UserTwo } = conversation
    let otherMember = UserOne.id === user.id ? UserTwo : UserOne
    return (
        <div>
            <AuthorTop userName={otherMember.userName} imageUrl={otherMember.imageUrl} />
            <ChatAuthorMessage
                apiUrl="/api/author-message"
                chatId={conversation.id}
                socketUrl="/api/socket/authorChat"
                socketQuery={{
                    conversationId: conversation.id
                }}
                />
                <ChatSender
                   name={otherMember.userName!}
                   apiUrl="/api/socket/authorChat"
                   query={{
                    conversationId: conversation.id
                }}
                />
        </div>
    )
}