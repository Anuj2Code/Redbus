"use client";
import React, { useEffect, useState } from "react";
import {
    motion,
    useTransform,
    AnimatePresence,
    useMotionValue,
    useSpring,
} from "framer-motion";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea";
import { Hash } from "lucide-react";
import { useFormState } from "react-dom";
import { CreateArticleComments } from "@/app/server";
import ShowArticleComment from "../ShowArticleComment";
import { CommentArticle } from "../SubmitButton";
import Link from "next/link";

const initialState = {
    message: "",
    status: ""
}

export const AnimatedTooltip = ({
    items,
    articleId,
    authorId,
}: {
    items: {
        id: number;
        title: string;
        href: string;
        icon: React.ReactNode
    }[], articleId: string,
    authorId:string,
}) => {
    const [text, settext] = useState<string>('')
    const [check, setcheck] = useState<boolean>(false)
    const [state, formaction] = useFormState(CreateArticleComments, initialState);
    useEffect(() => {
        if (state.status === "green") {
            setcheck(true);
            settext("")
        }
    }, [state])
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const springConfig = { stiffness: 100, damping: 5 };
    const x = useMotionValue(0);
    const rotate = useSpring(
        useTransform(x, [-100, 100], [-45, 45]),
        springConfig
    );
    const translateX = useSpring(
        useTransform(x, [-100, 100], [-50, 50]),
        springConfig
    );
    const handleMouseMove = (event: any) => {
        const halfWidth = event.target.offsetWidth / 2;
        x.set(event.nativeEvent.offsetX - halfWidth);
    };
    return (
        <>
            {items.map((item, idx) => (
                <div
                    className="-mr-4  relative group"
                    key={item.title}
                    onMouseEnter={() => setHoveredIndex(item.id)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence mode="popLayout">
                        {hoveredIndex === item.id && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 10,
                                    },
                                }}
                                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                style={{
                                    translateX: translateX,
                                    rotate: rotate,
                                    whiteSpace: "nowrap",
                                }}
                                className="absolute -top-16 right-4 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
                            >
                                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                                <div className="font-bold text-white relative z-30 text-base">
                                    {item.title}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {item.title === "Chat with Author" && <Link href={`${item.href}/${authorId}`}>  <div
                        onMouseMove={handleMouseMove}
                        className=" object-top top-3 cursor-pointer  h-6 w-6  group-hover:scale-105 group-hover:z-30  relative transition duration-500"
                    >{item.icon}
                    </div></Link>}
                    {item.title === "View Comment" && <Sheet>
                        <SheetTrigger asChild>
                            <div
                                onMouseMove={handleMouseMove}
                                className=" object-top top-3 cursor-pointer  h-6 w-6  group-hover:scale-105 group-hover:z-30  relative transition duration-500"
                            >{item.icon}
                            </div>
                        </SheetTrigger>
                        <SheetContent side={"right"} className="w-[500px] bg-[#171717] border-0">
                            <SheetHeader>
                                <SheetTitle>View Responses</SheetTitle>
                                <SheetDescription className="py-3">
                                    Make a comment to this article.
                                </SheetDescription>
                            </SheetHeader>
                            <form action={formaction}>
                                <div className="grid w-full gap-2 gap-y-4">
                                    <input type="hidden" value={articleId} name="articleId" />
                                    <Textarea placeholder="Type your comment here." rows={10}
                                        id="comments"
                                        onChange={(e) => settext(e.target.value)}
                                        value={text}
                                        name="comment"
                                        className="bg-[#171717] p-4 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                    <CommentArticle />
                                </div>
                            </form>
                            <div>
                                <h1 className="flex gap-2 text-center text-muted-foreground text-xl w-full justify-center mt-7"><Hash />Comment</h1>
                            </div>
                            <ShowArticleComment id={articleId} fetch={check} setCheck={setcheck} />
                        </SheetContent>
                    </Sheet>}
                    <div
                        onMouseMove={handleMouseMove}
                        className="object-cover cursor-pointer !m-0 !p-0 object-top  h-6 w-6  group-hover:scale-105 group-hover:z-30  relative transition duration-500"
                    >{item.title !== "View Comment" && item.title !== "Chat with Author" && item.icon}
                    </div>
                </div>
            ))}
        </>
    );
};

