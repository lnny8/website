"use client"
import React from "react"
import gsap from "gsap"
import {useGSAP} from "@gsap/react"
import {Sparkle} from "lucide-react"
import { knowledgeAreas } from "../data/data"

export default function Marquee() {
  const themes = knowledgeAreas

  useGSAP(() => {
    const totalWidth = document.querySelector<HTMLElement>(".flow-track")!.offsetWidth

    gsap.to(".flow-track", {
      x: `-= ${totalWidth}px`,
      duration: 42,
      ease: "linear",
      repeat: -1,
    })
  }, [])

  return (
    <div className="border-tf border-bf relative border-white/10 light:border-black/10 mt-20 h-30 w-full overflow-hidden flex -z-2">
      <div className="flow-track flex items-center whitespace-nowrap">
        {themes.map((theme, index) => (
          <span key={index} className="flow-item font-clash text-[#2c2c35] light:text-[#cbd5e1] font-medium text-5xl flex items-center">
            {theme}
            <Sparkle className="size-7 mx-5" />
          </span>
        ))}
      </div>

      <div className="flow-track flex items-center whitespace-nowrap">
        {themes.map((theme, index) => (
          <span key={index} className="flow-item font-clash text-[#2c2c35] light:text-[#cbd5e1] font-medium text-5xl flex items-center">
            {theme}
            <Sparkle className="size-7 mx-5" />
          </span>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-woodsmoke light:from-athensgray via-transparent to-woodsmoke light:to-athensgray" />
    </div>
  )
}
