"use client"
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import axios from "axios";
import { ThumbsUp } from "lucide-react";
import Image from "next/image";
import qs from "query-string"
import { useState } from "react";

interface props {
    user: User
    publish: string
    id: string
    voteCount: number
    Follower: number
    Followed: boolean
}


export default function BlogCard({ user, publish, id, voteCount, Follower, Followed }: props) {
    console.log(Followed, Follower);

    const [vot, setVot] = useState(voteCount)
    const [follow, setFollow] = useState(Follower)
    const [isfollow, setIsFollow] = useState<boolean>(Followed)

    const VoteCast = async () => {
        try {
            const url = qs.stringifyUrl({
                url: "/api/handleVoteStory",
                query: { id }
            })
            const res = await axios.post(url);
            setVot(res.data.vote)
        } catch (error) {
            console.log(error, "[Error is from blogcard]");
        }
    }

    const Follow = async () => {
        try {
            const url = qs.stringifyUrl({
                url: "/api/Follow-author",
                query: { id }
            })
            const res = await axios.post(url);
            setFollow(res.data.vote)
            setIsFollow(res.data.follow);
        } catch (error) {
            console.log(error, "[Error is from blogcard]");
        }
    }


    return (
        <div className='flex gap-x-3'>
            <Image className='rounded-full' src={user.imageUrl as string} height={90} width={90} alt='img' />
            <div className='mt-6'>
                <div className='flex gap-x-3'>
                    <span>{user.userName}</span>
                    <button className={cn("text-rose-500 cursor-pointer", isfollow && "text-green-500")} onClick={() => Follow()}>{isfollow ? "Followed" : "Follow"}</button>
                    <span className="text-sm text-muted-foreground mt-[2.3px]">{follow}</span>
                </div>
                <p>Published on <span className="text-sm text-muted-foreground">{new Date(publish).toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })}</span></p>
            </div>
            <div className="mt-11 ml-6 flex gap-x-4 ">
                <ThumbsUp className="cursor-pointer" onClick={() => VoteCast()} />
                <p className="text-sm opacity-60 mt-1">{vot}</p>
            </div>
        </div>
    )
}  