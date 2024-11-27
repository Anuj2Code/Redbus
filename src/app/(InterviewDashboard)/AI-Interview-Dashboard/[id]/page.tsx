"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import { ProgressSpinner } from "primereact/progressspinner";
import qs from "query-string";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";

type Mock = {
    Answer: string;
    Question: string;
};

interface Interview {
    JobDesc: string;
    JobExperience: string;
    JobPost: string;
    MockId: string;
    createdAt: string;
    createdBy: string;
    id: string;
    userId: string;
    user: User;
    MockResp: Mock[];
}

interface Props {
    params: {
        id: string;
    };
}

export default function Interview({ params }: Props) {
    const [interviewData, setInterviewData] = useState<Interview | null>(null);
    const [webCamEnabled, setWebcamEnabled] = useState(false)
    const fetch = async () => {
        try {
            const url = qs.stringifyUrl({
                url: "/api/Interview-Detail",
                query: { id: params.id },
            });
            const dataRes = await axios.get(url);
            setInterviewData(dataRes.data.data);
        } catch (error) {
            console.log(error, "[error is from the get interview details]");
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <>
            {interviewData ? (
                <>
                    <h1 className="text-3xl text-center font-semibold py-6 pb- w-full bg-black text-green-500">Let's Get Started</h1>
                    <div className="h-[80vh] overflow-y-scroll w-[100vw] flex bg-black px-24">
                        <div className="mt-6  w-[50vw]">
                            <div className="h-auto flex justify-center items-center flex-col mt-8 gap-y-6">
                                <div className="flex gap-x-2 flex-col">
                                    <p className="text-xl text-center uppercase">Job Role / Job Position </p><p className="text-xl text-center font-normal  text-green-500">{interviewData.JobPost}</p>
                                </div>
                                <div className="flex gap-x-2 flex-col">
                                    <p className="text-xl text-center uppercase">Job Description/Tech stack </p><p className="text-xl text-center font-normal text-green-500" >{interviewData.JobDesc}</p>
                                </div>
                                <div className="flex gap-x-2 flex-col">
                                    <p className="text-xl text-center uppercase">years of Experience </p><p className="text-xl text-center font-normal text-green-500 ">{interviewData.JobExperience}</p>
                                </div>
                            </div>
                            <div className="rounded-xl mt-6 border-[3px] h-52 flex flex-col justify-center border-dashed border-green-500">
                                <div className="flex py-7 gap-x-2 px-6 text-yellow-300">
                                    <span><Lightbulb /></span>
                                    <span>Information</span>
                                </div>
                                <div className="px-6 pb-6">
                                    Enable Video web cam and Microphone to start your AI Generated Mock Interview .It has some question which you have to answer and at the end you will get the report on the basis of your answer ,NOTE : we never record your video. Web cam access you can delete at any time when you want.
                                </div>
                            </div>
                        </div>
                        <div className=" mx-12 flex  flex-col">
                            {webCamEnabled ? <Webcam
                                onUserMedia={() => setWebcamEnabled(true)}
                                onUserMediaError={() => setWebcamEnabled(false)}
                                mirrored={true}
                                style={{
                                    height: 300,
                                    width: 300
                                }} /> :
                                <>
                                    <div className="flex flex-col gap-y-4">
                                        <WebcamIcon className="h-96 w-96 bg-secondary rounded-xl p-20" />
                                        <button onClick={() => setWebcamEnabled(true)} className="h-[50px] w-full duration-300 rounded-xl bg-green-500 hover:bg-green-700 text-white font-medium">Enabled WebCam and Microphone</button>
                                    </div>
                                </>
                            }
                            <Link href={`/AI-Interview-Dashboard/${params.id}/start`}>
                                <div className="flex justify-end bg-black mt-4 w-full">
                                    <button className="h-12 w-full rounded-xl bg-blue-500 hover:bg-blue-600 duration-300 transition-all">Start Interview</button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                <div className="h-[100vh] w-full bg-black flex-col justify-center items-center flex ">
                    <p className="text-2xl pb-12">Loading Interview Details ...</p>
                    <ProgressSpinner />
                </div>
            )}
        </>
    );
}
