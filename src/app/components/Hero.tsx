import Link from "next/link"
import { Spotlight } from "./ui/Spotlight";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import { Cover } from "./ui/cover";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

function Hero() {
  return (
    <div className="flex z-0 items-center justify-center w-full flex-col h-[100vh] px-4">
      <Spotlight
        className="top-10 left-0 md:left-60 md:-top-10 z-50"
        fill="white"
      />
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
        <span className="text-xs tracking-wider">⭐ Star me on Github</span>
      </HoverBorderGradient>
      <h2 className="text-4xl lg:text-6xl font-semibold w-[1000px] mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Instant <Cover> <span className=" bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 "> Conversations  </span></Cover> , Lasting Connections ,Your Community Awaits.
      </h2>
      <p className=" md:w-[800px] text-muted-foreground text-center md:tracking-wider leading-8 mb-4 text-base">
        A Place for Every Topic, a Voice for Every Person. Real-Time Chat, Real Connections and Build Communities, Explore Ideas, and Connect in Real Time
      </p>
      <div className="w-full pt-2 flex justify-center items-center gap-x-4">
        <Link href="/server">
          <button type="button" className="z-50 px-8 py-3 rounded-lg relative
           bg-custom-gradient-129 text-white text-sm hover:shadow-2xl transition duration-500 border-0 border-slate-600 group mt-14"><div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur-[1px] opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div><span className="relative z-20"><span className="inline-flex h-full w-full cursor-pointer items-center justify-center"> Create Your server &nbsp;<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"></path></svg></span></span></button>
        </Link>
        <Link href="/Read-stories">
          <button type="button" className="z-50 px-8 py-3 rounded-lg relative
           bg-custom-gradient-129 text-white text-sm hover:shadow-2xl transition duration-500 border-0 border-slate-600 group mt-14"><div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur-[1px] opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div><span className="relative z-20"><span className="inline-flex h-full w-full cursor-pointer items-center justify-center">Read Stories &nbsp;<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"></path></svg></span></span></button>
        </Link>
      </div>
      <ShootingStars />
      <StarsBackground />
    </div>
  )
}

export default Hero