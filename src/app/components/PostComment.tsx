import { CommentVote } from "@prisma/client"
import { ThumbsDown, ThumbsUp } from "lucide-react"
interface props {
    comments: any
    votesAmt?: number
    currentVote?: CommentVote | undefined
    postId?: string
}
import Image from "next/image"

export default function PostComment({ comments, votesAmt, currentVote, postId }: props) {
    return (
        <div>
            <div>
                <div className="flex items-center gap-x-4 w-[350px] ml-6">
                    <img
                        src={
                            comments.User?.imageUrl
                                ? comments.User.imageUrl
                                : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                        }
                        className="w-7 h-7 rounded-full"
                        alt="Avatar of user"
                    />
                    <div className="ml-2 flex items-center gap-x-2">
                        <p className='text-sm font-medium text-zinc-500'>u/{comments?.User?.userName}</p>
                        <p className="text-muted-foreground font-medium text-sm ">
                            {new Date(comments?.createdAt as Date).toLocaleDateString("en-us", {
                                weekday: "long",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                </div>
                <p className="ml-20 py-2 text-secondary-foreground text-sm tracking-wide">
                    {comments?.text}
                </p>
                <div className='flex gap-2 ml-12 items-center'>
                    <div className="flex justify-center gap-x-4 items-center p-2">
                        <ThumbsUp className="py-1" />
                        <div>
                            {comments.votes.reduce((acc: number, item: { voteType: string; }) => {
                                if (item.voteType === "UP") return acc + 1;
                                if (item.voteType === "DOWN") return acc - 1;
                                return acc;
                            }, 0)}
                        </div>
                        <ThumbsDown className="py-1" />
                    </div>
                </div>
            </div>
            <div>
                {comments?.reply?.map((item: any) => {
                    return (
                        <div className="relative left-32 my-8">
                            <div className="flex items-center gap-x-3 ">
                                <Image
                                    src={
                                        item?.imageString
                                            ? item.imageString
                                            : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                                    }
                                    height={100}
                                    width={100}
                                    className="w-7 h-7 rounded-full"
                                    alt="Avatar of user"
                                />
                                <h3 className="text-sm font-medium text-zinc-500">
                                    u/{item?.userName}
                                </h3>
                                <p className="text-muted-foreground font-medium text-sm ">
                                    {new Date(item?.createdAt as Date).toLocaleDateString("en-us", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                            <p className="ml-10 text-secondary-foreground text-sm tracking-wide">
                                {item?.text}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}