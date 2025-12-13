"use client"

import {Facebook, Github, Instagram, Linkedin, Mail, Split, Twitter, X} from "lucide-react"
import React from "react"
import Link from "next/link"
import HoverButton from "./tutorials/hover-button/button"
import gsap from "gsap"
import {useGSAP} from "@gsap/react"
import {ScrollTrigger} from "gsap/all"
import {SplitText} from "gsap/all"

export default function Footer() {
  gsap.registerPlugin(ScrollTrigger, SplitText)

  useGSAP(() => {
    const text = document.querySelector(".text")
    const splitText = new SplitText(text, {type: "chars", mask: "chars"})
    gsap.set(splitText.chars, {yPercent: 100, opacity: 0})
    gsap.to(splitText.chars, {
      yPercent: 0,
      opacity: 1,
      stagger: 0.02,
      ease: "back.out",
      scrollTrigger: {
        trigger: text,
        start: "top 90%",
        toggleActions: "play pause reverse reset", // Play on enter, reverse on leave
      },
    })
  })

  return (
    <footer className="w-full bg-woodsmoke light:bg-athensgray light:text-black pt-40">
      <div className="rounded-4xl bg-woodsmoke-light light:bg-white w-full max-w-7xl mx-auto py-20 flex flex-col items-center justify-center">
        <div className="px-4 py-2 flex gap-3 items-center justify-center rounded-full bg-lime/10">
          <div className="rounded-full size-2 bg-lime relative">
            <div className="bg-lime rounded-full absolute inset-0 animate-[blink_1s_infinite]" />
          </div>
          <span className="text-sm">Available for work</span>
        </div>
        <span className="text text-5xl max-w-md font-clash font-medium tracking-wide text-center mt-5">Let's create your next big idea</span>
        <div className="pt-10">
          <HoverButton text1="Contact Me" text2="Let's go" />
        </div>
      </div>

      <div className="flex items-center justify-between max-w-7xl mx-auto py-10">
        <span className="text-white/70 light:text-black/70 text-sm font-light">© 2025 Lenny Muffler. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="https://linkedin.com/in/lennymuffler" target="_blank" aria-label="LinkedIn">
            <Linkedin className="size-5 text-white/70 light:text-black/70 hover:text-white transition-all duration-300" />
          </Link>
          <Link href="https://github.com/lnny8" target="_blank" aria-label="GitHub">
            <Github className="size-5 text-white/70 light:text-black/70 hover:text-white transition-all duration-300" />
          </Link>
          <Link href="https://instagram.com/lnny.8" target="_blank" aria-label="Instagram">
            <Instagram className="size-5 text-white/70 light:text-black/70 hover:text-white transition-all duration-300" />
          </Link>
          <Link href="mailto:lennymuffler@gmail.com" target="_blank" aria-label="Email">
            <Mail className="size-5 text-white/70 light:text-black/70 hover:text-white transition-all duration-300" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
