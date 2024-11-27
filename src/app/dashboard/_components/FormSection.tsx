"use client"
import { template } from "../page"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Loader2 } from "lucide-react"
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import qs from "query-string";


interface props {
    paramId: string;
    userFormInput: (arg: string) => void;
    loading: boolean;
    response: string;
    prm: string
}

const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "Prompt is required"
    })
})

export default function FormSection(params: props) {
    const { onCredit, creditPoint, aiPrompt, promptGenerated } = useModal()
    const { user } = useKindeBrowserClient();
    const [load, setLoad] = useState(false)
    const [checkPre, setCheckPre] = useState(false)
    const templateData = template.find((item) => item.slug === params.paramId);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        params.userFormInput(values.prompt)
    }
    const saveDataDb = async (res: string, prompt: string) => {
        setLoad(true)
        let aiProm = false;
        if (aiPrompt === true) aiProm = true;
        const data = {
            response: res,
            prompt: aiPrompt ? prompt : "",
            createdBy: user?.email,
            generated: aiProm
        };
        try {
            await axios.post("/api/promptSave", data);
            if (aiPrompt === true) onCredit(true);
            setLoad(false)
            promptGenerated(false)
        } catch (error) {
            console.log(error, "Error while submitting the response");
        }
    }

    useEffect(() => {
        const checkPremium = async () => {
            try {
                const url = qs.stringifyUrl({
                    url: "/api/getPremiumUser"
                })
                const data = await axios.get(url);
                if (data?.data.isOk) {
                    setCheckPre(true)
                }
            } catch (error) {
                console.log(error, "[Error hai on check Premium]");
            }
        }
        checkPremium()
    }, [])

    return (
        <Card className="w-full sm:w-[350px] md:w-[400px] lg:w-[450px] overflow-x-hidden border-t-0 border-l-0 rounded-r-none border-b-0 bg-black border-r-4 border-zinc-500">
            <CardHeader>
                <CardTitle>{templateData?.title}</CardTitle>
                <CardDescription className="p-2 pt-4">{templateData?.description}</CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="prompt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground font-bold">
                                        {templateData?.FormHeader}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="name"
                                            disabled={params.loading}
                                            className="focus-visible:ring-0 focus-visible:ring-offset-0"
                                            placeholder="Type here to start"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500 pl-2" />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-center mt-4">
                            {params.loading ? (
                                <Button
                                    disabled
                                    className="bg-blue-500 justify-center text-white hover:bg-sky-700 transition-all duration-150"
                                >
                                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                </Button>
                            ) : (
                                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between w-full">
                                    <Button
                                        type="submit"
                                        disabled={!checkPre && creditPoint >= 5}
                                        className="bg-blue-500 text-white hover:bg-sky-700 transition-all duration-150 w-full sm:w-auto"
                                    >
                                        Generate
                                    </Button>
                                    <Button
                                        disabled={load}
                                        onClick={() => saveDataDb(params.response, params.prm)}
                                        className="bg-orange-500 text-white hover:bg-orange-700 transition-all duration-150 w-full sm:w-auto"
                                    >
                                        Save
                                    </Button>
                                </div>

                            )}
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
