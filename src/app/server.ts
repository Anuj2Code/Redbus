"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { Prisma, TypeOfVote } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function UpdateUsername(preState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login")
    }
    const username = formData.get('username') as string;
    try {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                userName: username
            }
        })
        return {
            message: "Succesfully Updated name",
            status: "green",
        };

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return {
                    message: "This username is alredy used",
                    status: "error",
                };
            }
        }
        throw e;
    }
}

export async function UpdateEmail(preState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login")
    }
    const email = formData.get("email") as string;
    try {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                email: email
            }
        })
        return {
            message: "Succesfully Updated Email",
            status: "green",
        };
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function CreateCommunity(preState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login")
    }
    const name = formData.get("name") as string;
    try {
        const data = await prisma.subbreddits.create({
            data: {
                name: name,
                userId: user.id
            }
        })
        return redirect(`/r/${data.name}`);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return {
                    message: "This Name is alredy used !",
                    status: "error",
                };
            }
        }
    }
}

export async function updateSubDes(preState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login");
    }
    const name = formData.get("Subname") as string
    const desc = formData.get("description") as string
    try {
        await prisma.subbreddits.update({
            where: {
                name: name
            },
            data: {
                description: desc
            }
        })
        return {
            message: "Succesfully Updated Description",
            status: "green",
        };
    } catch (error) {
        return {
            status: "error",
            message: "Sorry something went wrong!",
        };
    }
}

export async function addSubscription(redditId: string) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return redirect("/api/auth/login");
    }
    try {
        const subExist = await prisma.subscription.findFirst({
            where: {
                subRedditId: redditId,
                userId: user.id
            }
        })
        if (subExist) {
            return {
                message: "You already Subscribed",
            }
        }
        await prisma.subscription.create({
            data: {
                subRedditId: redditId,
                userId: user.id
            }
        })
        return {
            message: "subscribed",
            status: "green",
        };
    } catch (error) {
        return {
            status: "error",
            message: "Sorry something went wrong!",
        };
    }
}


export async function createPost(data: {
    title: string
    imageUrl: string | null
    subName: string
    content: string
}
) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const data1 = await prisma.post.create({
        data: {
            title: data.title,
            imageString: data.imageUrl ?? undefined,
            subName: data.subName,
            userId: user.id,
            textContent: data.content,
        },
    });

    return redirect(`/post/${data1.id}`);
}


export async function handleVote(preData: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const postId = formData.get("postId") as string;
    const voteDirection = formData.get("voteDirection") as TypeOfVote;

    const vote = await prisma.vote.findFirst({
        where: {
            postId: postId,
            userId: user.id,
        },
    });

    if (vote) {
        if (vote.voteType === voteDirection) {
            await prisma.vote.delete({
                where: {
                    id: vote.id,
                },
            });
            return {
                message: "subscribed",
                status: "green",
            };
        }
        else {
            await prisma.vote.update({
                where: {
                    id: vote.id,
                },
                data: {
                    voteType: voteDirection,
                },
            });
            return {
                message: "subscribed",
                status: "green",
            };
        }
    }

    await prisma.vote.create({
        data: {
            voteType: voteDirection,
            userId: user.id,
            postId: postId,
        },
    });

    return {
        message: "subscribed",
        status: "green",
    };
}

export async function CommentVote(preData: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const commentId = formData.get("commentId") as string;
    const voteDirection = formData.get("voteDirection") as TypeOfVote;

    const vote = await prisma.commentVote.findFirst({
        where: {
            commentId: commentId,
            userId: user.id,
        },
    });

    if (vote) {
        if (vote.voteType === voteDirection) {
            await prisma.commentVote.delete({
                where: {
                    id: vote.id,
                },
            });
            return {
                message: "subscribed",
                status: "green",
            };
        }
        else {
            await prisma.commentVote.update({
                where: {
                    id: vote.id,
                },
                data: {
                    voteType: voteDirection
                }
            })
            return {
                message: "subscribed",
                status: "green",
            };
        }
    }

    await prisma.commentVote.create({
        data: {
            voteType: voteDirection,
            userId: user.id,
            commentId: commentId,
        },
    });

    return {
        message: "subscribed",
        status: "green",
    };
}

export async function createComment(preData: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }
    const postId = formData.get("postId") as string;
    const text = formData.get("text") as string;
    const replyId = formData.get("replyId") as string;
    console.log(text, "RepyId");

    try {
        await prisma.comment.create({
            data: {
                postId: postId,
                text: text,
                replyId: replyId,
                userId: user.id,
            }
        })
        return {
            message: "Commented",
            status: "green",
        };
    } catch (error) {
        console.log(error);

        return {
            status: "error",
            message: "Sorry something went wrong!",
        };
    }
}

export async function createComments(preData: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }
    const commentId = formData.get("commentId") as string;
    const text = formData.get("text") as string;
    console.log(text);
    console.log(commentId);

    try {
        const user_details = await prisma.user.findUnique({
            where: {
                id: user.id
            }
        })

        await prisma.commentReply.create({
            data: {
                commentId: commentId,
                text: text,
                userName: user_details?.userName!,
                imageString: user_details?.imageUrl
            }
        })
        return {
            message: "Commented  reply",
            status: "green",
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Sorry something went wrong!",
        };
    }
}

export async function save(preData:any,formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }
    const postId = formData.get("postId") as string
    console.log(postId);

    try {
        await prisma.save.create({
            data: {
                userId: user.id,
                postId: postId
            }
        })
        return {
            message: "Post has been saved successfully",
            status: "green",
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Sorry something went wrong!",
        };
    }
}

export async function saveDelete(formData: FormData) {
    const id = formData.get("id") as string
    try { 
         await prisma.save.delete({
            where: {
                postId:id
            }
        })
    } catch (error) {
        console.log(error);
    }
   return revalidatePath("/Post-save");
}

