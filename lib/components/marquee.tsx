"use client"
import React from "react"
import gsap from "gsap"
import {useGSAP} from "@gsap/react"
import {Sparkle} from "lucide-react"
import {knowledgeAreas} from "../data/data"

export default function Marquee({direction}: {direction?: "left" | "right"}) {
  const themes = knowledgeAreas
  const containerRef = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tracks = gsap.utils.toArray<HTMLElement>(".flow-track", containerRef.current)
      const totalWidth = tracks[0]?.offsetWidth ?? 0

      if (totalWidth === 0 || tracks.length === 0) {
        return
      }

      const startX = direction === "right" ? -totalWidth : 0
      const endX = direction === "right" ? 0 : -totalWidth

      gsap.fromTo(
        tracks,
        {x: startX},
        {
          x: endX,
          duration: 42,
          ease: "linear",
          repeat: -1,
        },
      )
    },
    {dependencies: [direction], scope: containerRef},
  )

  return (
    <div ref={containerRef} style={{mask: "linear-gradient(to right, transparent 0%, black 50%, transparent 100%)"}} className="border-tf border-bf relative border-white/10 light:border-black/10 h-30 w-full overflow-hidden flex -z-2">
      <div className="flow-track flex items-center whitespace-nowrap">
        {themes.map((theme, index) => (
          <span key={index} className="flow-item font-clash text-[#2c2c35] light:text-[#cbd5e1] font-medium md:text-5xl text-3xl flex items-center">
            {theme}
            <Sparkle className="size-7 mx-5" />
          </span>
        ))}
      </div>

      <div className="flow-track flex items-center whitespace-nowrap">
        {themes.map((theme, index) => (
          <span key={index} className="flow-item font-clash text-[#2c2c35] light:text-[#cbd5e1] font-medium md:text-5xl text-3xl flex items-center">
            {theme}
            <Sparkle className="size-7 mx-5" />
          </span>
        ))}
      </div>
    </div>
  )
}
