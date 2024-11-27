"use client";
import React from "react";
import { LinkPreview } from "./ui/link-preview";
import im1 from "../../../public/Screenshot 2024-11-22 144625.png"
import im2 from "../../../public/Screenshot 2024-11-22 145536.png"
import im3 from "../../../public/Screenshot 2024-11-22 145749.png"

export function Hero4() {
    return (
        <div className="flex justify-center items-center h-[80vh] flex-col px-4 bg-black bg-dot-white/[0.2]">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div>
                <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl  text-left mb-10">
                    " Visit{" "}
                    <LinkPreview
                        url="/"
                        imageSrc={im1.src}
                        isStatic={true}
                        className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
                    >
                        Nimbus
                    </LinkPreview>{" "}
                    Unite Conversations, Content, and Community "
                </p>

                <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl  text-left ">
                    "Discover ,
                    <LinkPreview
                        url="/"
                        imageSrc={im2.src}
                        isStatic
                        className="font-bold"
                    >
                        Discuss ,
                    </LinkPreview>{" "}
                    <LinkPreview
                        url="/"
                        imageSrc={im3.src}
                        isStatic
                        className="font-bold"
                    >
                        Share ,
                    </LinkPreview>{" "}
                    in One Dynamic Space twice a day."
                </p>
            </div>
        </div>
    );
}
