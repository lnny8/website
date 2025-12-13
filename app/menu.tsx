"use client"

import React, {useRef} from "react"
import Link from "next/link"
import {Moon, Sun} from "lucide-react"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import {useGSAP} from "@gsap/react"
import { SplitText } from "gsap/all"
import {useTheme} from "next-themes"

export default function Menu() {
  const tabs = ["Home", "About", "Projects", "Contact"]
  const currentTab = "Home"
  const containerRef = useRef<HTMLDivElement | null>(null)
  const {theme, setTheme} = useTheme()

  useGSAP(() => {

    gsap.from(containerRef.current, {duration: 1, ease: "power2.out", yPercent: -50})

    gsap.registerPlugin(ScrollTrigger, SplitText)
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        {maxWidth: "80rem", paddingInline: "0rem", border: "none"},
        {
          maxWidth: "38rem",
          paddingInline: "1.5rem",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "+=240",
            scrub: true,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  function handleLinkHover(e: React.MouseEvent) {
    const link = e.currentTarget as HTMLElement
    const topText = link.querySelector(".text-top") as HTMLElement
    const bottomText = link.querySelector(".text-bottom") as HTMLElement
    if (!topText || !bottomText) return
    const top = new SplitText(topText, {type: "chars", mask: "chars"})
    const bottom = new SplitText(bottomText, {type: "chars", mask: "chars"})
    gsap.set(bottom, {yPercent: 100, display: "block"})
    // gsap.to(top.chars, {yPercent: -100, stagger: 0.02})
    // gsap.to(bottom.chars, {yPercent: -100, stagger: 0.02})
  }

  return (
    <nav className="w-full fixed h-20 flex items-center justify-center z-10">
      <div ref={containerRef} className="w-full max-w-7xl flex items-center justify-between backdrop-blur-xl light:bg-athensgray bg-woodsmoke/80 rounded-full py-2.5">
        <Link href="/" className="text-white light:text-black font-semibold text-lg">
          LM
        </Link>
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <Link onMouseEnter={(e) => handleLinkHover(e)} key={tab} href={"/" + tab.toLowerCase()} className={`flex items-center justify-center gap-2 cursor-pointer relative ${currentTab === tab ? "text-white light:text-black" : "text-white/70 light:text-black/70 hover:text-white light:hover:text-black"}`}>
              {currentTab === tab && <div className="rounded-full size-1.5 bg-lime" />}
              <span className="text-sm font-extralight flex flex-col">
                <span className="text-top">{tab}</span>
                <span className="text-bottom absolute fhidden">{tab}</span>
              </span>
            </Link>
          ))}
        </div>
        <button className="cursor-pointer" onClick={() => {setTheme(theme === "dark" ? "light" : "dark")}}>
          {theme === "dark" ? (
            <Moon className="size-5 text-white/70 hover:text-white transition-all duration-300" />
          ) : (
            <Sun className="size-5 text-black/70 hover:text-black transition-all duration-300" />
          )}
        </button>
      </div>
    </nav>
  )
}
