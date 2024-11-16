"use client"
import { useModal } from "@/hooks/use-modal-store";
import { Spotlight } from "../../components/ui/Spotlight";
import { serverWithMemberChannelWithProfile } from "../../../../types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function RemoveServer() {
    const { data ,type } = useModal();
    const { server } = data as { server: serverWithMemberChannelWithProfile }
    const [load, setLoad] = useState(false);
    const router = useRouter();
    let titleName = "Leave Server";
    if(type==="deleteServer"){
        titleName ="Delete Server"
    }

    const onLeave = async () => {
        try {
            setLoad(true);
            const payload = {
                serverId: server.id
            }
           {titleName==="Leave Server"? await axios.post("/api/leave_server", payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        }): await axios.post("/api/delete_server", payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        
        })}
            setLoad(false);
            router.refresh();
            setTimeout(() => {
                router.push('/');
            }, 1500)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="h-[40rem] bg-black w-full rounded-md flex md:items-center md:justify-center ">
            <Spotlight
                className="top-10 left-0 md:left-60 md:-top-10 z-50"
                fill="white"
            />
            <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                   {titleName}
                </h1>
               {titleName==="Leave Server"? <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
                    Are you sure you want to leave ? <span className="text-rose-500 text-lg underline underline-offset-4 ">{server?.name} </span>
                </p>: <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
                    Are you sure you want to delete ? <span className="text-rose-500 text-lg underline underline-offset-4 ">{server?.name}</span> will be deleted permanently
                </p>}
                {titleName==="Leave Server"?<div className="w-full flex justify-center mt-12 ">
                    {load ? <button disabled={load} className="h-12 w-52 duration-75 transition-all bg-red-500 rounded-xl flex justify-center items-center">  <Loader2 className="mr-2 h-6 w-6  animate-spin" /></button> : <button className="h-12 w-52 duration-75 transition-all bg-sky-500 hover:bg-red-600 rounded-xl"
                    onClick={()=> onLeave()}
                    >Leave Server</button>}
                </div>:<div className="w-full flex justify-center mt-12 ">
                    {load ? <button disabled={load} className="h-12 w-52 duration-75 transition-all bg-red-500 rounded-xl flex justify-center items-center">  <Loader2 className="mr-2 h-6 w-6  animate-spin" /></button> : <button className="h-12 w-52 duration-75 transition-all bg-sky-500 hover:bg-red-600 rounded-xl"
                    onClick={()=> onLeave()}
                    >Delete Server</button>}
                </div>}
            </div>
        </div>
    )
}