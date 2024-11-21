"use client"

import * as z from "zod"
import axios from "axios";
import qs from "query-string"
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member, MemberRole, User } from "@prisma/client";
import { UserAvatar } from "./UserAvatar";
import { Edit, FileIcon, ShieldAlert, Trash } from "lucide-react";
import { Actiontooltip } from "./ui/tooltip-action";
import React, { useEffect, useState } from "react";
import https from 'https';
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter,useParams} from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
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

interface chatItemProps {
  id: string;
  content: string;
  member: Member & {
    User: User
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>
}

const roleIcon: Record<string, React.ReactNode> = {
  "ADMIN": <ShieldAlert className="text-red-500 h-4 w-4 ml-2" />,
  "GUEST": <ShieldAlert className="text-green-500 h-4 w-4 ml-2" />,
}

const formSchemma = z.object({
  content: z.string().min(1),
})

export default function ChatItem({ id, content, member, timestamp, fileUrl, deleted, currentMember, isUpdated, socketQuery, socketUrl }: chatItemProps) {
  const [isPdf, setIsPdf] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter()
  const params = useParams()
  const form = useForm<z.infer<typeof formSchemma>>({
    resolver: zodResolver(formSchemma),
    defaultValues: {
      content: content
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchemma>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery
      })
      await axios.post(url, values);
      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.log("[Messages_edited_error]", error);

    }
  }

  const isLoading = form.formState.isSubmitting
 
  const onMemberClick = ()=>{
     if(member.id===currentMember.id){
      return;
     }
     router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
  }

  useEffect(() => {
    if (!fileUrl) return;
    https.get(fileUrl, (res) => {
      const contentType = res.headers['content-type'];
      if (contentType === "application/pdf") {
        setIsPdf(true);
      } else if (contentType && contentType.startsWith("image")) {
        setIsImage(true);
      }
    });
  }, [fileUrl]);

  useEffect(() => {
    form.reset({
      content: content
    })
  }, [])

  useEffect(() => {
    const handleKey = (event: any) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false);
      }
    }
    window.addEventListener("keydown", handleKey)

    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  const onClick = async()=>{
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery
      })
      await axios.delete(url);
    } catch (error) {
      console.log("[Messages_deleted_error]", error);

    }
  }
  const isAdmin = currentMember.role === MemberRole.ADMIN
  const isOwner = currentMember.id === member.id
  const canDeleteMessage = !deleted && (isAdmin || isOwner)
  const canEditMessage = !deleted && isOwner && !fileUrl;

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div onClick={()=>onMemberClick()} className="cursor-pointer hover:drop-shadow-md transition">
          <UserAvatar src={member.User?.imageUrl as string} username={member.User?.userName as string} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p onClick={()=>onMemberClick()} className="font-semibold text-sm hover:underline cursor-pointer">
                {member.User.userName}
              </p>
              <Actiontooltip label={member.role}>
                {roleIcon[member.role]}
              </Actiontooltip>
            </div>
            <span className="text-sm text-zinc-400">
              {timestamp}
            </span>
          </div>
          {isImage && (
            <a
              href={fileUrl as string}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
            >
              <Image src={fileUrl as string} alt="content" fill className="object-cover" />
            </a>
          )}
          {isPdf && (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
              <FileIcon className=" h-10 w-10 fill-indigo-2 stroke-indigo-400 " />
              <a
                href={fileUrl as string}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square rounded-md mt-2 justify-center overflow-hidden border flex items-center bg-secondary h-8 w-32"
              >
                Pdf File
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <p className={cn("text-sm text-zinc-300", deleted && "text-zinc-400 italic text-sm mt-1")}>
              {content}
              {isUpdated && !deleted && (
                <span className="text-[10px] mx-2 text-zinc-500">
                  (edited)
                </span>
              )}
            </p>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-x-2 mt-2">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            disabled={isLoading}
                            className="p-2 bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-200"
                            placeholder="Edited Message"
                            {...field} />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} size="sm" variant="primary">
                  Save
                </Button>
              </form>
              <span className="text-[10px] mt-1 text-zinc-400">Press escape to cancel, enter to save</span>
            </Form>
          )}
        </div>
        {canDeleteMessage && (
          <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 border rounded-sm">
            {canEditMessage && (
              <Actiontooltip label="Edit">
                <Edit onClick={() => setIsEditing(true)} className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-300 transition" />
              </Actiontooltip>
            )}
            <Actiontooltip label="Delete">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Trash className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-300 transition" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your message from the channel
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=> onClick()}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Actiontooltip>
          </div>
        )}

      </div>
    </div>
  )
}