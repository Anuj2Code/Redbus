"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { CreatePost } from "../components/CreatePostCard";
import axios from "axios";
import {useEffect, useState } from "react";
import { PostCard } from "../components/PostCard";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Loadmore } from "../components/Loadmore";
import Banner from "../../../public/banner.png"
import HelloImage from "../../../public/hero-image.png"
import { useModal } from "@/hooks/use-modal-store";

export interface iAppProps {
  Vote: any;
  textContent: any;
  User: any;
  title: string;
  jsonContent: any;
  id: string;
  subName: string;
  userName: string;
  imageString: string | null;
  voteCount: number;
  comments?:any
}

export default function Home() {
  const [Post, setPost] = useState<iAppProps[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const { data, type } = useModal();
  const {reddit} = data
  const getData = async () => {
    const res = await axios.post("http://localhost:3000/api/get_post?page=1", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setPost(res.data.data);
    setLoad(true)
  }
  useEffect(() => {
    getData();
   
  }, [load])


  return (
    <div className="min-w-full min-h-screen bg-black mx-auto flex justify-around">
      <div className="w-[55%] flex flex-col gap-y-5 pl-12 pt-4">
        <CreatePost />
        {load ? (
          <>
            {Post && Post.map((post: iAppProps) => {
              return (
                <PostCard
                  comments={post.comments}
                  id={post.id}
                  imageString={post.imageString}
                  jsonContent={post.textContent}
                  subName={post.subName as string}
                  title={post.title}
                  key={post.id}
                  commentAmount={post.comments.length}
                  userName={post.User?.userName as string}
                  voteCount={post.Vote.reduce((acc: number, vote: { voteType: string; }) => {
                    if (vote.voteType === "UP") return acc + 1;
                    if (vote.voteType === "DOWN") return acc - 1;

                    return acc;
                  }, 0)}
                />
              )
            })
            }
            <Loadmore  />
          </>
        ) :
          (
            <div className='w-full flex items-center justify-center h-96 '><ProgressSpinner /></div>
          )
        }
      </div>
      <div className="w-[450px] px-6 pt-4">
      <Card>
            <Image src={Banner} alt="Banner" />
            <div className="p-2">
                <div className="flex items-center">
                    <Image src={HelloImage} alt="Hello Image" className="w-10 h-16 -mt-6" />
                    <h1 className="font-medium pl-3">Home</h1>
                </div>
                <p className="text-sm text-muted-foreground pt-2">
                    Your Home Reddit frontpage. Come here to check in with your favorite communities!
                </p>
                <Separator className="my-5" />
                <div className="flex flex-col gap-y-3">
                    <Button asChild variant="secondary">
                        <Link href={`/r/${reddit}/create`}>Create Post</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/r/create">Create Community</Link>
                    </Button>
                </div>
            </div>
        </Card>
      </div>
    </div>
  );
}

