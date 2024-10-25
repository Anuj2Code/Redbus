"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { useParams, useRouter } from "next/navigation";

interface dataTypes {
    icon: React.ReactNode,
    name: string | null,
    id: string,
}

interface serverProps {
    data: {
        label: string,
        type: "channel" | "members",
        data: dataTypes[] | undefined
    }[]
}

export default function ServerSearch({ data }: serverProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();
    
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
          if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            setOpen((open) => !open)
          }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
      }, [])
      
      const onClick = ({id,type}:{id:string,type:"channel" | "members"})=>{
        setOpen(false);
        if(type==='channel'){
            router.push(`/servers/${params.serverId}/channels/${id}`);
        }
        if(type==='members'){
            router.push(`/servers/${params.serverId}/conversations/${id}`);
        }
      }
    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 transition"
            >
                <Search className="h-4 w-4 text-zinc-500" />
                <p className="font-semibold text-sm text-zinc-500 hover:text-zinc-400">
                    Search
                </p>
                <kbd
                    className=" pointer-events-none inline-flex h-5 select-none  items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
                >
                    <span>ctrl +</span>k
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen} >
                <CommandInput placeholder="Search all channels and members" />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {data.map(({ label, type, data }) => {
                        if (!data?.length) return null;
                        return (
                            <CommandGroup key={label} heading={label}>
                                {data?.map(({ id, name, icon }) => {
                                    return (
                                        <CommandItem key={id} onSelect={()=> onClick({id,type})}>
                                            {icon}
                                            <span className="pl-2">{name}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        )
                    })}
                </CommandList>
            </CommandDialog>
        </>
    )
}