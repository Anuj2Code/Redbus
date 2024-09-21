import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CopyLink } from "./CopyLink";
import { handleVote } from "../server";
import { DownVote, UpVote } from "./SubmitButton";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";

interface iAppProps {
    title: string;
    id: string;
    subName: string;
    jsonContent: any;
    setCheck: Dispatch<SetStateAction<string>>;
    userName: string;
    imageString: string | null;
    voteCount: number;
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
    setCheck
    //   commentAmount,
}: iAppProps) {
    
    const [state, formAction] = useFormState(handleVote, initialState)

    useEffect(() => {
        if(state.status==="green"){
          setCheck("green")
        }
    }, [state])

    return (
        <Card className="flex relative overflow-hidden">
            <div className="flex flex-col items-center gap-y-2 bg-muted p-2 justify-center">
                <form action={formAction} >
                    <input type="hidden" name="voteDirection" value="UP" />
                    <input type="hidden" name="postId" value={id} />
                    <UpVote />
                </form>
                {voteCount}
                <form action={formAction}>
                    <input type="hidden" name="voteDirection" value="DOWN" />
                    <input type="hidden" name="postId" value={id} />
                    <DownVote />
                </form>
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
                        null
                    )}
                </div>

                <div className="m-3 flex items-center gap-x-5">
                    <div className="flex items-center gap-x-1">
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        <p className="text-muted-foreground font-medium text-xs">
                            0 Comments
                        </p>
                    </div>
                    <CopyLink id={id} />
                </div>
            </div>
        </Card>
    );
}