"use client"
import { Button } from "../../components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../../components/ui/collapsible"
import { Card } from "../../components/ui/card";
import { Bookmark, MessageCircle } from "lucide-react";
import Link from "next/link";
import { CopyLink } from "./CopyLink";
import Image from "next/image";
import { Heart } from "lucide-react";
import React, { useEffect } from "react";
import PostComment from "./PostComment";
import { save } from "../server";
import { useFormState } from "react-dom";
import { useToast } from '../../components/ui/use-toast';

interface iAppProps {
    title: string;
    id: string;
    subName: string;
    jsonContent: any;
    userName: string;
    imageString: string | null;
    voteCount: number;
    comments?: any
    commentAmount?: number,
}
const initialState = {
    message: "",
    status: ""
  }
export function PostCard({
    id,
    imageString,
    jsonContent,
    subName,
    title,
    userName,
    voteCount,
    comments,
    commentAmount,
}: iAppProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [state,formAction] = useFormState(save,initialState)
    const { toast } = useToast();
    useEffect(()=>{
        if(state.status==="green"){
            toast({
                title: "Succesfull !",
                description: "Bookmark added",
            });
        }
    },[state])
    return (
        <>
            <Card className="flex relative overflow-hidden">
                <div className="flex flex-col items-center gap-y-2 bg-muted p-3 justify-center">
                    <Link href={`/post/${id}`}>
                        <Heart />
                    </Link>
                    {voteCount}
                </div>
                <div>
                    <div className="flex items-center gap-x-2 p-2">
                        <Link className="font-semibold text-xs" href={`/r/${subName}`}>
                            r/{subName}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                            Posted by: <span className="hover:text-primary">u/{userName}</span>
                        </p>
                    </div>

                    <div className="px-2">
                        <Link href={`/post/${id}`}>
                            <h1 className="font-medium mt-1 text-lg">{title}</h1>
                        </Link>
                    </div>
                    <div className="max-h-[300px] overflow-hidden">
                        {imageString ? (
                            <Image
                                src={imageString}
                                alt="Post Image"
                                width={600}
                                height={300}
                                className="w-full h-full"
                            />
                        ) : (
                            <div
                                className='prose-headings:font-title font-default prose mt-4 dark:prose-invert focus:outline-none'
                                dangerouslySetInnerHTML={{ __html: jsonContent }}
                            ></div>
                        )}
                    </div>
                    <Collapsible
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        className="w-[350px] space-y-2"
                    >
                        <div className="flex">
                            <CollapsibleTrigger asChild>
                                <Button variant="secondary" size="sm" className="bg-[#020817] hover:bg-[#020817]">
                                    <div className="m-3 flex items-center gap-x-5">
                                        <div className="bg-[#020817] hover:cursor-pointer" ><div className="flex items-center gap-x-1">
                                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                                            <p className="text-muted-foreground font-medium text-xs">
                                                {commentAmount} Comments
                                            </p>
                                        </div>
                                        </div>
                                    </div>
                                </Button>
                            </CollapsibleTrigger>
                            <CopyLink id={id} />
                            <form action={formAction}>
                                <input type="hidden" name="postId" value={id} />
                                <button type="submit">
                                    <Bookmark className="h-4 w-4 mt-3 ml-3 text-muted-foreground hover:cursor-pointer" />
                                </button>
                            </form>
                        </div>
                        <CollapsibleContent className="space-y-2">
                            <>
                                <div className='flex flex-col gap-y-6 mt-4'>
                                    {
                                        commentAmount !== 0 ?
                                            comments.filter((comment: any) => !comment.replyId).map((topLevelComment: any) => {
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
                            </>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </Card>
        </>
    );
}