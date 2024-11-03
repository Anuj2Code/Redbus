import { Hash } from "lucide-react"

interface welcomeProps {
    type: "channel" | "conversation"
    name: string
}

export default function ChatWelcome({ type, name }: welcomeProps) {
    return (
        <div className="space-y-2 px-4 mb-4 mt-4">
            {type === "channel" && (
                <div className="h-[75px] w-[75px] rounded-full bg-zinc-700 flex items-center justify-center">
                    <Hash className="h-12 w-12 text-center" />
                </div>
            )}
            <p className="text-xl md:text-3xl font-bold">
                {type==="channel"? "Welcome to #":""}{name}
            </p>
             <p className="text-zinc-400 text-sm">
                {type ==="channel"? `This is the start of the # ${name} channel`:`This is the start of the conversation with ${name}`}
             </p>
        </div>
    )
}