"use client"
import { Loader2, Plus } from "lucide-react";
import { Button } from "../../components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useState } from "react";
import { Textarea } from "../../components/ui/textarea";
import { chatSession } from "../../../utils/AiModel";
import axios from "axios";
import { useRouter } from "next/navigation";
import PreviousInterview from "../components/(AI-Interview)/PrevInterview";

export default function InterviewDashboard() {
    const router = useRouter()
    const [dialog, setDialog] = useState(false)
    const [load, setLoad] = useState(false)
    const [jobPosition, setJobPosition] = useState("")
    const [Description, setDescription] = useState("")
    const [Experience, setExperience] = useState("")

    const OnSubmit = async (e: React.FormEvent) => {
        setLoad(true)
        e.preventDefault();
        const InputPrompt = "Job Positon: " + jobPosition + ", Job Description: " + Description + ", years of Experience: " + Experience + ", Depends on job description and years of experience Give 5 Interview Questions along with Answers in JSON Format. Give Question and Answered as fields in JSON";

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            const responseText = (result.response.text()).replace('```json', '').replace(/`````$/, "");

            console.log(responseText)
            const content = JSON.parse(responseText)
            const sendData = await axios.post("/api/Ai-Question-store", { content, jobPosition, Description, Experience })
            if (sendData) {
                setDialog(false)
            }
            if (sendData.data.data.MockId) {
                router.push(`/AI-Interview-Dashboard/${sendData.data.data.MockId}`)
            }

        } catch (error) {
            console.error("Error in sending message:", error);
        }
        finally {
            setLoad(false)
        }
    };


    return (
        <div className="h-[88vh] overflow-x-hidden overflow-y-scroll bg-black">
            <div className="p-10">
                <h1 className=" text-2xl font-semibold text-green-400"> DashBoard</h1>
                <p className="pt-4">Create and Start your AI Mock Interview</p>
                <div
                    className="border-dashed mt-6 border-slate-400 cursor-pointer font-medium rounded-xl transition-all duration-300 border-[3px] h-[100px] w-full sm:w-[300px] flex justify-center items-center"
                    onClick={() => setDialog(true)}
                >
                    <p className="flex items-center gap-2">
                        <Plus /> Add
                    </p>
                </div>
                <Dialog open={dialog}>
                    <DialogContent className="w-[655px] bg-black">
                        <DialogHeader>
                            <DialogTitle>Tell us more about job you are interviewing</DialogTitle>
                            <DialogDescription>
                                Add Detail about job position, you skills and year of experience
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={OnSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className=" flex-col items-center gap-4 gap-y-2">
                                    <Label htmlFor="name" className="text-right pb-4">
                                        Job Position/ Role
                                    </Label>
                                    <Input id="name" onChange={(e) => setJobPosition(e.target.value)} value={jobPosition} className="col-span-3 bg-black focus-visible:ring-0 focus-visible:ring-offset-0" required placeholder="Ex. Full Stack Developer" />
                                </div>
                                <div className="flex-col items-center gap-4 gap-y-2">
                                    <Label htmlFor="username" className="text-right  my-3">
                                        Job Description / Tech stack in shorts
                                    </Label>
                                    <Textarea id="username" value={Description} onChange={(e) => setDescription(e.target.value)} required className="col-span-3 bg-black focus-visible:ring-0 focus-visible:ring-offset-0" rows={6} placeholder="Ex. React.js, Next.js ..." />
                                </div>
                                <div className="flex-col items-center gap-4 gap-y-2">
                                    <Label htmlFor="username" className="text-right my-3">
                                        No of year of Experience
                                    </Label>
                                    <Input id="username" value={Experience} onChange={(e) => setExperience(e.target.value)} required className="col-span-3 bg-black focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Ex. 5" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={() => setDialog(false)} className="bg-red-600 text-white hover:bg-red-700">Cancel</Button>
                                {load ? <Button disabled className="bg-sky-600 hover:bg-sky-700 text-white font-medium flex gap-x-3"><Loader2 className="h-4 w-4 animate-spin" />Genearting ...</Button> : <Button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-medium">Start Interviewing</Button>}
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                <PreviousInterview />
            </div>
        </div>
    )
} 