import React from 'react'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';
import Image from 'next/image';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '@/app/lib/db';
import { SubDescription } from '@/app/components/SubDescription';
import { Cake } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { Subscribe } from '@/app/components/Subscribe';
import { PostCard } from '@/app/components/PostCard';
import { CreatePost } from '@/app/components/CreatePostCard';
import Pagination from '@/app/components/Pagination';

async function getData(name: string, searchParam: string) {
  const [count, data] = await prisma.$transaction([
    prisma.post.count({
      where: {
        subName: name,
      },
    }),

    prisma.subbreddits.findUnique({
      where: {
        name: name,
      },
      select: {
        name: true,
        id: true,
        createdAt: true,
        description: true,
        userId: true,
        posts: {
          take: 3,
          skip: searchParam ? (Number(searchParam) - 1) * 3 : 0,
          select: {
            comments: {
              select: {
                id: true,
                userId: true,
                text: true,
                createdAt: true,
                User: true,
                votes: {
                  select: {
                    userId: true,
                    voteType: true
                  }
                }
              },
              orderBy: {
                createdAt: "desc"
              }
            },
            title: true,
            imageString: true,
            id: true,
            textContent: true,
            Vote: {
              select: {
                userId: true,
                voteType: true,
              },
            },
            User: {
              select: {
                userName: true,
              },
            },
          },
        },
      },
    }),
  ]);

  return { data, count };
}

export default async function redditPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const { data, count } = await getData(params.id, searchParams.page)

  const subscription = !user?.id ? undefined : await prisma.subscription.findFirst({
    where: {
      subreddit: {
        name: params.id
      },
      User: {
        id: user.id
      }
    }
  })

  const isSubreddit = !!subscription;

  const memberCount = await prisma.subscription.count({
    where: {
      subreddit: {
        name: params.id
      }
    }
  })

  return (
    <div className="w-full mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10 items-center justify-center pt-8 bg-black mb-10">
      <div className="px-4 sm:px-8 lg:px-14 w-full lg:w-[80%] flex flex-col lg:flex-row justify-between">
        {/* Left Section */}
        <div className="w-full lg:w-[55%] flex flex-col gap-y-5 pl-4 lg:pl-12">
          <CreatePost name={data?.name!} />
          {data && data.posts.map((post: any) => {
            return (
              <PostCard
                id={post.id}
                comments={post.comments}
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
          })}
          <Pagination totalPages={Math.ceil(count / 3)} />
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[35%] max-[950px]:mt-4">
          <Card>
            <div className="bg-muted p-4 font-semibold">About Community</div>
            <div className="p-4">
              <div className="flex items-center gap-x-3">
                <Image
                  src={`https://avatar.vercel.sh/janmarshal`}
                  alt="Image of subreddit"
                  width={60}
                  height={60}
                  className="rounded-full h-16 w-16"
                />
                <Link href={`/r/${data?.name}`} className="font-medium hover:underline underline-offset-2">
                  r/{data?.name}
                </Link>
              </div>
              {user?.id === data?.userId ? (
                <SubDescription name={params.id} description={data?.description} />
              ) : <p className="text-sm font-normal text-secondary-foreground mt-6">
                {data?.description}
              </p>}
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
              <div className='flex gap-x-2 mt-2'>
                <UserRound />
                <h1 className="text-muted-foreground font-medium text-sm pt-1">
                  Members
                </h1>
                <h1 className="text-muted-foreground font-medium text-sm pt-1 pl-4">{memberCount}</h1>
              </div>
              <Separator className="my-5" />
              {user?.id !== data?.userId ? (
                <Subscribe id={data?.id!} userId={user?.id!} isSubscribed={isSubreddit} />
              ) : (
                <Button asChild className="rounded-md w-full bg-orange-500 hover:bg-orange-600 text-white">
                  <Link href={user?.id ? `/r/${data?.name}/create` : "/api/auth/login"}>
                    Create Post
                  </Link>
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
