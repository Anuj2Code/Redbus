"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { SubscriptionButton, SubscriptionButton1 } from './SubmitButton';

interface ch {
    id: string,
    userId: string,
    isSubscribed: boolean
}
export function Subscribe({ id, userId, isSubscribed }: ch) {
    const router = useRouter()
    const { toast } = useToast();
    const [pending, setPending] = useState<boolean>(false)

    const addSubscription = async (id: string, userId: string): Promise<void> => {
        setPending(true)
        try {
            const payload = {
                redditId: id,
                userId: userId
            }
            const res = await axios.post("/api/subscribe", payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.data.status === "green") {
                router.refresh()
                setPending(false)
                toast({
                    title: "Succesfull",
                    description: "Subscription added",
                });
            }
            else if (res.data.status !== "green") {
                setPending(false)
                toast({
                    title: "Server Error",
                    description: res.data.message,
                });
            }
        } catch (error: any) {
            console.error("Error message:", error);
        }
    }
    
    const removeSubscription = async (id: string, userId: string): Promise<void> => {
        setPending(true)
        try {
            const payload = {
                redditId: id,
                userId: userId
            }
            const res = await axios.post("/api/unsubscribe", payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.data.status === "green") {
                router.refresh()
                setPending(false)
                toast({
                    title: "Succesfull",
                    description: res.data.message,
                });
            }
            else if (res.data.status !== "green") {
                setPending(false)
                toast({
                    title: "Server Error",
                    description: res.data.message,
                });
            }

        } catch (error: any) {
            console.error("Error message:", error);
        }
    }

    return (
        <>
            {isSubscribed ? (<>
                <div className="text-white" onClick={() => removeSubscription(id, userId)} >
                    <SubscriptionButton1 pending={pending} />
                </div>
            </>) : (
                <div className="text-white" onClick={() => addSubscription(id, userId)} >
                    <SubscriptionButton pending={pending} />
                </div>
            )}
        </>
    )
}