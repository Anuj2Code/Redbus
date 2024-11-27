"use client";

import React from "react";
import { Tabs } from "../ui/tabs";

type Mock = {
    Answer: string;
    Question: string;
};

interface props{
    mockQuestion:Mock[]
    setUserQuestion:React.Dispatch<React.SetStateAction<any>>;
    setAIAnswer:React.Dispatch<React.SetStateAction<any>>;
}
export function TabsDemo({mockQuestion,setUserQuestion ,setAIAnswer}:props) {
    return (
        <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative  flex flex-col max-w-5xl mx-auto w-full  items-start justify-start ">
            <Tabs tabs={mockQuestion}  setUserQuestion={setUserQuestion} setAIAnswer={setAIAnswer}/>
        </div>
    );
}
