import { CommentVote } from "@prisma/client"
import VoteOnComment from "./CommentVote"
interface props {
    comments: any
    votesAmt?: number
    currentVote?: CommentVote | undefined
    postId?: string
}

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
                    {/* <VoteOnComment /> */}
                </div>
            </div>
        </div>
    )
}