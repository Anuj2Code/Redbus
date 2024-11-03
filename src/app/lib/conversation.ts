import prisma from "./db";

export async function getOrCreateConverstion(memberIdOne: string, memberIdTwo: string) {
    try {
      let conversation = await FindConversation(memberIdOne,memberIdTwo) || await FindConversation(memberIdTwo,memberIdOne);
      if(!conversation){
         conversation = await CreateConversation(memberIdOne,memberIdTwo);
      }
      return conversation;
    } catch (error) {
        console.log("[Get_conversation_error]", error);
    }
}

export async function FindConversation(memberIdOne: string, memberIdTwo: string) {
    try {
        return await prisma.conversation.findFirst({
            where: {
                AND: [
                    { memberOneId: memberIdOne },
                    { memberTwoId: memberIdTwo }
                ]
            },
            include: {
                memberOne: {
                    include: {
                        User: true
                    }
                },
                memberTwo: {
                    include: {
                        User: true
                    }
                }
            }
        })
    } catch (error) {
        console.log("[conversation_error]", error);
    }
}

export async function CreateConversation(memberIdOne: string, memberIdTwo: string) {
    try {
        return await prisma.conversation.create({
            data: {
                memberOneId: memberIdOne,
                memberTwoId: memberIdTwo
            },
            include: {
                memberOne: {
                    include: {
                        User: true
                    }
                },
                memberTwo: {
                    include: {
                        User: true
                    }
                }
            }
        })
    } catch (error) {
        console.log("[Create_conversation_error]", error);
    }
}