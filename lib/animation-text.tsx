"use client"
import { useGSAP } from "@gsap/react"
import React from "react"
import gsap from "gsap"
import { ScrollTrigger, SplitText } from "gsap/all"

export default function AnimationText() {

    gsap.registerPlugin(ScrollTrigger, SplitText)
    useGSAP(() => {
        const chars = document.querySelectorAll(".animation-text")
        const splitText = new SplitText(chars, {type: "chars"})
        gsap.to(splitText.chars, {opacity: 1, stagger: 0.05, scrollTrigger: {
            trigger: chars,
            scrub: true,
        }})
    }, [])

    return (
    <p className="animation-text text-center opacity-20 text-3xl mt-10 leading-normal text-white font-medium">
      I'm Lenny Muffler, Software Developer and Designer with over 2 years of experience. With strong focus on producing high quality & impactful digital experiences that drive results and achieve business goals. I specialize in creating user-centric designs and developing robust
      web applications.
    </p>
  )
}
