"use client"

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Hash } from 'lucide-react';

gsap.registerPlugin(useGSAP);

export default function ServerWelcome({ name }: { name: string }) {
  useGSAP(() => {
    const t1 = gsap.timeline();
    t1.from(".header-word", {
      scale: 1.3,
      opacity: 0,
      ease: "power4.in",
      duration: 2,
      stagger: 1
    })
    t1.from(".under", {
      translateX: -300,
      opacity: 0,
      ease: "power4.out",
      duration: 2,
    })
    t1.to(".hs", {
      translateY: 20,
      opacity: 1,
      paddingLeft: 14,
      paddingRight: 14,
      ease: "power4.out",
      duration: 2,
    })
  })

  return (
    <div className="h-[80vh] flex-col flex justify-center items-center">
      <div className="header-word font-semibold text-[50px]">
        <h1 className='flex'>Welcome to the<span className='hs opacity-0 -translate-y-24'><Hash className='h-8 font-bold w-8' /></span>{name}</h1>
        <hr className='under h-1 bg-zinc-500 w-[100%]' />
      </div>
    </div>
  )
}