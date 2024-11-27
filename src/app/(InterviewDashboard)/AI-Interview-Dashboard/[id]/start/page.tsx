"use client";

import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import qs from "query-string";
import axios from "axios";
import { TabsDemo } from "@/app/components/(AI-Interview)/Question";
import { Mic, WebcamIcon } from "lucide-react";
import { ProgressSpinner } from "primereact/progressspinner";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { chatSession } from "../../../../../../utils/AiModel";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    params: {
        id: string;
    };
}

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

export default function Start({ params }: Props) {
    const [webCamEnabled, setWebcamEnabled] = useState(false);
    const [loader, setLoader] = useState(false);
    const [userQuestion, setUserQuestion] = useState()
    const [AIAnswer, setAIAnswer] = useState()
    const [userSpeech, setSpeech] = useState("")
    const [interviewData, setInterviewData] = useState<Interview | null>(null);
    const [mockQuestion, setMockQuestion] = useState<Mock[]>();
    const routre = usePathname()
    const id = routre?.split('/')[2];
    
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    const fetchInterviewDetails = async () => {
        try {
            const url = qs.stringifyUrl({
                url: "/api/Interview-Detail",
                query: { id: params.id },
            });
            const dataRes = await axios.get(url);
            setInterviewData(dataRes.data.data);
            const jsonQuestion = dataRes.data.data.MockResp;
            setMockQuestion(jsonQuestion);
        } catch (error) {
            console.error(error, "[Error fetching interview details]");
        }
    };

    useEffect(() => {
        fetchInterviewDetails();
    }, [params.id]);

    useEffect(() => {
        results.map((result: any) => {
            setSpeech((prev) => prev + result?.transcript)
        })
    }, [results])

    console.log(interviewData?.MockId, "MockId to dado na plesae");

    const saveUserSpeech = async () => {
        if (isRecording) {
            stopSpeechToText()
            setLoader(true)
            const prompt = "Question:" + userQuestion + ",user Answer " + userSpeech + ",Depends on question and user answer for given interview question" + "Please give us rating for answer and feedback as area of improvement if any" + "in just 3 to 5 lines to improve it in JSON format with rating ";
            const result = await chatSession.sendMessage(prompt)
            const response = (result.response.text()).replace('```json', '').replace('```', '')
            const jsonFeedback = JSON.parse(response)
            const dataSend = {
                mockId: interviewData?.MockId,
                question: userQuestion,
                correctAnswer: AIAnswer,
                userAnswer: userSpeech,
                feedback: jsonFeedback?.feedback,
                rating: jsonFeedback?.rating,
            }
            const data = await axios.post('/api/store-User-Answer', dataSend)
            setSpeech("")
            if (data.data) {
                setLoader(false);
            }
            setResults([])
        }
        else {
            startSpeechToText()
        }
    }


    return (
        <div className="h-[80vh] bg-black">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {mockQuestion ? (
                    <TabsDemo mockQuestion={mockQuestion} setAIAnswer={setAIAnswer} setUserQuestion={setUserQuestion} />
                ) : (
                    <div className="h-[80vh] justify-center items-center flex">
                        <ProgressSpinner className="h-48" />
                    </div>
                )}
                <div>
                    <div className="flex flex-col justify-center items-center h-full">
                        {webCamEnabled ? (
                            <Webcam
                                onUserMedia={() => setWebcamEnabled(true)}
                                onUserMediaError={() => setWebcamEnabled(false)}
                                mirrored={true}
                                style={{ height: 300, width: 300 }}
                            />
                        ) : (
                            <WebcamIcon className="h-96 w-96 bg-secondary rounded-xl p-20" />
                        )}
                        <button
                            className="p-[3px] mt-4 relative"
                            onClick={() => saveUserSpeech()}
                            disabled={loader}
                        >
                            <div className={cn("absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg", loader === true && "cursor-not-allowed")} />
                            <div className={cn("px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white", loader === true && "cursor-not-allowed")}>
                                {isRecording ? <h1 className="flex gap-x-3"><Mic />Stop Recording ...</h1> : "Record Answer"}
                            </div>
                        </button>
                    </div>
                    <Link href={`/AI-Interview-Dashboard/${id}/feedback`}>
                    <div className="bg-green-600 w-[250px] rounded-xl">
                        <div className={cn("px-8 py-2 bg-green-500 w-[250px]  relative group text-center rounded-xl transition duration-200 text-white", loader === true && "cursor-not-allowed")}>
                           End Interview
                        </div>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
