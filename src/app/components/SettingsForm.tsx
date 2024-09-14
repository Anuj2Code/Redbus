"use client"

import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UpdateUsername, UpdateEmail } from "../server";
import { SubmitButton } from "./SubmitButton";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";


const initialState = {
  message: "",
  status: ""
}

export function SettingsForm({ username, email }: { username: string | null | undefined, email: string | null | undefined }) {
  const [state, formAction] = useFormState(UpdateUsername, initialState)
  const [state2, formAction1] = useFormState(UpdateEmail, initialState)
  const { toast } = useToast();

  useEffect(() => {
    if (state?.status === "green" || state2?.status==="green") {
      toast({
        title: "Succesfull",
        description: state.message || state2.message,
      });
    } else if (state?.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast,state2]);

  return (
    <div>
      <div className="bg-black ">
        <form action={formAction}>
          <div className="flex gap-4">
            <Settings className="mt-6" height={30} width={30} />
            <h1 className="text-[50px] font-bold tracking-tight "> Settings</h1>
          </div>
          <Separator className="my-4" />
          <div>
            <Label className="text-2xl text-orange-500">Username</Label>
            <p className="text-muted-foreground pt-2">
              In this Settings page you can change your Username  !
            </p>
            <Input
              name="username"
              required
              className="mt-6 text-md"
              defaultValue={username ?? undefined}
              min={2}
              maxLength={21}
            />
            <div className="w-full flex mt-5 gap-x-5 justify-end">
              <Button variant="secondary" asChild type="button">
                <Link href="/">Cancel</Link>
              </Button>
              <SubmitButton text="change Username" />
            </div>
          </div>
        </form>
        <form action={formAction1}>
          <Label className="text-2xl text-orange-500">Email</Label>
          <p className="text-muted-foreground pt-2">
            In this Settings page you can change your Email_Id  !
          </p>
          <Input
            name="email"
            required
            className="mt-6 text-md"
            defaultValue={email ?? undefined}
            min={2}
            maxLength={21}
          />
          <div className="w-full flex mt-5 gap-x-5 justify-end">
            <Button variant="secondary" asChild type="button">
              <Link href="/">Cancel</Link>
            </Button>
            <SubmitButton text="change Email" />
          </div>
        </form>
      </div>
    </div>
  )
}



/*
useform status allows us to make a nicer user experience by showing a loading indicator while the server is taking its action.

useFormState allows us to get a response from a React Server Action and handle the results any way we might want to; including (but not limited to) displaying the contents of the response to the client.

*/