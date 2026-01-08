"use client"

import React, {useEffect, useRef} from "react"
import HoverButton from "@/lib/components/hoverButton"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/all"
import {SplitText} from "gsap/all"
import SocialSpan from "@/lib/components/socialSpan"
import {useId} from "react"
import Link from "next/link"
import {motion} from "motion/react"

export default function Footer() {
  gsap.registerPlugin(ScrollTrigger, SplitText)
  const splitText = useRef<SplitText | null>(null)
  const id = useId()

  useEffect(() => {
    gsap.killTweensOf(`#${id} .text`)
    splitText.current?.revert()
    const text = document.querySelector(`#${id} .text`)
    if (!text) return

    splitText.current = new SplitText(text, {type: "chars", mask: "chars"})
    gsap.set(splitText.current.chars, {yPercent: 100, opacity: 0})
    const animation = gsap.to(splitText.current.chars, {
      yPercent: 0,
      opacity: 1,
      stagger: 0.02,
      ease: "back.out",
      scrollTrigger: {
        trigger: text,
        start: "top 90%",
        toggleActions: "play reverse restart reverse",
      },
    })

    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
      splitText.current?.revert()
      gsap.killTweensOf(`#${id} .text`)
    }
  }, [id])

  return (
    <footer id={id} className="w-full md:px-0 px-6 bg-woodsmoke light:bg-athensgray light:text-black md:pt-40 pt-20">
      <div className="rounded-4xl bg-woodsmoke-light light:bg-white w-full max-w-7xl mx-auto py-20 flex flex-col items-center justify-center">
        <div className="px-4 py-2 flex gap-3 items-center justify-center rounded-full bg-lime/10">
          <div className="rounded-full size-2 bg-lime relative">
            <div className="bg-lime rounded-full absolute inset-0 animate-[blink_1s_infinite]" />
          </div>
          <span className="text-sm">Available for work</span>
        </div>
        <span className="text text-5xl max-w-md font-clash font-medium tracking-wide text-center mt-5">Let's create your next big idea</span>
        <Link href="/contact" className="mt-10 h-12 w-42">
          <HoverButton text1="Contact Me" text2="Let's go" />
        </Link>
      </div>

      <div className="flex items-center justify-between max-w-7xl mx-auto py-10">
        <span className="text-white/70 light:text-black/70 text-sm font-light">© 2025 Lenny Muffler. All rights reserved.</span>
        <SocialSpan />
      </div>
    </footer>
  )
}
