"use client"
import { useGSAP } from "@gsap/react"
import React from "react"
import gsap from "gsap"
import { ScrollTrigger, SplitText } from "gsap/all"

export default function AnimationText() {

    gsap.registerPlugin(ScrollTrigger, SplitText)
    useGSAP(() => {
        const chars = document.querySelectorAll(".animation-text")
        const splitText = new SplitText(chars, {type: "words", mask: "words"})
        gsap.set(splitText.words, {yPercent: 100})
        gsap.to(splitText.words, {yPercent: 0, stagger: 0.1, ease: "back.out", scrollTrigger: {
            trigger: chars,
            scrub: 3,
            start: "top 100%",
            end: "bottom 50%",
        }})
    }, [])

    return (
    <p className="animation-text text-center text-3xl mt-10 leading-normal font-medium text-white light:text-black">
      I'm Lenny Muffler, Software Developer and Designer with over 2 years of experience. With strong focus on producing high quality & impactful digital experiences that drive results and achieve business goals. I specialize in creating user-centric designs and developing robust
      web applications.
    </p>
  )
}
