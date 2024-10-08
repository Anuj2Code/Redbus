"use client"
import { UploadDropzone } from "@/app/components/Uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

interface props {
    endpoint: "messageFile" | "imageUploader"
    onchange: (url?: string) => void
    value: string
}

export const FileUpload = ({ endpoint, onchange, value }: props) => {
    const fileType = value?.split(".").pop()

    if (value && fileType !== "pdf") {
        return (
            <div className="relative h-20 w-20">
                <Image
                    fill
                    src={value}
                    alt="upload"
                    className="rounded-full"
                />
               <button
               onClick={()=> onchange("")}
               className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm" type="button"
               >
                <X className="h-4 w-4"/>
               </button>
            </div>
        )
    }
    return (
        <div>
            <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    console.log(res[0].url);
                    onchange(res?.[0].url)
                }}
                onUploadError={(error: Error) => {
                    alert("Error");
                }}
            />
        </div>
    )
}