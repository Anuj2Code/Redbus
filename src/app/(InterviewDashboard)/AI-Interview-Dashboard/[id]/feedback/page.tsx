"use client";

import { ChevronDown, PartyPopper } from "lucide-react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import axios from "axios";
import qs from "query-string"
import { useEffect, useState } from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ProgressSpinner } from "primereact/progressspinner";
import { User } from "@prisma/client";
import { ChevronsUpDown } from "lucide-react"
import Link from "next/link";

gsap.registerPlugin(useGSAP);
interface dataType {
    User: User;
    correctAnswer: string;
    feedback: string;
    question: string;
    rating: number;
    userAnswer: string;
}
export default function Feedback({ params }: { params: { id: string } }) {
    const [feedback, setFeedback] = useState<dataType[] | null>([]);
    const [load, setLoad] = useState(false);
    useGSAP(() => {
        const t1 = gsap.timeline();
        t1.to(".Ex", {
            opacity: 1,
            ease: "power4.out",
            duration: 1,
            translateY: 10,
            transitionDuration: 1
        })
        t1.to(".head", {
            opacity: 1,
            ease: "power4.out",
            duration: 1,
            translateY: 0,
            transitionDuration: 1
        })
    })

    const fetech = async () => {
        setLoad(true)
        const url = qs.stringifyUrl({
            url: "/api/get-interview",
            query: { id: params.id }
        })
        try {
            const data = await axios.get(url)
            setFeedback(data.data.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoad(false)
        }
    }

    useEffect(() => {
        fetech()
    }, [params.id])

    return (
        <div className="min-h-screen bg-black">
            <div className="px-5 sm:px-10">
                <h1 className="head text-blue-500 pl-2 sm:pl-10 pt-5 sm:pt-10 font-medium flex gap-x-2 sm:gap-x-8 transition translate-y-[30px] opacity-0 text-2xl sm:text-4xl lg:text-6xl text-center sm:text-left">
                    Congratulations
                </h1>
                <h1 className="Ex px-2 sm:px-10 opacity-0 text-5xl sm:text-7xl font-semibold transition translate-y-[60px] text-center sm:text-left">
                    Here is your interview feedback
                </h1>
            </div>

            {load ? (
                <div className="flex justify-center items-center mt-24 bg-black">
                    <ProgressSpinner />
                </div>
            ) : (
                <>
                    <div className="mt-12 sm:mt-24 px-5 sm:px-10">
                        {feedback &&
                            feedback.map((item, key) => (
                                <Collapsible className="mt-3" key={key}>
                                    <CollapsibleTrigger className="my-2 text-left gap-x-4 bg-[#18181b] flex rounded-md px-4 sm:px-6 py-4 sm:py-6">
                                        {item.question}
                                        <ChevronsUpDown />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="my-4">
                                            <h2 className="text-muted-foreground pl-5 sm:pl-10 text-lg sm:text-xl pt-3">
                                                Rating: <span>{item.rating}</span>
                                            </h2>
                                            <div className="flex flex-col pt-5">
                                                <strong className="font-bold text-md pl-5 sm:pl-10 text-orange-400">
                                                    Your Answer
                                                </strong>
                                                <p className="text-left pl-5 sm:pl-10">
                                                    {item.userAnswer || "No Answer"}
                                                </p>
                                            </div>
                                            <div className="flex flex-col pt-5">
                                                <strong className="font-bold text-md pl-5 sm:pl-10 text-green-500">
                                                    Correct Answer
                                                </strong>
                                                <p className="text-left pl-5 sm:pl-10">
                                                    {item.correctAnswer}
                                                </p>
                                            </div>
                                            <div className="flex flex-col pt-5">
                                                <strong className="font-bold text-md pl-5 sm:pl-10 text-sky-500">
                                                    Feedback
                                                </strong>
                                                <p className="text-left pl-5 sm:pl-10">
                                                    {item.feedback}
                                                </p>
                                            </div>
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            ))}
                    </div>
                    <div className="flex justify-center sm:justify-start">
                        <Link href={"/AI-Interview-Dashboard"}>
                            <button className="bg-blue-500 mt-5 mx-5 sm:ml-10 my-5 hover:bg-blue-700 transition-all duration-300 w-[180px] sm:w-[200px] rounded-xl h-[50px]">
                                Go To Dashboard
                            </button>
                        </Link>
                    </div>
                </>
            )}
        </div>


    )
} 