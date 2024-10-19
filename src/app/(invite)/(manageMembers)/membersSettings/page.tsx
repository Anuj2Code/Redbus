"use client"

import { BackgroundBeamsWithCollision } from "@/app/components/ui/background-beams-with-collision"
import { useModal } from "@/hooks/use-modal-store"
import { serverWithMemberChannelWithProfile } from "../../../../../types"
import { UserAvatar } from "@/app/components/UserAvatar"
import { useEffect, useState } from "react"
import { MoreVertical, UserX, ShieldCheck } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ProgressSpinner } from "primereact/progressspinner"
import axios from "axios"
import { useRouter } from "next/navigation"


export default function ManageMembers() {
    const { data, onOpen } = useModal()
    const [update, setUpdated] = useState(false);
    const { server } = data as { server: serverWithMemberChannelWithProfile }
    const router = useRouter()
    const kickOut = async (memberId: string) => {
        try {
            setUpdated(true)
            const payload = {
                memberId: memberId,
                serverId: server?.id
            }
            const res = await axios.post("/api/removeMembers", payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            router.refresh();
            setUpdated(false);
            onOpen("members", { server: res.data })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <BackgroundBeamsWithCollision>
            <div className="flex flex-col justify-center items-center w-full">
                <h1 className=" text-4xl font-semibold relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                    <span className="">Manage Members.</span>
                </h1>
                <div>
                    {server?.Members?.length} Members
                </div>
                {update ? <ProgressSpinner className="h-12 w-12 mt-12" /> :
                    <div className="mt-8 pr-12 md:w-[500px]">
                        {server?.Members.map((member) => (
                            <div key={member.id} className="flex items-center gap-x-2  mb-6">
                                <UserAvatar src={member.User.imageUrl!} username={member.User.userName!} />
                                <div className="flex ml-3 gap-32">
                                    <div className="flex">
                                        <div>
                                            <div className="text-sm font-semibold flex items-center">
                                                {member.User.userName}
                                                {server.userId === member.userId && <div className="h-[2px] w-[2px] pb-6 pl-3 text-green-500">
                                                    <ShieldCheck />
                                                </div>}
                                            </div>
                                            <p className="text-[14px] font-medium bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
                                                {member.User.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        {server.userId !== member.userId  && (
                                            <div className="mt-4">
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <MoreVertical className="cursor-pointer" />
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-44">
                                                        <div className="gap-4">
                                                            <div className="justify-around flex">
                                                                <input type="hidden" name="memberId" value={member.id} />
                                                                <AlertDialog>
                                                                    <AlertDialogTrigger asChild className="cursor-pointer">
                                                                        <div className="flex gap-4 justify-between w-full">
                                                                            <h4 className="font-medium leading-none">kick-out</h4>
                                                                            <UserX className="h-4 w-4" />
                                                                        </div>
                                                                    </AlertDialogTrigger>
                                                                    <AlertDialogContent>
                                                                        <AlertDialogHeader>
                                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                            <AlertDialogDescription>
                                                                                This action cannot be undone. This will permanently remove the
                                                                                member from your server.
                                                                            </AlertDialogDescription>
                                                                        </AlertDialogHeader>
                                                                        <AlertDialogFooter>
                                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                            <AlertDialogAction className="bg-red-600 transition-all hover:bg-red-800 duration-100 text-white" onClick={() => kickOut(member.id)}>Kick-out</AlertDialogAction>
                                                                        </AlertDialogFooter>
                                                                    </AlertDialogContent>
                                                                </AlertDialog>
                                                            </div>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>

        </BackgroundBeamsWithCollision>
    )
}


