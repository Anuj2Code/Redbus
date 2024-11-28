"use client"

import { Label } from "../../components/ui/label"
import { LampContainer } from "../components/ui/lamp"
import { Input } from "../../components/ui/input"
import { Check, Copy, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useOrigin } from "../../hooks/invite-modal"
import { useModal } from "../../hooks/use-modal-store"
import { useState } from "react"
import axios from "axios"


export default function InviteModal (){
  const [isLoading,setLoading] = useState(false);
  const [copied,setcopied] = useState(false);
  const origin = useOrigin()
  const {data,onOpen} = useModal();
  const inviteUrl = `${origin}/invite/${data.server?.inviteCode}`
  
  const copyClick = ()=>{
    navigator.clipboard.writeText(inviteUrl);
    setcopied(true);

    setTimeout(() => {
      setcopied(false)
    }, 1000);
  }

  const newCode = async()=>{
    try {
      setLoading(true);
      const response = await axios.post(`/api/server/${data.server?.id}/invite-code`);
      onOpen("invite",{server:response.data})
    } catch (error) {
      console.log(error);
    }finally{
       setLoading(false)
    }
  }
    return (

      <LampContainer>
        <div className="h-[200px] w-[500px] relative top-6">
          <h1 className="w-[100%] uppercase text-lg font-bold text-primary text-center">Invite Friends</h1>
           <Label className="bg-gradient-to-r text-sm from-blue-500  to-blue-400 bg-clip-text text-transparent  text-left uppercase  font-bold  ">
            Server invite link
           </Label>
           <div className="flex items-center mt-2 gap-x-2">
          <Input
          disabled={isLoading}
            className="border-0  bg-white focus-visible:ring-0 text-black focus-visible:ring-offset-0" value={inviteUrl}
          />
         <Button onClick={copyClick} disabled={isLoading} size="icon">
          {copied ? <Check className="h-4 w-4"/>: <Copy/>}
         </Button>
           </div>
           <div onClick={newCode} className="text-[18px] pt-2 flex bg-gradient-to-r  from-blue-500  to-blue-400 bg-clip-text text-transparent">
            <span>Generate a link</span>
            <span><RefreshCcw  className="stroke-blue-200 h-4 w-4 mx-2 mt-1 cursor-pointer"/></span>
           </div>
        </div>
    </LampContainer>
    )

}

