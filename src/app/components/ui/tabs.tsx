import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Volume2 } from "lucide-react";

type Tab = {
  Answer: string;
  Question: string;
};

export const Tabs = ({
  tabs: propTabs,
  setUserQuestion,
  containerClassName,
  tabClassName,
  contentClassName,
  setAIAnswer
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  setAIAnswer: React.Dispatch<React.SetStateAction<any>>;
  setUserQuestion: React.Dispatch<React.SetStateAction<any>>;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);
  const [hovering, setHovering] = useState(false);

  // Automatically update userQuestion whenever active tab changes
  useEffect(() => {
    setUserQuestion(active.Question);
    setAIAnswer(active.Answer)
  }, [active, setUserQuestion, setAIAnswer]);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...tabs];
    const [selectedTab] = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab);
    setTabs(newTabs);
    setActive(selectedTab);
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center relative justify-center sm:overflow-visible no-visible-scrollbar w-full",
          containerClassName
        )}
      >
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => moveSelectedTabToTop(idx)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-4 py-2 mt-8 rounded-full bg-slate-800 mx-4", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <span className="relative block text-black dark:text-white">
              # Question {idx + 1}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        setAIAnswer={setAIAnswer}
        active={active}
        setUserQuestion={setUserQuestion}
        hovering={hovering}
        className={cn("mt-32", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  active,
  setUserQuestion,
  hovering,
}: {
  className?: string;
  tabs: Tab[];
  setAIAnswer: React.Dispatch<React.SetStateAction<any>>;
  active: Tab;
  setUserQuestion: React.Dispatch<React.SetStateAction<any>>;
  hovering?: boolean;
}) => {
  const textToSpeach = (text: any) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("There is error while Processing");
    }
  };

  // Automatically update userQuestion when the active question changes
  useEffect(() => {
    setUserQuestion(active.Question);
  }, [active, setUserQuestion]);

  return (
    <div className="relative w-full h-full m-6 rounded-xl flex-col flex bg-[#6d21bb] justify-center items-center">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.Question}
          layoutId={tab.Question}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: active.Question === tab.Question ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full text-center  absolute top-0 left-0 text-xl", className)}
        >
          <p className="font-semibold justify-center flex text-center gap-x-4">
            Question <Volume2 onClick={() => textToSpeach(tab.Question)} className="cursor-pointer " />
          </p>
          <p className="px-10 pt-4">{tab.Question}</p>
        </motion.div>
      ))}
    </div>
  );
};
