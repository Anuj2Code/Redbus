"use client";
import { cn } from "../../lib/utils";
import { User } from "@prisma/client";
import axios from "axios";
import { ThumbsUp } from "lucide-react";
import Image from "next/image";
import qs from "query-string";
import { useState } from "react";

interface Props {
    user: User;
    publish: string;
    id: string;
    voteCount: number;
    Follower: number;
    Followed: boolean;
}

export default function BlogCard({
    user,
    publish,
    id,
    voteCount,
    Follower,
    Followed,
}: Props) {
    const [vot, setVot] = useState(voteCount);
    const [follow, setFollow] = useState(Follower);
    const [isFollow, setIsFollow] = useState<boolean>(Followed);

    const VoteCast = async () => {
        try {
            const url = qs.stringifyUrl({
                url: "/api/handleVoteStory",
                query: { id },
            });
            const res = await axios.post(url);
            setVot(res.data.vote);
        } catch (error) {
            console.error(error, "[Error is from blogcard]");
        }
    };

    const Follow = async () => {
        try {
            const url = qs.stringifyUrl({
                url: "/api/Follow-author",
                query: { id },
            });
            const res = await axios.post(url);
            setFollow(res.data.vote);
            setIsFollow(res.data.follow);
        } catch (error) {
            console.error(error, "[Error is from blogcard]");
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 items-center bg-black rounded-lg shadow p-4 w-full">
            {/* User Image */}
            <div className="flex-shrink-0">
                <Image
                    className="rounded-full"
                    src={user.imageUrl as string}
                    height={60}
                    width={60}
                    alt={`${user.userName}'s profile image`}
                />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow space-y-2">
                {/* User Info and Follow Button */}
                <div className="flex flex-wrap items-center gap-3">
                    <span className="font-semibold">{user.userName}</span>
                    <button
                        className={cn(
                            "px-3 py-1 text-sm rounded-md transition",
                            isFollow
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : "bg-rose-500 text-white hover:bg-rose-600"
                        )}
                        onClick={Follow}
                    >
                        {isFollow ? "Followed" : "Follow"}
                    </button>
                    <span className="text-sm text-gray-500">{follow}</span>
                </div>

                {/* Publish Date */}
                <p className="text-sm text-gray-600">
                    Published on{" "}
                    <span className="font-medium">
                        {new Date(publish).toLocaleDateString("en-us", {
                            weekday: "long",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </span>
                </p>
            </div>

            {/* Voting Section */}
            <div className="flex items-center gap-2">
                <ThumbsUp
                    className="cursor-pointer text-blue-500 hover:text-blue-600"
                    onClick={VoteCast}
                />
                <p className="text-sm text-gray-500">{vot}</p>
            </div>
        </div>
    );
}
