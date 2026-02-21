"use client"
import {useGSAP} from "@gsap/react"
import React from "react"
import gsap from "gsap"
import {ScrollTrigger, SplitText} from "gsap/all"

export default function AnimationText() {
  gsap.registerPlugin(ScrollTrigger, SplitText)
  useGSAP(() => {
    const chars = document.querySelectorAll(".animation-text")
    const splitText = new SplitText(chars, {type: "words"})
    gsap.from(splitText.words, {
      opacity: 0.1,
      // y: 10,
      filter: "blur(1px)",
      stagger: 0.1,
      ease: "back.out",
      scrollTrigger: {
        trigger: chars,
        scrub: 3,
        start: "top 100%",
        end: "top 50%",
      },
    })
  }, [])

  return (
    <h1 className="animation-text p-5 rounded-4xl text-center md:text-3xl text-2xl mt-10 leading-normal font-medium text-white light:text-black">
      I'm Lenny Muffler, a 17-year-old high school student from Germany with a passion for technology and creativity. From building interactive web applications to designing hardware prototypes, I love exploring new ways to bring ideas to life. I specialize in full-stack web and app
      development, 3D modeling and creating automation workflows that streamline complex tasks.
    </h1>
  )
}
