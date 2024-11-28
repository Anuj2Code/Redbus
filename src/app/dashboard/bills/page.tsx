"use client"
import { CardSpotlightDemo } from "../../../app/components/cardGlow";
import { paymentTemplate } from "../page";
import { CardGlowprops } from "../../../app/components/cardGlow";

export default function Bills() {
    return (
        <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center overflow-x-hidden">
            {paymentTemplate.map((item: CardGlowprops) => {
                return <CardSpotlightDemo title={item.title} price={item.price} step1={item.step1} step2={item.step2} step3={item.step3} step4={item.step4} desc={item.desc} type={item.type} btn={item.btn} />
            })}
        </div>
    )
}