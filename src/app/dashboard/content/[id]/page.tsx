"use client"
import { useEffect, useState } from "react"
import { chatSession } from "../../../../../utils/AiModel"
import FormSection from "../../_components/FormSection"
import Outputsection from "../../_components/OutputSection"
import { template } from "../../page"
import { useModal } from "@/hooks/use-modal-store"

interface props {
    params: {
        id: string
    }
}

interface itemProps {
    title: string;
    description: string
    slug: string
    FormHeader: string
}

export default function content({ params }: props) {
    const { promptGenerated } = useModal()
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState("")
    const [prm, setPrm] = useState("")
    const templateData = template.find((item: itemProps) => item.slug === params.id);

    const GetPrompt = async (prompt: any) => {
        setLoading(true)
        const FinalPrompt = JSON.stringify(prompt) + ", " + templateData?.slug
        const result = await chatSession.sendMessage(FinalPrompt);
        promptGenerated(true);
        setPrm(prompt);
        setResponse(result.response.text());
        setLoading(false);
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 w-full">
            <FormSection
                paramId={params.id}
                userFormInput={(v: any) => GetPrompt(v)}
                loading={loading}
                prm={prm}
                response={response}
            />
            <Outputsection response={response} setResponse={setResponse} />
        </div>

    )
}