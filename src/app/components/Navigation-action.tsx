"use client"
import { Plus } from "lucide-react";
import { Actiontooltip } from "./ui/tooltip-action";
import { useModal } from "@/hooks/use-modal-store";

export default function NavigationAction() {
    const {onOpen}  = useModal()
    return (
        <div>
            <Actiontooltip
                side="right"
                label="Add a server"
                align="center"
            >
                <button 
                onClick={()=> onOpen("createServer")}
                className="group flex items-center">
                    <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background group-hover:bg-emerald-500">
                        <Plus className="group-hover:text-white transition text-emrald-500 "
                            size={25}></Plus>
                    </div>
                </button>
            </Actiontooltip>
        </div>
    )
}