
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { Card } from "../../components/ui/card";
import Link from "next/link";
import { Heart, MessageCircle, Star, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { CopyLink } from "../components/CopyLink";
import PostComment from "../components/PostComment";
import { saveDelete } from "../server";
import { TextGenerateEffectDemo } from "../components/TextGenerateEffect";
import { Label } from "../../components/ui/label";

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
            orderBy: {
                createdAt: "desc"
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
        <div className="flex bg-black justify-center items-center flex-col py-16">
            {post_details?.length ? <Label className="w-auto h-auto text-4xl font-semibold bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-blue-500 to-sky-500 flex gap-4"><Star className="text-white mt-2" /> <p>My BookMark</p></Label> : null}
            <div className="gap-4 flex w-[100vw]  items-center flex-col justify-center mt-4">
                {post_details?.length ? post_details.map((item) => {
                    return (
                        <Card className="flex flex-col md:flex-row gap-4 relative overflow-hidden" key={item.id}>
                            {/* Left Column: Vote and Heart Button */}
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

                            {/* Right Column: Post Details */}
                            <div className="flex flex-col w-full">
                                {/* Subreddit Info and Post Delete */}
                                <div className="flex flex-col md:flex-row items-start justify-between gap-2 p-2">
                                    <div>
                                        <Link className="font-semibold text-xs" href={`/r/${item.subName}`}>
                                            r/{item.subName}
                                        </Link>
                                        <p className="text-xs text-muted-foreground">
                                            Posted by: <span className="hover:text-primary">u/{item.User?.userName}</span>
                                        </p>
                                    </div>
                                    <div className="mt-4 md:mt-0">
                                        <form action={saveDelete}>
                                            <input type="hidden" name="id" value={item.id} />
                                            <Button type="submit" className="">
                                                <Trash />
                                            </Button>
                                        </form>
                                    </div>
                                </div>

                                {/* Post Title */}
                                <div className="px-2">
                                    <Link href={`/post/${item.id}`}>
                                        <h1 className="font-medium mt-1 text-lg">{item.title}</h1>
                                    </Link>
                                </div>

                                {/* Post Image or Content */}
                                <div className="max-h-[300px] overflow-hidden">
                                    {item.imageString ? (
                                        <Image
                                            src={item.imageString}
                                            alt="Post Image"
                                            width={600}
                                            height={300}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div
                                            className="prose-headings:font-title font-default prose mt-4 dark:prose-invert focus:outline-none"
                                            dangerouslySetInnerHTML={{ __html: item.textContent! }}
                                        ></div>
                                    )}
                                </div>

                                {/* Action Buttons (Comments and Copy Link) */}
                                <div className="flex items-center gap-4 mt-4">
                                    <Button variant="secondary" size="sm" className="bg-[#020817] hover:bg-[#020817]">
                                        <div className="m-3 flex items-center gap-x-5">
                                            <div className="bg-[#020817] hover:cursor-pointer">
                                                <div className="flex items-center gap-x-1">
                                                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                                                    <p className="text-muted-foreground font-medium text-xs">
                                                        {item.comments.length} Comments
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Button>
                                    <CopyLink id={item.id} />
                                </div>

                                {/* Comments Section */}
                                <div className="flex flex-col gap-y-6 mt-4">
                                    {item.comments.length !== 0 ? item.comments.filter((comment: any) => !comment.replyId).map((topLevelComment: any) => (
                                        <div key={topLevelComment.id} className="mb-2">
                                            <PostComment comments={topLevelComment} />
                                        </div>
                                    )) : (
                                        <p className="text-muted-foreground font-medium text-sm pl-6 pb-3">
                                            No comments to show!
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Card>

                    )
                }) :
                    <TextGenerateEffectDemo
                    />
                }
            </div>
        </div>
    )

}