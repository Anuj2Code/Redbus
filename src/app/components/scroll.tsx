import { VelocityScroll } from "./ui/srollVelocity";


export default function ScrollBasedVelocityText() {
    return (
        <VelocityScroll
            text="Community Chats Explore."
            default_velocity={5}
            className="text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
        />
    );
}