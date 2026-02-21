"use client"
import React, {useEffect, useRef} from "react"
import gsap from "gsap"

export default function BlurReveal() {
  const blurRef = useRef<HTMLDivElement | null>(null)
  const isStartPage = false

  useEffect(() => {
    if (typeof window === "undefined") return
    const el = blurRef.current
    if (!el) return

    gsap.to(el, {
      ease: "circ.in",
      duration: 1,
      mask: "linear-gradient(100deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
      opacity: 0,
      onComplete: () => {
        if (el.parentNode) el.parentNode.removeChild(el)
      },
    })
  }, [isStartPage])

  return <div ref={blurRef} className="blur pointer-events-none fixed w-screen h-screen opacity-100 light:bg-athensgray bg-woodsmoke backdrop-blur-[200px] z-10" style={{mask: "linear-gradient(100deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 0%)"}} />
}
