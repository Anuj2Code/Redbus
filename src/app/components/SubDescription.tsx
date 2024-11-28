"use client";

import { Textarea } from "../../components/ui/textarea";
import { SaveButton } from "./SubmitButton";
import { updateSubDes } from "../server";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "../../components/ui/use-toast";

interface props {
    name: string | undefined,
    description: string | undefined | null
}

const initalState = {
    message: "",
    status: "",
};


export function SubDescription({ name, description }: props) {
    const [state,Action] = useFormState(updateSubDes,initalState)
    const { toast } = useToast();
    useEffect(() => {
        if (state?.status === "green" ) {
            toast({
              title: "Succesfull",
              description: state.message,
            });
        }
        else if (state?.status === 'error') {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive",
            });
        }
    }, [state, toast]);
    return (
        <form action={Action} className='mt-4' >
            <input type="hidden" name='Subname' value={name} />
            <Textarea
                placeholder='create Your custom description '
                maxLength={100}
                name='description'
                defaultValue={description ?? undefined}
            />
            <SaveButton />
        </form >
    )
}