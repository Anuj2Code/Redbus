"use client";
import React from "react";
import Image from "next/image";
import { ContainerScroll } from "./ui/container-scroll-animation";
import im from "../../../public/Screenshot 2024-11-22 183643.png";
import { useRouter } from "next/navigation";

export function HeroScrollDemo() {
    const router = useRouter()
    const onClick = ()=>{
        router.push("/dashboard")
    }
  return (
    <div className="flex flex-col overflow-hidden ">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              The AI-Powered <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none pb-6">
                Content Geneartor DashBoard
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={im}
          alt={""}
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
      <div className="flex justify-center items-center" onClick={()=>onClick()}>
        <button
          type="button"
          className="z-50 px-8 py-3 rounded-lg relative
                    mb-28
           bg-custom-gradient-129 text-white text-sm hover:shadow-2xl transition duration-500 border-0 border-slate-600 group"
        >
          {" "}
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur-[1px] opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <span className="relative z-20">
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center">
              AI - Dashboard &nbsp;
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 448 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"></path>
              </svg>
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
