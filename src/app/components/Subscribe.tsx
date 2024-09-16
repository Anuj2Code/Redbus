"use client"
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface ch {
    id: string,
    userId: string
}
export function Subscribe({ id, userId }: ch) {
    const router = useRouter()
    const addSubscription = async (id: string, userId: string):Promise<void> => {
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
            console.log(res.data);
            if (res.data.status === "green") {
                router.refresh()
            }

        } catch (error: any) {
            console.error("Error message:", error);
        }
    }
    return (
        <Button type='submit' className="rounded-md w-full bg-orange-500 hover:bg-orange-600 text-white" onClick={() => addSubscription(id, userId)}>
            Join Community
        </Button>
    )
}