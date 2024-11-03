"use client"

import { useEffect, useState } from "react"
import {
    LiveKitRoom,
    VideoConference
} from '@livekit/components-react';

import '@livekit/components-styles';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Loader2 } from "lucide-react";

interface mediaProps {
    chatId: string;
    audio: boolean;
    video: boolean;
}

export const MediaRoom = ({ chatId, audio, video }: mediaProps) => {
    const [token, setToken] = useState("")
    const { user, getUser } = useKindeBrowserClient();
    const alsoUser = getUser();
    const username = alsoUser?.username || "Member";

    useEffect(() => {
        (async () => {
            try {
                const resp = await fetch(`/api/livekit?room=${chatId}&username=${username}`)
                const data = await resp.json();
                setToken(data.token)
            } catch (error) {
                console.log("[liveKit_error]", error);

            }
        })()
    }, [chatId, alsoUser?.username])

    if (token === "") {
        return (
            <div className="flex flex-col flex-1 h-[72vh] items-center justify-center">
                <Loader2 className="h-7 w-7 text-zinc-400 animate-spin my-4" />
                <p className="text-xs text-zinc-400">Loading ...</p>
            </div>
        )
    }

    return (
        <LiveKitRoom
            data-lk-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            video={true}
            style={{ height: '83dvh' }}
            audio={true}
            connect={true}
        >
            <VideoConference />
        </LiveKitRoom>
    )
}


// using asyschronous function directly inside the useeffect use that function inside the this bracket (func)()

