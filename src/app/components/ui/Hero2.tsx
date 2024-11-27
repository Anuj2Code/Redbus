import { HoverBorderGradient } from "./hover-border-gradient";

export default function Hero2() {
    return (
        <div className="h-[80vh] bg-black flex justify-center items-center px-4">
            <div className="w-full max-w-5xl">
                <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center justify-center space-x-2 px-4 py-2"
                >
                    <span className="text-xs sm:text-sm tracking-wider flex gap-x-3">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 448 512"
                            className="text-blue-600"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M80 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm32.4 97.2c28-12.4 47.6-40.5 47.6-73.2c0-44.2-35.8-80-80-80S0 35.8 0 80c0 32.8 19.7 61 48 73.3V358.7C19.7 371 0 399.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-32.8-19.7-61-48-73.3V272c26.7 20.1 60 32 96 32h86.7c12.3 28.3 40.5 48 73.3 48c44.2 0 80-35.8 80-80s-35.8-80-80-80c-32.8 0-61 19.7-73.3 48H208c-49.9 0-91-38.1-95.6-86.8zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM344 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"></path>
                        </svg>
                        By Developer, For People
                    </span>
                </HoverBorderGradient>
                <div className="mt-5">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-snug sm:leading-normal text-white tracking-tight font-semibold text-center sm:text-left">
                        Built with Real
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-pink-600 to-purple-600">
                            Developer Experience
                        </span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-center sm:text-left tracking-wider leading-6 sm:leading-8 mt-5 mb-10 text-muted-foreground">
                        At Nimbus, we've walked the developer's path. Crafted by developers for developers, Nimbus offers tools, tips, and insights to help you excel. From coding advice to real-world project experiences, whether you're a beginner or a pro, you'll find valuable resources for your development journey.
                    </p>
                    <div className="flex justify-center sm:justify-start">
                        <button
                            type="button"
                            className="z-50 px-6 sm:px-8 py-3 rounded-lg relative bg-custom-gradient-129 text-white text-sm sm:text-base hover:shadow-2xl transition duration-500 border-0 border-slate-600 group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur-[1px] opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                            <span className="relative z-20">
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center">
                                    Experience &nbsp;
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 448 512"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"></path>
                                    </svg>
                                </span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
