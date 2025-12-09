"use client"

import { TypewriterEffect } from "./typewriter-effect"

export const SequentialTypewriter = () => {
  const words = [
    { text: "Build.", className: "text-xl font-bold text-blue-500" },
    { text: "Design.", className: "text-xl font-bold text-green-500" },
    { text: "Develop.", className: "text-xl font-bold text-blue-500" },
    { text: "Deploy.", className: "text-xl font-bold text-amber-500" },
  ]

  return <TypewriterEffect words={words} />
}
