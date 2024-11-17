"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import StoryLoader from './StoryLoader';
import FloatDock from './Float-Dock';
import BlogCard from './BlogCard';


const StoryCard = () => {
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
            setload(false);
        } catch (error) {
            console.error("Error fetching story data:", error);
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
                {res && res.map((item: any) => {
                    return <>
                        <BlogCard  user={item.User} publish={item.createdAt}/>
                        <div
                            className="prose-headings:font-title font-default prose mt-4 dark:prose-invert focus:outline-none"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                        <div className="h-[110px] items-center justify-center flex w-auto pt-12 pr-12 z-50">
                            <FloatDock articleId={item.id}/>
                        </div>
                        <hr className='h-1 bg-zinc-400 my-5' />
                    </>
                })}
            </>}
        </div>
    );
};

export default StoryCard;
