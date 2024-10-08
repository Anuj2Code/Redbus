"use client"

import { ServerModel } from "@/app/components/modals/create-server-again"
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);  // to prevent it form hydration error
   
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }
    
    return (
        <div>
            <ServerModel />
        </div>
    )
}

export default ModalProvider