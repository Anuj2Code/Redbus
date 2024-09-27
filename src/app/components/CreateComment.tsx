"use client"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createComment } from "../server";
import { useFormState } from "react-dom";
import { Comment_btn } from "./SubmitButton";

const initialState = {
    message: "",
    status: ""
  }
export default function CreateComment({ postId, replyId,setCheck }: { postId: string, replyId?: string, setCheck:Dispatch<SetStateAction<boolean>> }) {
    const [text, settext] = useState<string>('')
    const [state,formaction] = useFormState(createComment,initialState);
    useEffect(()=>{
        if(state.status==="green"){
            setCheck(true);
            settext("")
        }
    },[state])
    return (
        <div className=" w-[600px]">
            <Label htmlFor='comment' className="p-4 text-muted-foreground text-lg font-mono">Your Comments</Label>
            <form action={formaction}>
                <div className="w-auto mt-2 mx-3">
                    <input type="hidden" value={postId} name="postId" />
                    {/* <input type="hidden" value={replyId} name="replyId" /> */}
                    <Textarea
                        className="focus:outline-none"
                        id="comment"
                        value={text}
                        name="text"
                        cols={500}
                        onChange={(e) => settext(e.target.value)}
                        placeholder='What are your thoughts?'
                    />
                    <div className='mt-2 flex justify-end'>
                        <Comment_btn text={"Post"}/>
                    </div>
                </div>
            </form>
        </div>
    )
}