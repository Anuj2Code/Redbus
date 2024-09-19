
"use client";
import React from "react";
import { ShootingStars } from "../../../../components/ui/shooting-stars";
import { StarsBackground } from "../../../../components/ui/stars-background";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import ph from "../../../../../../public/a89add_3d73f7e43cff4f37bdf0af4772ef6595~mv2.gif"
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text, Video } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TipTapEditor } from "@/app/components/TipTapEditor";
import { SubmitButton } from "@/app/components/SubmitButton";
import { UploadDropzone } from "@/app/components/Uploadthing";

const rules = [
    {
        id: 1,
        text: "Remember the human",
    },
    {
        id: 2,
        text: "Behave like you would in real life",
    },
    {
        id: 3,
        text: "Look for the original source of content",
    },
    {
        id: 4,
        text: "Search for duplication before posting",
    },
    {
        id: 5,
        text: "Read the community guidlines",
    },
];

export default function createPostRoute({ params }: { params: { id: string } }) {
    return (
        <div className="min-h-screen rounded-md bg-black flex  relative w-full px-24 gap-x-10 pt-12">
            <div className="w-[65%] h-5 flex flex-col gap-y-5">
                <h1 className="z-50">
                    Subreddit :{" "}
                    <Link href={`/r/${params.id}`} className="text-orange-400 pl-4 hover:underline hover:cursor-pointer  underline-offset-4">
                        r/{params.id}
                    </Link>
                </h1>
                <Tabs defaultValue="post" className="w-full z-50">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="post">
                            <Text className="h-4 w-4 mr-2" /> Post
                        </TabsTrigger>
                        <TabsTrigger value="image">
                            <Video className="h-4 w-4 mr-2" />
                            Image & Video
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="post">
                        <Card>
                            <form>
                                <CardHeader>
                                    <Label className="pb-4">Title</Label>
                                    <Input
                                        required
                                        name="title"
                                        placeholder="Title"
                                    />
                                    <TipTapEditor />
                                </CardHeader>
                                <CardFooter>
                                    <SubmitButton text="Create Post" />
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>
                    <TabsContent value="image">
                        <Card>
                            <CardHeader>
                               <UploadDropzone 
                                endpoint="imageUploader"
                                 onClientUploadComplete={(res)=>{
                                    console.log(res);
                                 }}
                                 onUploadError={(error:Error)=>{
                                   console.log(error);
                                   
                                 }}
                               />
                            </CardHeader>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <div className="w-[35%]">
                <Card className="flex flex-col p-4">
                    <div className="flex items-center gap-x-2">
                        <Image className="h-20 w-20" src={ph} alt="pfp" height={350} width={400} />
                        <h1 className="font-medium">Posting to Reddit</h1>
                    </div>
                    <Separator className="mt-2" />
                    <div className="flex flex-col gap-y-5 mt-5">
                        {rules.map((item) => (
                            <div key={item.id}>
                                <p className="text-sm font-medium">
                                    {item.id}. {item.text}
                                </p>
                                <Separator className="mt-2" />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
            <ShootingStars />
            <StarsBackground />
        </div>
    )
}