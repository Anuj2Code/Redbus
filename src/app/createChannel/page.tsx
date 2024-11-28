"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "../../hooks/use-modal-store";
import { AuroraBackground } from "../../app/components/ui/aurora-background";
import { motion } from "framer-motion";
import { channelType } from "@prisma/client";
import { serverWithMemberChannelWithProfile } from "../../../types";

// zod schema
const formSchema = z.object({
    name: z.string().min(1, {
        message: "channel name is required",
    }).refine(
        name => name !== 'general', {
        message: "Channel name cannot be 'general'"
    }
    ),
    type: z.nativeEnum(channelType)
});

export default function CreateChannel() {
    const router = useRouter();
    const { data, onOpen } = useModal();
    const { server } = data as { server: serverWithMemberChannelWithProfile }

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: channelType.TEXT
        },
    });
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const payload = {
                name: values.name,
                type: values.type,
                serverId: server?.id
            }
            console.log(payload);

            const res = await axios.post("/api/channel", payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            form.reset();
            router.refresh();
            onOpen("channel", { server: res.data })
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <AuroraBackground className="">
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="z-50">
                <div
                    className="w-full flex justify-center text-3xl font-semibold h-44 items-center text-white"
                >
                    <h1>Create Your Channel</h1>
                </div>
                <div >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-8 px-6 flex-col flex w-full items-center justify-center ">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="uppercase text-muted-foreground font-bold ">Channel Name</FormLabel>
                                            <FormControl>
                                                <Input disabled={isLoading} className="bg-slate-100 md:w-[500px] text-black border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                                    placeholder="Enter the channel name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="uppercase text-muted-foreground font-bold ">Channel Type</FormLabel>
                                            <Select
                                                disabled={isLoading}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className=" bg-slate-300 md:w-[500px]  border-0 focus:ring-0 text-black ring-offset-0  capitalize outline-none focus:ring-offset-0">
                                                        <SelectValue placeholder="select a channel type" className="md:w-[500px]" />
                                                        <SelectContent className="md:w-[500px]">
                                                            {Object.values(channelType).map((type) => (
                                                                <SelectItem value={type} key={type} className="capitalize ">{type.toLowerCase()}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </SelectTrigger>
                                                </FormControl>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full flex justify-center items-center ">
                                <Button type="submit" disabled={isLoading} variant="primary" className="w-32">Create</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </motion.div>
        </AuroraBackground>
    );
}