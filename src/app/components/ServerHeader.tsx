"use client"

import { MemberRole } from "@prisma/client"
import { serverWithMemberChannelWithProfile } from "../../../types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react"
import { useModal } from "@/hooks/use-modal-store"
import Link from "next/link"

interface headerProps {
    server: serverWithMemberChannelWithProfile
    role?: MemberRole
}
export default function Serverheader({ server, role }: headerProps) {
    const {onOpen} = useModal()
    const isAdmin = role === MemberRole.ADMIN
    const isModerator = role === MemberRole.GENERATOR

    return (
        <DropdownMenu >
            <DropdownMenuTrigger
                className="focus:outline-none"
                asChild
            >
                <button
                    className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-400 border-b-2 hover:bg-zinc-700/10 transition"
                >
                    {server.name}
                    <ChevronDown className="h-5 w-5 ml-6" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56  font-medium text-white space-y-[2px] text-sm">
                <DropdownMenuGroup>
                    {!isModerator && (
                        <Link href="/invite">
                        <DropdownMenuItem className=" px-2 py-2 text-sm cursor-pointer" >
                            Invite People
                            <UserPlus className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                        </Link>
                    )}
                    {isAdmin && (
                        <DropdownMenuItem className="px-2 py-2 text-sm cursor-pointer">
                            Server Settings
                            <Settings className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}
                    {isAdmin && (
                        <DropdownMenuItem className="px-2 py-2 text-sm cursor-pointer">
                            Manages Members
                            <Users className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}
                    {!isModerator && (
                        <DropdownMenuItem className="px-2 py-2 text-sm cursor-pointer" onClick={()=> onOpen("invite",{server})}>
                            Create Channel
                            <PlusCircle className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}
                    {!isModerator && (
                        <DropdownMenuSeparator />
                    )}
                    {isAdmin && (
                        <DropdownMenuItem className="text-rose-500 px-2 py-2 text-sm cursor-pointer">
                            Delete server
                            <Trash className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}
                    {!isAdmin && (
                        <DropdownMenuItem className="text-rose-500 px-2 py-2 text-sm cursor-pointer">
                            Leave server
                            <LogOut className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}