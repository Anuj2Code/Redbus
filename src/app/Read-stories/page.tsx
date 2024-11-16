import FloatDock from "../components/Float-Dock";
import StoryCard from "../components/StoryCard";

export default function ReadstoriesHome() {
    return (
        <div className="min-h-screen flex flex-row-reverse justify-around bg-black">
            {/* <div className="h-[100px] flex w-auto pt-6 pr-12 z-50">
                <FloatDock />
            </div> */}
            <div>
                <StoryCard />
            </div>
        </div>
    )
}