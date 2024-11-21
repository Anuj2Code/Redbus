import React from 'react'

const StoryLoader = () => {
  return (
    <div className="flex flex-col ml-4 overflow-x-hidden ">
    <div className="p-2 md:p-10 bg-black ml-4 flex flex-col gap-2 flex-1 w-full h-full md:w-[90vw] overflow-x-hidden">
            <div className="flex flex-col gap-4 ml-4">
                {[...new Array(3)].map((i) => (
                    <div
                        key={"first-array" + i}
                        className=" h-32 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                    ></div>
                ))}
            </div>
            <div className="flex gap-2 flex-1">
                {[...new Array(2)].map((i) => (
                    <div
                        key={"second-array" + i}
                        className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                    ></div>
                ))}
            </div>
        </div>
    <div className="p-2 md:p-10 bg-black ml-4 flex flex-col gap-2 flex-1 w-full h-full md:w-[90vw] overflow-x-hidden">
            <div className="flex flex-col gap-4 ml-4">
                {[...new Array(3)].map((i) => (
                    <div
                        key={"first-array" + i}
                        className=" h-32 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                    ></div>
                ))}
            </div>
            <div className="flex gap-2 flex-1">
                {[...new Array(2)].map((i) => (
                    <div
                        key={"second-array" + i}
                        className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                    ></div>
                ))}
            </div>
        </div>
    <div className="p-2 md:p-10 bg-black ml-4 flex flex-col gap-2 flex-1 w-full h-full md:w-[90vw] overflow-x-hidden">
            <div className="flex flex-col gap-4 ml-4">
                {[...new Array(3)].map((i) => (
                    <div
                        key={"first-array" + i}
                        className=" h-32 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                    ></div>
                ))}
            </div>
            <div className="flex gap-2 flex-1">
                {[...new Array(2)].map((i) => (
                    <div
                        key={"second-array" + i}
                        className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                    ></div>
                ))}
            </div>
        </div>
    <div className="p-2 md:p-10 bg-black ml-4 flex flex-col gap-2 flex-1 w-full h-full md:w-[90vw] overflow-x-hidden">
            <div className="flex flex-col gap-4 ml-4">
                {[...new Array(3)].map((i) => (
                    <div
                        key={"first-array" + i}
                        className=" h-32 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                    ></div>
                ))}
            </div>
            <div className="flex gap-2 flex-1">
                {[...new Array(2)].map((i) => (
                    <div
                        key={"second-array" + i}
                        className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                    ></div>
                ))}
            </div>
        </div>
    <div className="p-2 md:p-10 bg-black ml-4 flex flex-col gap-2 flex-1 w-full h-full md:w-[90vw]">
            <div className="flex flex-col gap-4 ml-4">
                {[...new Array(3)].map((i) => (
                    <div
                        key={"first-array" + i}
                        className=" h-32 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                    ></div>
                ))}
            </div>
            <div className="flex gap-2 flex-1">
                {[...new Array(2)].map((i) => (
                    <div
                        key={"second-array" + i}
                        className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                    ></div>
                ))}
            </div>
        </div>
    <div className="p-2 md:p-10 bg-black ml-4 flex flex-col gap-2 flex-1 w-full h-full md:w-[90vw]">
            <div className="flex flex-col gap-4 ml-4">
                {[...new Array(3)].map((i) => (
                    <div
                        key={"first-array" + i}
                        className=" h-32 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                    ></div>
                ))}
            </div>
            <div className="flex gap-2 flex-1">
                {[...new Array(2)].map((i) => (
                    <div
                        key={"second-array" + i}
                        className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                    ></div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default StoryLoader