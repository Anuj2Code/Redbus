"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import StoryLoader from './StoryLoader';
import FloatDock from './Float-Dock';
import BlogCard from './BlogCard';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Follow, StoryVote, User } from '@prisma/client';

interface ArrayItem{
    StoryVote:StoryVote[],
    User:User
    content:string
    createdAt:string
    createdBy:string
    follow:Follow
    id:string
}

const StoryCard = () => {
    const { user } = useKindeBrowserClient();

    const [res, setRes] = useState([]);
    const [load, setload] = useState(false);

    const resData = async () => {
        setload(true)
        try {
            const result = await axios.get("/api/story");

            const newData = result.data.data.map((item: any) => ({
                ...item,
                content: marked(item.content)
            }))

            // const htmlContent = marked(result.data.data.content) as string

            // const sanitizedContent = DOMPurify.sanitize(htmlContent);
            setRes(newData);
        } catch (error) {
            console.error("Error fetching story data:", error);
        }finally{
            setload(false);
        }
    };


    useEffect(() => {
        resData();
    }, []);

    return (
        <div>
            {load ? <>
                <StoryLoader />
            </> : <>
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
                                            vote.activeFollower===true ? acc + 1 : acc,
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
            </>}
        </div>
    );
};

export default StoryCard;
