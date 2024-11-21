import prisma from "./db";

export async function getOrCreateAuthorConverstaion(userIdOne: string, UserIdTwo: string) {
    try {
        let conversation = await FindConversation(userIdOne, UserIdTwo) || await FindConversation(UserIdTwo, userIdOne);
        if (!conversation) {
            conversation = await CreateConversation(userIdOne, UserIdTwo);
        }
        return conversation;
    } catch (error) {
        console.log("[Get_conversation_error]", error);
    }
}

export async function FindConversation(UserIdOne: string, UserIdTwo: string) {
    try {
        return await prisma.authorConverstaion.findFirst({
            where: {
                AND: [
                    { userIdOne: UserIdOne },
                    { userIdTwo: UserIdTwo }
                ]
            },
            include: {
                UserOne: true,
                UserTwo: true
            }
        })
    } catch (error) {
        console.log("[conversation_error]", error);
    }
}


export async function CreateConversation(UserIdOne: string, UserIdTwo: string) {
    try {
        return await prisma.authorConverstaion.create({
            data: {
                userIdOne: UserIdOne,
                userIdTwo: UserIdTwo
            },
            include: {
                UserOne: true,
                UserTwo: true
            }
        })
    } catch (error) {
        console.log("[Create_conversation_error]", error);
    }
}