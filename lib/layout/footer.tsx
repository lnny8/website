"use client"

import React, {useEffect, useRef} from "react"
import HoverButton from "@/lib/components/hoverButton"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/all"
import {SplitText} from "gsap/all"
import SocialSpan from "@/lib/components/socialSpan"
import Link from "next/link"
import {usePathname} from "next/navigation"

export default function Footer() {
  gsap.registerPlugin(ScrollTrigger, SplitText)
  const splitText = useRef<SplitText | null>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const textRef = useRef(null)
  const footerRef = useRef(null)
  const pathname = usePathname()

  useEffect(() => {
    if (!textRef.current) return
    if (!footerRef.current) return

    // Clear previous animation setup when the route changes
    animationRef.current?.kill()
    triggerRef.current?.kill()
    gsap.killTweensOf(textRef.current)
    splitText.current?.revert()

    splitText.current = new SplitText(textRef.current, {type: "words,chars"})
    // Keep word groups inline so line breaks stay natural while animating chars
    gsap.set(splitText.current.words, {display: "inline-block"})
    animationRef.current = gsap.fromTo(
      splitText.current.chars,
      {
        yPercent: 100,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.02,
        ease: "back.out",
        paused: true,
      }
    )

    triggerRef.current = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top 70%",
      animation: animationRef.current,
      toggleActions: "play reverse restart reverse",
      markers: true,
    })

    return () => {
      animationRef.current?.kill()
      triggerRef.current?.kill()
      splitText.current?.revert()
    }
  }, [pathname])

  return (
    <footer ref={footerRef} className="w-full md:px-0 px-6 bg-woodsmoke light:bg-athensgray light:text-black pt-20">
      <div className="rounded-4xl bg-woodsmoke-light light:bg-white w-full max-w-7xl mx-auto py-20 flex flex-col items-center justify-center">
        <div className="px-4 py-2 flex gap-3 items-center justify-center rounded-full bg-lime/10">
          <div className="rounded-full size-2 bg-lime relative">
            <div className="bg-lime rounded-full absolute inset-0 animate-[blink_1s_infinite]" />
          </div>
          <span className="text-sm">Available for work</span>
        </div>
        <span ref={textRef} className="text md:text-5xl text-4xl px-4 md:px-0 max-w-md font-clash font-medium tracking-wide text-center mt-5">
          Let's create your next big idea
        </span>
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
