"use client";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const words = `No Bookmark has been created , when you will create it will show over here`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} duration={2} className="mt-24 align-middle"/>;
}
