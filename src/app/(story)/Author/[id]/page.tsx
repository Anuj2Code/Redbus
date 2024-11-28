"use client"
import qs from "query-string"
import axios from "axios"
import { useEffect, useState } from "react";
import { marked } from "marked";
import { Follow, StoryVote, User } from "@prisma/client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import StoryLoader from "../../../components/StoryLoader";
import BlogCard from "../../../components/BlogCard";
import FloatDock from "../../../components/Float-Dock";

interface ArrayItem {
    StoryVote: StoryVote[],
    User: User
    content: string
    createdAt: string
    createdBy: string
    follow: Follow
    id: string
}

export default function AuthorDetail({ params }: { params: { id: string } }) {
    const [res, setRes] = useState([]);
    const [load, setload] = useState(false);
    const { user } = useKindeBrowserClient();
    const fetchData = async () => {
        const url = qs.stringifyUrl({
            url: "/api/author-detail",
            query: { authorID: params.id }
        })
        setload(true)
        try {
            const result = await axios.get(url);
            const newData = result.data.data.map((item: any) => ({
                ...item,
                content: marked(item.content)
            }))
            setRes(newData);
        } catch (error) {
            console.error("Error fetching story data:", error);
        } finally {
            setload(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="bg-black flex justify-center items-center">
            {load ? <>
                <StoryLoader />
            </> : <>
                <div className='flex flex-col '>
                    <div>
                        <p className="text-lg md:text-7xl font-normal pb-12 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300">
                            {`All Story`}
                        </p>
                    </div>
                    <div>
                        {res && res.map((item: ArrayItem) => {
                            return <>
                                <BlogCard
                                    key={item.id}
                                    id={item.id}
                                    user={item.User}
                                    publish={item.createdAt}
                                    voteCount={item.StoryVote.reduce(
                                        (acc: number, vote: { activeVote: boolean }) =>
                                            vote.activeVote ? acc + 1 : acc,
                                        0
                                    )}
                                    Follower={
                                        Array.isArray(item.follow)
                                            ? item.follow.reduce(
                                                (acc: number, vote: { activeFollower: boolean }) =>
                                                    vote.activeFollower === true ? acc + 1 : acc,
                                                0
                                            )
                                            : 0
                                    }
                                    Followed={
                                        Array.isArray(item.follow)
                                            ? item.follow.some(
                                                (vote: { activeFollower: boolean; userId: string }) =>
                                                    vote.activeFollower && vote.userId === user?.id
                                            )
                                            : false
                                    }
                                />
                                <div
                                    className="prose-headings:font-title font-default prose mt-4 dark:prose-invert focus:outline-none"
                                    dangerouslySetInnerHTML={{ __html: item.content }}
                                />
                                <div className="h-[110px] items-center justify-center flex w-auto pt-12 pr-12 z-50">
                                    <FloatDock articleId={item.id} authorId={item.User.id} />
                                </div>
                                <hr className='h-1 bg-zinc-400 my-5' />
                            </>
                        })}
                    </div>
                </div>
            </>}
        </div>
    )
}