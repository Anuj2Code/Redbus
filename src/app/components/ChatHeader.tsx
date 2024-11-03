import { Hash } from "lucide-react";
import Toggle from "./MobileToggle";
import { UserAvatar } from "./UserAvatar";
import { SocketIndicator } from "./ui/socket-indicator";
import { ChatVideo } from "./Chat-video-button";

interface chatHeaderProps {
    name: string;
    serverId: string;
    imageUrl?: string;
    type: "channel" | "conversation"
}

export default function ChatHeader({ name, serverId, imageUrl, type }: chatHeaderProps) {
    return (
        <div className="text-md font-semibold px-4 flex items-center h-12 border-neutral-800 border-b-2">
            <Toggle serverId={serverId} />
            {type === "channel" && (
                <Hash className="h-5 w-5 text-zinc-400 mr-2" />
            )}
            {type === "conversation" && (
                <UserAvatar src={imageUrl} className="h-8 w-8 mr-2" username={name} />
            )}
            <p className="font-semibold text-md text-white">
                {name}
            </p>
            <div className="ml-auto flex items-center">
                {type==="conversation" && (
                    <ChatVideo/>
                )}
                <SocketIndicator />
            </div>
        </div>
    )
}