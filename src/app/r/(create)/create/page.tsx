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
    const { toast } = useToast();

    useEffect(() => {
        if (state?.status === "error") {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive",
            });
        }
    }, [state, toast]);

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-black px-4 sm:px-6 md:px-10 lg:px-14">
            <div className="w-full sm:w-[90%] lg:w-[80%]">
                <form action={formAction}>
                    {/* Heading */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-8">
                        <Pencil className="w-6 h-6" />
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                            Create Community
                        </h1>
                    </div>
                    <Separator className="my-4" />

                    {/* Name Input */}
                    <Label className="text-lg">Name</Label>
                    <p className="text-sm text-muted-foreground">
                        Community names, including capitalization, cannot be changed!
                    </p>
                    <div className="relative mt-3">
                        <p className="absolute left-2 w-8 flex items-center justify-center h-full text-muted-foreground">
                            r/
                        </p>
                        <Input
                            name="name"
                            required
                            className="pl-8"
                            minLength={2}
                            maxLength={21}
                        />
                    </div>
                    {state?.message && (
                        <p className="mt-1 text-sm text-destructive text-red-500">
                            {state.message}
                        </p>
                    )}

                    {/* Action Buttons */}
                    <div className="w-full flex flex-col sm:flex-row mt-5 gap-3 sm:gap-x-5 justify-end">
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
