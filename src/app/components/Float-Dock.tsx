"use client"
import React from "react";
import {
    IconExchange,
} from "@tabler/icons-react";
import { FloatingDock } from "../components/ui/floating-dock";
import { DraftingCompass, SquarePen } from "lucide-react";

const FloatDock = () => {
    const links = [
        {
            title: "Write",
            icon: (
                <SquarePen className="h-full w-full text-neutral-300"/>
            ),
            href: "#",
        },
        {
            title: "Drafts",
            icon: (
                <DraftingCompass className="h-full w-full text-neutral-300"/>
            ),
            href: "#",
        },
    ];
    return (
    <div className="bg-black">
       <FloatingDock items={links} />
    </div>
  )
}

export default FloatDock
