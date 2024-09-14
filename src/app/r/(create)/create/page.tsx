"use client";
import { CreateCommunity } from "@/app/server";
import { Pencil } from "lucide-react";
import { SubmitButton } from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const initalState = {
    message: "",
    status: "",
};

export default function SubredditPage() {
    const [state, formAction] = useFormState(CreateCommunity, initalState);
     const {toast} = useToast()
    useEffect(() => {
        if (state?.status === 'error') {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive",
            });
        }
    }, [state, toast]);

    return (
        <div className="w-auto min-h-screen items-center flex bg-black mx-auto   flex-col ">
            <div className="px-14 w-[80%]">
                <form action={formAction}>
                    <div className="flex gap-4 mt-8">
                        <Pencil className="mt-2"/>
                        <h1 className="text-3xl font-extrabold tracking-tight">
                            Create Community
                        </h1>
                    </div>
                    <Separator className="my-4" />
                    <Label className="text-lg">Name</Label>
                    <p className="text-muted-foreground">
                        Community names including capitalization cannot be changed!
                    </p>

                    <div className="relative mt-3">
                        <p className="absolute left-0 w-8 flex items-center justify-center h-full text-muted-foreground">
                            r/
                        </p>
                        <Input
                            name="name"
                            required
                            className="pl-6"
                            minLength={2}
                            maxLength={21}
                        />
                    </div>
                    <p className="mt-1 text-destructive text-red-500">{state?.message}</p>
                    <div className="w-full flex mt-5 gap-x-5 justify-end">
                        <Button variant="secondary" asChild>
                            <Link href="/">Cancel</Link>
                        </Button>
                        <SubmitButton text="Create Community" />
                    </div>
                </form>
            </div>
        </div>
    );
}