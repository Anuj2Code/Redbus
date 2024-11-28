"use client"
import { Button } from "../../../components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../../../components/ui/drawer"
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { FileUpload } from "../File-upload";
import qs from "query-string"
import { useModal } from "../../../hooks/use-modal-store";


const formSchema = z.object({
    fileUrl: z.string().min(1, {
        message: "Attachment is required"
    })
})

export default function AttachMessage() {
    const router = useRouter();
    const {data} = useModal();
    const {apiUrl,query} =  data
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: ""
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url:apiUrl || "",
                query,
            })
            await axios.post(url,{
                ...values,
                content:values.fileUrl
            })
            form.reset();
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <button
                    type="button"
                    onClick={() => { }}
                    className="relative mt-3 left-8 h-[24px] w-[24px]  bg-zinc-400 hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                >
                    <Plus className="text-[#313338]" />
                </button>
            </DrawerTrigger>
                <DrawerContent className="bg-[#000000] h-[70vh]">
                <div className="mx-auto w-full max-w-sm flex flex-col items-center justify-center mt-14">
                    <DrawerHeader>
                        <DrawerTitle>Attach Message</DrawerTitle>
                        <DrawerDescription>Send a file as a message</DrawerDescription>
                    </DrawerHeader>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex justify-center items-center">
                                <FormField
                                    control={form.control}
                                    name="fileUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="messageFile"
                                                    value={field.value}
                                                    onchange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DrawerFooter className="relative bottom-7">
                            <Button type="submit" disabled={isLoading} variant="primary">Send</Button>
                        </DrawerFooter>
                    </form>
                </Form>
                </div>
            </DrawerContent>
        </Drawer>
    )
}