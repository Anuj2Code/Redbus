"use client"

import qs from "query-string"
import { useRouter,useSearchParams,usePathname } from "next/navigation"
import {Video,VideoOff } from "lucide-react"
import { Actiontooltip } from "./ui/tooltip-action"

export const ChatVideo = ()=>{
    const pathname = usePathname()
    const router = useRouter();
    const searchParams = useSearchParams()
    const isVideo = searchParams?.get("video");
    const Icon = isVideo? VideoOff :Video
    const tooltipLabel = isVideo ? "End Video call ": "Start Video"

    const onClick = async()=>{
       const url = qs.stringifyUrl({
         url:pathname || "",
         query:{
            video:isVideo?undefined:true
         }
       },{skipNull:true})

       router.push(url)
    }
    return (
        <Actiontooltip label={tooltipLabel} side="bottom">
             <button className="hover:opacity-75 px-5" onClick={onClick}>
                <Icon className="h-6 w-6 text-zinc-400"/>
             </button>
        </Actiontooltip>
    )
}