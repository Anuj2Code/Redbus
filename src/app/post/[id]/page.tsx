"use client"

import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Cake, MessageCircle, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Comment_btn, DownVote, UpVote } from "@/app/components/SubmitButton";
import { createComment, createComments, handleVote } from "@/app/server";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import { CopyLink } from "@/app/components/CopyLink";
import { SkeletonCard } from "@/app/components/Skeleton";
import CreateComment from "@/app/components/CreateComment";
import React from "react";
import VoteOnComment from "@/app/components/CommentVote";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const initialState = {
  message: "",
  status: ""
}

export interface detail {
  createdAt: Date,
  title: string,
  imageString: string,
  textContent: any;
  subName: string,
  id: string,
  Vote: any,
  comments: any,
  Subreddits: any
  User: any
}

export default function PostPage({ params }: { params: { id: string } }) {

  const router = useRouter()
  const [load, setload] = useState<boolean>(true)
  const [check, setCheck] = useState<boolean>(false)
  const [data, setdata] = useState<detail>();
  const [state, formAction] = useFormState(handleVote, initialState);
  const { user, getUser } = useKindeBrowserClient();
  // const [state1, formaction1] = useFormState(createComment, initialState);
  const [input, setInput] = useState<string>("")
  console.log(input);

  const get_Details = async () => {
    const payload = {
      id: params.id
    }
    const res = await axios.post("http://localhost:3000/api/Post_Details", payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setload(false);
    setdata(res.data.data)
  }

  useEffect(() => {
    get_Details()
    if (state.status === "green" || check === true) {
      router.refresh()
    }
  }, [state, check])

  return (
    <div className="w-auto mx-auto flex gap-x-10 items-center justify-center pt-8 bg-black mb-10">
      <div className="px-14 w-[80%] flex gap-x-24">
        <div className="w-[65%] flex flex-col gap-y-5">
          <Card className="p-2 flex">
            <div className="flex flex-col justify-center  items-center gap-y-2 p-2">
              <form action={formAction}>
                <input type="hidden" name="voteDirection" value="UP" />
                <input type="hidden" name="postId" value={data?.id} />
                <UpVote />
              </form>
              {load ? <ProgressSpinner className="h-6 w-6" /> : <>
                {data?.Vote.reduce((acc: number, vote: { voteType: string; }) => {
                  if (vote.voteType === "UP") return acc + 1;
                  if (vote.voteType === "DOWN") return acc - 1;
                  return acc;
                }, 0)}
              </>}
              <form action={formAction}>
                <input type="hidden" name="voteDirection" value="DOWN" />
                <input type="hidden" name="postId" value={data?.id} />
                <DownVote />
              </form>
            </div>
            <div className="p-2 w-full">
              <p className="text-xs text-muted-foreground">
                Posted by u/{data?.User?.userName}
              </p>

              <h1 className="font-medium mt-1 text-lg pt-3">{data?.title}</h1>
              {load ? <SkeletonCard /> : <>
                {data?.imageString && (
                  <Image
                    src={data?.imageString}
                    alt="User Image"
                    width={500}
                    height={400}
                    className="w-full h-auto object-contain mt-2"
                  />
                )}
              </>}
              <div
                className='prose-headings:font-title font-default prose mt-4 dark:prose-invert focus:outline-none'
                dangerouslySetInnerHTML={{ __html: data?.textContent }}
              ></div>

              <div className="flex gap-x-5 items-center mt-3">
                <div className="flex items-center gap-x-1">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <p className="text-muted-foreground font-medium text-xs">
                    {data?.comments.length} Comments
                  </p>
                </div>
                <CopyLink id={params.id} />
              </div>
              <Separator className="my-5" />
              <CreateComment postId={params.id} replyId={params.id} setCheck={setCheck} />
              <div className="flex flex-col gap-y-7">
                {load ? <div className="flex items-center pr-14">
                  <ProgressSpinner />
                </div> : <>
                  {data?.comments.map((item: any) => (
                    <div key={item.id} className="flex flex-col">
                      <div className="flex items-center gap-x-3">
                        <img
                          src={
                            item.User?.imageUrl
                              ? item.User.imageUrl
                              : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                          }
                          className="w-7 h-7 rounded-full"
                          alt="Avatar of user"
                        />

                        <h3 className="text-sm font-medium">
                          {item.User?.userName}
                        </h3>
                      </div>

                      <p className="ml-10 text-secondary-foreground text-sm tracking-wide">
                        {item.text}
                      </p>
                      <div className='flex gap-2 items-center'>
                        <VoteOnComment commentId={item.id} />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => {
                                if (!user) return router.push("/api/auth/login")
                                // setIsReplying(true)
                              }}
                            >
                              <MessageSquare className='h-4 w-4 mr-1.5' />
                              Reply
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="min-w-[500px]">
                            <form action={createComments}>
                              <Label htmlFor='comment'>Your comment</Label>
                              <AlertDialogHeader>
                                <div>
                                  <div className='mt-2'>
                                    <input type="hidden" value={params.id} name="postId" />
                                    <input type="hidden" value={item.replyId ?? params.id} name="replyId" />
                                    <Textarea
                                      id='text'
                                      name="text"
                                      value={input}
                                      onChange={(e) => setInput(e.target.value)}
                                      rows={1}
                                      placeholder='What are your thoughts?'
                                    />
                                  </div>
                                </div>

                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="w-auto bg-blue-500 hover:bg-blue-500">
                                  <Comment_btn text={"Post"} />
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </form>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </>}
              </div>
            </div>
          </Card>
        </div>
        <div className="w-[35%]">
          <Card>
            <div className="bg-muted p-4 font-semibold">About Community</div>
            <div className="p-4">
              <div className="flex items-center gap-x-3">
                <Image
                  src={`https://avatar.vercel.sh/${data?.subName}`}
                  alt="Image of subreddit"
                  width={60}
                  height={60}
                  className="rounded-full h-16 w-16"
                />
                {load ? <div className="w-[100px] flex justify-center items-center">
                  <ProgressSpinner className="h-8 w-8" />
                </div> : (
                  <Link href={`/r/${data?.subName}`} className="font-medium hover:underline underline-offset-2">
                    r/{data?.subName}
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-x-2 mt-4">
                <Cake className="h-5 w-5 text-muted-foreground" />
                <p className="text-muted-foreground font-medium text-sm pt-1">
                  Created:{" "}
                  {new Date(data?.createdAt as Date).toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Separator className="my-5" />
              <Button asChild className="rounded-md w-full bg-orange-500 hover:bg-orange-600 text-white">
                <Link
                  href={`/r/${data?.subName}/create`}
                >
                  Create Post
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}