"use client"
import React from "react"
import gsap from "gsap"
import {SplitText} from "gsap/all"

export default function HoverButton({text1, text2}: {text1: string; text2: string}) {
  gsap.registerPlugin(SplitText)

  const text1Ref = React.useRef<any>(null)
  const text2Ref = React.useRef<any>(null)

  const initialPath = "M 0 200 Q 50 20 100 200"
  const hoverPath = "M 0 0 Q 50 0 100 0"

  const ease = "circ.out"

  function handleEnter() {
    text1Ref.current && text1Ref.current.revert()
    text2Ref.current && text2Ref.current.revert()
    text1Ref.current = new SplitText(".text1", {type: "lines", mask: "lines"})
    text2Ref.current = new SplitText(".text2", {type: "lines", mask: "lines"})

    gsap.set(".text2", {display: "block", yPercent: 0})
    gsap.set(text2Ref.current.lines, {yPercent: 100})

    gsap.to(".button", {scale: 1.06, duration: 0.3, ease: "power2.out"})
    gsap.to(".button", {scale: 1.03, duration: 0.5, delay: 0.3, ease: "power2.out"})

    gsap.to(".svg path", {duration: 0.3, ease: ease, attr: {d: hoverPath}})
    gsap.to(".svg rect", {duration: 0.3, ease: ease, attr: {y: "0"}})

    gsap.to(text1Ref.current.lines, {yPercent: -100, duration: 0.5, ease: "power2.out", stagger: 0.05})
    gsap.to(text2Ref.current.lines, {yPercent: 0, duration: 0.5, ease: "power2.out", stagger: 0.05})
  }

  function handleLeave() {
    gsap.killTweensOf(".button")
    gsap.to(".button", {scale: 1, duration: 0.3, ease: "power2.out"})

    gsap.to(".svg path", {duration: 0.5, ease: ease, attr: {d: initialPath}})
    gsap.to(".svg rect", {duration: 0.5, ease: ease, attr: {y: "200"}})

    gsap.to(text1Ref.current.lines, {yPercent: 0, duration: 0.5, ease: "power2.out"})
    gsap.to(text2Ref.current.lines, {yPercent: 100, duration: 0.3, ease: "power4.out"})

  }

  return (
    <div onMouseEnter={() => handleEnter()} onMouseLeave={() => handleLeave()} className="button relative flex items-center justify-center w-full overflow-hidden h-full cursor-pointer border-1 border-white px-4 py-2 rounded-full">
      <svg className="svg absolute inset-0 w-full h-full fill-white" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect width="300" x={"-100"} y={200} height="100" fill="white" />
        <path d={initialPath} />
      </svg>
      <span className="text1 relative">{text1}</span>
      <span className="text2 text-black absolute hidden">{text2}</span>
    </div>
  )
}
