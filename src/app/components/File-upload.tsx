"use client"
import { UploadDropzone } from "@/app/components/Uploadthing";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import https from 'https';

interface props {
    endpoint: "messageFile" | "imageUploader"
    onchange: (url?: string) => void
    value: string
}

export const FileUpload = ({ endpoint, onchange, value }: props) => {
    const [isPdf, setIsPdf] = useState(false);
    const [isImage, setIsImage] = useState(false);

    useEffect(() => {
      if (!value) return;
      https.get(value, (res) => {
        const contentType = res.headers['content-type'];
        if (contentType === "application/pdf") {
          setIsPdf(true);
        } else if (contentType && contentType.startsWith("image")) {
          setIsImage(true);
        }
      });
    }, [value]);
      
    if (value && isImage) {
        return (
            <div className="relative h-20 w-20">
                <Image
                    fill
                    src={value}
                    alt="upload"
                    className="rounded-full"
                />
                <button
                    onClick={() => onchange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm" type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }
    if (value && isPdf) {
        return (
            <div className="flex items-center justify-center">
                <FileIcon className="h-10 w-10 fill-indigo-2 stroke-indigo-400" />
                <p className="ml-2 text-sm text-indigo-400 hover:underline">{value}</p>
                <button
                    onClick={() => onchange("")}
                    className="bg-rose-500 text-white p-1 rounded-full relative bottom-12 shadow-sm" type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }
    return (
        <div>
            <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    console.log(res[0].url);
                    onchange(res?.[0].url)
                }}
                onUploadError={(error: Error) => {
                    console.log(error);

                }}
            />
        </div>
    )
}