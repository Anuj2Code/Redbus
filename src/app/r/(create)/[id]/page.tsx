import React, { use } from 'react'
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
import { addSubscription } from '@/app/server';
import { Subscribe } from '@/app/components/Subscribe';

async function getDate(name: string) {
  const data = await prisma.subbreddits.findUnique({
    where: {
      name: name
    },
    select: {
      name: true,
      createdAt: true,
      description: true,
      userId: true,
      Subscribers: true,
      id:true
    }
  })
  return data;
}

export default async function redditPage({ params }: { params: { id: string } }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getDate(params.id)

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

  // <= check if isSubreddit is not present the make not found reddit =>

  const memberCount = await prisma.subscription.count({
    where: {
      subreddit: {
        name: params.id
      }
    }
  })

  return (
    <div className="w-auto mx-auto flex gap-x-10 items-center justify-center pt-8 bg-black mb-10">
      <div className="px-14 w-[80%] flex ">
        <div className="w-[65%] flex flex-col gap-y-5">
          <h1>Hello From the Post Section</h1>
        </div>
        <div className="w-[35%]">
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
              {user?.id !== data?.userId ?
                (
                  <>
                      <Subscribe id={data?.id!} userId={user?.id!} isSubscribed={isSubreddit}/>
                  </>
                )
                : (
                  <Button asChild className="rounded-md w-full bg-orange-500 hover:bg-orange-600 text-white">
                    <Link
                      href={user?.id ? `/r/${data?.name}/create` : "/api/auth/login"}
                    >
                      Create Post
                    </Link>
                  </Button>
                )
              }
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

