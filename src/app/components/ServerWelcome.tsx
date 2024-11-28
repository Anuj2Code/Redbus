"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function ServerWelcome({ name }: { name: string }) {
  useGSAP(() => {
    const t1 = gsap.timeline();
    t1.from(".header-word", {
      scale: 1.3,
      opacity: 0,
      ease: "power4.in",
      duration: 2,
      stagger: 1,
    });
    t1.from(".under", {
      translateX: -300,
      opacity: 0,
      ease: "power4.out",
      duration: 2,
    });
  });

  return (
    <div className="h-[80vh] flex flex-col justify-center items-center px-4">
      <div className="header-word font-semibold text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] text-center">
        <h1 className="flex flex-wrap justify-center">
          Welcome to the
          <span className="pl-2"> {name}</span>
        </h1>
        <hr className="under h-1 bg-zinc-500 w-full mt-2 sm:mt-4" />
      </div>
    </div>
  );
}
