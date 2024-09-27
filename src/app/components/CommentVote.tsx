'use client'
import { ProgressSpinner } from "primereact/progressspinner";
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import { useFormState } from "react-dom";
import { CommentVote } from "../server";
import { useEffect, useState } from "react";
import axios from "axios";
import { DownVote, UpVote } from "./SubmitButton";
import { useRouter } from "next/navigation";

const initialState = {
    message: "",
    status: ""
}
interface details {
    userid: string,
    votes: any,
  }

export default function VoteOnComment({ commentId }: { commentId: string }) {
    console.log(commentId);
    const router = useRouter()
    const [state, formAction] = useFormState(CommentVote, initialState);
    const [votes, setvotes] = useState<details>()

    const get_comment = async () => {
        try {
            const res1 = await axios.post("http://localhost:3000/api/get_comment_vote", {commentId}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setvotes(res1.data.data)
            console.log(res1.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    

    useEffect(() => {
        get_comment()
       if(state.status==="green"){
        router.refresh()
       }
    }, [state,commentId])

    return (
        <div className="ml-4">
            <div className="flex justify-center gap-x-4 items-center p-2">
                <form action={formAction}>
                    <input type="hidden" name="voteDirection" value="UP" />
                    <input type="hidden" name="commentId" value={commentId} />
                    <UpVote />
                </form>
                <div>
                {votes?.votes.reduce((acc: number, item: { voteType: string; }) => {
                    if (item.voteType === "UP") return acc + 1;
                    if (item.voteType === "DOWN") return acc - 1;
                    return acc;
                }, 0)}
                </div>
                <form action={formAction}>
                    <input type="hidden" name="voteDirection" value="DOWN" />
                    <input type="hidden" name="commentId" value={commentId} />
                    <DownVote />
                </form>
            </div>
        </div>
    )
}