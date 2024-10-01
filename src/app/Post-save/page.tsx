import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {  Heart, MessageCircle, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CopyLink } from "../components/CopyLink";
import PostComment from "../components/PostComment";

async function findData(userId: string) {
    try {
        const data = await prisma.save.findMany({
            where: {
                userId: userId,
            },
            select: {
                postId: true
            }
        })
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function Post_detail(postObjects: { postId: string }[] | undefined) {
    const postIds = postObjects?.map(post => post.postId) || [];
    try {
        const data = await prisma.post.findMany({
            where: {
                id: {
                    in: postIds
                }
            },
            select: {
                createdAt: true,
                title: true,
                imageString: true,
                textContent: true,
                subName: true,
                id: true,
                Vote: {
                    select: {
                        voteType: true,
                    },
                },
                comments: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    select: {
                        id: true,
                        text: true,
                        replyId: true,
                        createdAt: true,
                        User: {
                            select: {
                                imageUrl: true,
                                userName: true,
                            },
                        },
                        reply: {
                            select: {
                                id: true,
                                text: true,
                                createdAt: true,
                                userName: true,
                                imageString: true
                            }
                        },
                        votes: {
                            select: {
                                userId: true,
                                voteType: true
                            }
                        },
                    },
                },
                Subbreddits: {
                    select: {
                        name: true,
                        createdAt: true,
                        description: true,
                    },
                },
                User: {
                    select: {
                        userName: true,
                    },
                },
            },
            orderBy:{
                createdAt:"desc"
            }
        })
        return data;
    } catch (error) {
        console.log(error);
    }
}

export default async function savePost() {
    const { getUser } = getKindeServerSession();
    const user = await getUser()
    const save_details = await findData(user?.id!)
    const post_details = await Post_detail(save_details);

    return (
        <div className="flex bg-black justify-center py-2">
            <div className="w-[50%] gap-4 flex flex-col justify-center mt-4">
                {post_details ? post_details.map((item) => {
                    return (
                        <Card className="flex gap-4 relative overflow-hidden" key={item.id}>
                            <div className="flex flex-col items-center gap-y-2 bg-muted p-3 justify-center">
                                <Link href={`/post/${item.id}`}>
                                    <Heart />
                                </Link>
                                {
                                    item.Vote.reduce((acc: number, vote: { voteType: string; }) => {
                                        if (vote.voteType === "UP") return acc + 1;
                                        if (vote.voteType === "DOWN") return acc - 1;

                                        return acc;
                                    }, 0)
                                }
                            </div>
                            <div>
                                <div className="md:w-[600px] flex items-center justify-between gap-x-2 p-2">
                                    <div>
                                    <Link className="font-semibold text-xs" href={`/r/${item.subName}`}>
                                        r/{item.subName}
                                    </Link>
                                    <p className="text-xs text-muted-foreground">
                                        Posted by: <span className="hover:text-primary">u/{item.User?.userName}</span>
                                    </p>
                                    </div>
                                    <div>
                                    <Trash />
                                    </div>
                                </div>

                                <div className="px-2">
                                    <Link href={`/post/${item.id}`}>
                                        <h1 className="font-medium mt-1 text-lg">{item.title}</h1>
                                    </Link>
                                </div>
                                <div className="max-h-[300px] overflow-hidden">
                                    {item.imageString ? (
                                        <Image
                                            src={item.imageString}
                                            alt="Post Image"
                                            width={600}
                                            height={300}
                                            className="w-full h-full"
                                        />
                                    ) : (
                                        <div
                                            className='prose-headings:font-title font-default prose mt-4 dark:prose-invert focus:outline-none'
                                            dangerouslySetInnerHTML={{ __html: item.textContent! }}
                                        ></div>
                                    )}
                                </div>
                                <div className="flex">
                                    <Button variant="secondary" size="sm" className="bg-[#020817] hover:bg-[#020817]">
                                        <div className="m-3 flex items-center gap-x-5">
                                            <div className="bg-[#020817] hover:cursor-pointer" ><div className="flex items-center gap-x-1">
                                                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-muted-foreground font-medium text-xs">
                                                    {0} Comments
                                                </p>
                                            </div>
                                            </div>
                                        </div>
                                    </Button>
                                    <CopyLink id={item.id} />
                                </div>
                                <div className='flex flex-col gap-y-6 mt-4'>
                                    {
                                        item.comments.length !== 0 ?
                                            item.comments.filter((comment: any) => !comment.replyId).map((topLevelComment: any) => {
                                                return (
                                                    <div className='mb-2'>
                                                        <PostComment
                                                            comments={topLevelComment}
                                                        />
                                                    </div>
                                                )
                                            })
                                            : <p className="text-muted-foreground font-medium text-sm pl-6 pb-3">
                                                No comments to show !
                                            </p>
                                    }
                                </div>
                            </div>
                        </Card>
                    )
                })
            :
            <p>
                No Bookmark 
            </p>
            }
            </div>
        </div>
    )

}