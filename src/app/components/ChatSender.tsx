"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import qs from "query-string"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input";
import EmojoPicker from "./Emoji-picket";
import axios from "axios";
import { useRouter } from "next/navigation";

interface props {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
}

const formSchema = z.object({
    content: z.string().min(1)
})

export default function ChatSender({ name, query, apiUrl }: props) {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query
            })
            await axios.post(url, values);
            form.reset()
            router.refresh()
        } catch (error) {
            console.log("[OnSubmit error]", error);
        }
    }

    return (
        <div className="bg-black">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative p-4 flex  pb-6">
                                        <Input
                                            disabled={isLoading}
                                            className="px-14 py-6 bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-200"
                                            placeholder={`# Message ${name}`}
                                            {...field}
                                        />
                                        <div className="relative right-12 mr-12 top-[14px] ">
                                            <EmojoPicker onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)} />
                                        </div>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    >
                    </FormField>
                </form>
            </Form>
        </div>
    )
}