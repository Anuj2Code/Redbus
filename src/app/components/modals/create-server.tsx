"use client"
import * as z from "zod"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FileUpload } from "../File-upload";
import axios from "axios";
import { useRouter } from "next/navigation";

// zod schema
const formSchema = z.object({
    name: z.string().min(1, {
        message: "server name is required"
    }),
    imageUrl: z.string().min(1, {
        message: "server image is required"
    })
})

export const InitialModel = () => {
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false);  // to prevent it form hydration error
    useEffect(() => {
        setIsMounted(true)
    }, [])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/server",values)
            form.reset();
            router.refresh();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    if (!isMounted) {
        return null;
    }
    return (
        <Dialog open>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-bold text-[#d1d5db] md:text-2xl">Customise your server</DialogTitle>
                    <DialogDescription className="py-6">
                        Give your server a personality with a name and an image. You can always change it later
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex justify-center items-center">
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="imageUploader"
                                                    value={field.value}
                                                    onchange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-muted-foreground font-bold">Server Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={isLoading} className="bg-slate-100 text-black border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                                placeholder="Enter the server name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={isLoading} variant="primary">Create</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}




