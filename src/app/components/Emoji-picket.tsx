"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover"
import { Smile } from "lucide-react";
import EmojiPicker from "@emoji-mart/react";
import data from "@emoji-mart/data"

interface emojiProps {
    onChange: (value: string) => void
}

export default function EmojoPicker({ onChange }: emojiProps) {
    return (
        <Popover>
            <PopoverTrigger>
                <Smile className="text-zinc-400 hover:text-zinc-300 transition" />
                <PopoverContent side="right" sideOffset={40} className="bg-transparent border-none shadow-none drop-shadow-none mb-16">
                      <EmojiPicker
                       data={data}
                       onEmojiSelect ={(emoji:any)=> onChange(emoji.native)}
                      />
                </PopoverContent>
            </PopoverTrigger>
        </Popover>

    )
}