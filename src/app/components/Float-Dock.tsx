"use client"
import React from "react";
import {
    IconExchange,
} from "@tabler/icons-react";
import { FloatingDock } from "../components/ui/floating-dock";
import { AppWindow, DraftingCompass, Heart, MessageCircle, PersonStanding, SquarePen } from "lucide-react";

const FloatDock = () => {
    const links = [
        {
            title: "Author",
            icon: (
                <PersonStanding className="h-full w-full text-neutral-300"/>
            ),
            href: "/dashboard",
        },
        {
            title: "All Story",
            icon: (
                <AppWindow className="h-full w-full text-neutral-300"/>
            ),
            href: "#",
        },
        {
            title: "View Comment",
            icon: (
                <MessageCircle className="h-full w-full text-neutral-300"/>
            ),
            href: "#",
        },
        {
            title: "Like",
            icon: (
                <Heart className="h-full text-red-500 w-full fill-red-500"/>
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
