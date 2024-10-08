"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

interface actionProps{
    label:string,
    children:React.ReactNode;
    side?:"left" | "right"| "top"| "bottom";
    align?:"start" | "center" | "end"
}

export const Actiontooltip =({label,children,side,align}:actionProps)=>{
 return (
    <TooltipProvider>
    <Tooltip delayDuration={50}>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent side={side} align={align}>
        <p className="font-semibold text-sm capitalize">{label.toLowerCase()}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
 )
}