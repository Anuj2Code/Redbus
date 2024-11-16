"use client"
import React from 'react'
import { HoverEffect } from '../components/ui/card-hover-effect';
import {
  TextRevealCard,
} from "../components/ui/text-reveal-card";

const page = () => {
  return (
    <div className="w-full mx-auto px-8 overflow-y-scroll my-3">
      <div><TextRevealCard
      className='bg-black border-0 w-[1000px] my-3'
        text="Template You Like !"
        revealText="Awesome Template"
      >
      </TextRevealCard></div>
      <HoverEffect items={template} />
    </div>
  );
}

export const paymentTemplate = [
  {
    title: "Free",
    price: "0",
    step1: "5 credit points which you can use",
    step2: "50+ content template",
    step3: "unlimited download and copy",
    step4: "1 month of histroy",
    desc: "we ensuring your account is properly secured and help you in protect your personal information and data.",
    btn: "Free",
    type: "Free"
  },
  {
    title: "Monthly",
    price: "150",
    step1: "30 credit points which you can use",
    step2: "50+ content template",
    step3: "unlimited download and copy",
    step4: "1 month of histroy",
    desc: "we ensuring your account is properly secured and help you in protect your personal information and data.",
    btn: "Pay",
    type: "paid"
  },
]

export const template = [
  {
    title: "Blog Title",
    description: "An AI tool that generate the title according to your Blog ",
    slug: "generate-blog-title",
    FormHeader: "Enter your blog idea",
  },
  {
    title: "Blog Content",
    description: "An AI tool that generate the title according to your Blog ",
    slug: "generate-blog-content",
    FormHeader: "Enter your Blog Title",
  },
  {
    title: "Blog Topic Idea",
    description: "An AI tool that generate the title according to your Blog ",
    slug: "generate-blog-idea",
    FormHeader: "Enter your prompt",
  },
  {
    title: "Youtube SEO Title",
    description: "An AI tool that help you to generate the SEO title according to your Youtube video ",
    slug: "generate-Youtube-SEO",
    FormHeader: "Enter your youtube title",

  },
  {
    title: "Youtube Description",
    description: "An AI tool that generate the title according to your Blog ",
    slug: "generate-Youtube-Description",
    FormHeader: "Enter your youtube description",
  },
  {
    title: "Youtube Tags",
    description: "An AI tool that generate the title according to your Blog ",
    slug: "generate-Youtube-Tags",
    FormHeader: "Enter your youtube description and Title",
  },
  {
    title: "Rewrite Article",
    description: "An AI tool that generate the title according to your Blog ",
    slug: "generate-Rewrite-Article",
    FormHeader: "Enter your Article",
  },
  {
    title: "Text Improver",
    description: "An AI tool that generate the title according to your Blog ",
    slug: "generate-Text-Improver",
    FormHeader: "Enter your Text",
  },
  {
    title: "Instagram Post-Generator",
    description: "An AI tool that generate the title according to your Blog ",
    slug: "generate-Instagram",
    FormHeader: "Enter your Post Details",
  },
  {
    title: "Write Code",
    description: "An AI tool that generate the title according to your Blog ",
    slug: "generate-code",
    FormHeader: "Enter your code here",
  },
  {
    title: "Explain Code",
    description: "An AI tool that generate the title according to your Blog ",
    slug: "Explain-the-code",
    FormHeader: "Enter your code here",
  }
];

export default page



{/* <div className="flex">
<div className="p-2 md:p-10 bg-black flex flex-col gap-2 flex-1 w-full h-full md:w-[100vw]">
  <div className="flex gap-2">
    {[...new Array(4)].map((i) => (
      <div
        key={"first-array" + i}
        className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
      ></div>
    ))}
  </div>
  <div className="flex gap-2 flex-1">
    {[...new Array(2)].map((i) => (
      <div
        key={"second-array" + i}
        className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
      ></div>
    ))}
  </div>
</div>
</div> */}