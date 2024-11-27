"use client";

import React from "react";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

interface props {
  item: {
    JobExperience: string
    JobPost: string
    createdAt: string
    MockId:string
  }
}

export function ThreeDCardDemo({ item }: props) {
  return (
    <CardContainer className="inter-var w-full ml-6 flex justify-center items-center">
      <CardBody className="bg-gray-50 flex flex-col justify-center items-center relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {item.JobPost}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 relative top-6 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          CreatedAt {new Date(item.createdAt).toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 relative top-6 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {item.JobExperience} years of Experience
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <Link href={`/AI-Interview-Dashboard/${item.MockId}/feedback`}>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl  bg-white text-black text-xs font-bold"
          >
            Feedback
          </CardItem>
          </Link>
        </div>
      </CardBody>
    </CardContainer>
  );
}
