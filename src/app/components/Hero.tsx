import Link from "next/link"
import { BackgroundLines } from "../components/ui/background-lines";
import { Button } from "../components/ui/moving-border";
function Hero() {
  return (
    <div className="">
      <BackgroundLines className="flex z-0 items-center justify-center w-full flex-col px-4">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-3xl lg:text-5xl font-sans py-2 md:py-10 relative z-0 font-bold tracking-tight">
          Create the server like Discord for your chat
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
          Create your comprehensive Discord like server and transform your chatting to new level today.
        </p>
      <div className="w-full pt-12 flex justify-center items-center">
      <Link href="/server">
        <Button
          borderRadius="1.75rem"
          className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Create Your server
        </Button>
        </Link>
      </div>
      </BackgroundLines>
    </div>
  )
}

export default Hero