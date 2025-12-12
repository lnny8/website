"use client"
import React from "react"
import gsap from "gsap"
import {useGSAP} from "@gsap/react"
import {Sparkle} from "lucide-react"

export default function Marquee() {
  const themes = ["Websites", "Designing", "Graphics", "Animations", "Community", "Development", "Mentor"]

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>(".flow-item")
    const totalWidth = items.reduce((acc, item) => acc + item.offsetWidth + 40, 0)

    gsap.to(".flow-track", {
      x: -totalWidth,
      ease: "linear",
      duration: 84,
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % -totalWidth),
      },
    })
  }, [])
  return (
    <div className="border-t border-b relative border-white/10 mt-20 h-30 w-full overflow-hidden flex">
      <div className="flow-track flex items-center gap-10 whitespace-nowrap">
        {themes.map((theme, index) => (
          <span key={index} className="flow-item font-clash text-[#2c2c35] font-medium text-5xl flex items-center gap-5">
            {theme}
            <Sparkle className="size-7" />
          </span>
        ))}

        {/* Duplicate für Seamless Loop */}
        {themes.map((theme, index) => (
          <span key={"dup-" + index} className="flow-item font-clash text-[#2c2c35] font-medium text-5xl flex items-center gap-5">
            {theme}
            <Sparkle className="size-7" />
          </span>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-woodsmoke via-transparent to-woodsmoke" />
    </div>
  )
}
