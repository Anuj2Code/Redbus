"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { CreatePost } from "../components/CreatePostCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { PostCard } from "../components/PostCard";
import { ProgressSpinner } from "primereact/progressspinner";
import { Loadmore } from "../components/Loadmore";
import Banner from "../../../public/banner.png";
import HelloImage from "../../../public/hero-image.png";
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
  comments?: any;
}

export default function Home() {
  const [Post, setPost] = useState<iAppProps[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const { data, type } = useModal();
  const { reddit } = data;

  const getData = async () => {
    const res = await axios.post("/api/get_post?page=1", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPost(res.data.data);
    setLoad(true);
  };

  useEffect(() => {
    getData();
  }, [load]);

  return (
    <div className="min-w-full min-h-screen bg-black bg-dot-white/[0.2] mx-auto flex flex-col-reverse md:flex-row justify-between px-4 md:px-8">
      {/* Overlay Effect */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      {/* Main Content Section */}
      <div className="w-full md:w-[60%] lg:w-[55%] flex flex-col gap-y-5 pt-4 md:pl-12 z-50">
        <CreatePost name={reddit!} />
        {load ? (
          <>
            {Post.map((post: iAppProps) => (
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
                voteCount={post.Vote.reduce(
                  (acc: number, vote: { voteType: string }) => {
                    if (vote.voteType === "UP") return acc + 1;
                    if (vote.voteType === "DOWN") return acc - 1;
                    return acc;
                  },
                  0
                )}
              />
            ))}
            <Loadmore />
          </>
        ) : (
          <div className="w-full flex items-center justify-center h-96 z-50">
            <ProgressSpinner />
          </div>
        )}
      </div>

      {/* Sidebar Section */}
      <div className="w-full md:w-[35%] lg:w-[30%] px-4 pt-6 md:px-6 md:pt-4 z-50">
        <Card>
          <Image src={Banner} alt="Banner" />
          <div className="p-4">
            <div className="flex items-center">
              <Image
                src={HelloImage}
                alt="Hello Image"
                className="w-10 h-16 -mt-6"
              />
              <h1 className="font-medium pl-3 text-lg">Home</h1>
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              Your Home Reddit frontpage. Come here to check in with your
              favorite communities!
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
