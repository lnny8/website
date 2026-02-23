"use client"
import React, {useEffect, useId} from "react"
import gsap from "gsap"
import {SplitText} from "gsap/all"
import {useGSAP} from "@gsap/react"
import {Loader2} from "lucide-react"

export default function HoverButton({text1, text2, className, disabled, loading}: {text1: string; text2: string; className?: string; disabled?: boolean; loading?: boolean}) {
  gsap.registerPlugin(SplitText)

  const id = useId()

  const text1Ref = React.useRef<any>(null)
  const text2Ref = React.useRef<any>(null)
  const [showLoading, setShowLoading] = React.useState(false)

  const initialPath = "M 0 200 Q 50 20 100 200"
  const hoverPath = "M 0 0 Q 50 0 100 0"

  const ease = "circ.out"

  useEffect(() => {
    if (loading && !showLoading) {
      setShowLoading(true)
      gsap.fromTo(`#${id} .loader-cover`, {opacity: 0}, {opacity: 1, duration: 0.3, ease: "power2.out"})
      gsap.fromTo(`#${id} .loader-wrapper`, {scale: 0}, {scale: 1, duration: 0.3, ease: "back.out(1.7)"})
    }

    if (!loading && showLoading) {
      gsap.to(`#${id} .loader-cover`, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          setShowLoading(false)
        },
      })
      gsap.to(`#${id} .loader-wrapper`, {scale: 0, duration: 0.5, ease: "back.in(1.7)"})
    }
  }, [loading])

  useGSAP(() => {
    gsap.set(`#${id} .text2`, {yPercent: 100})
  })

  function killAllTweensAndResetSplits() {
    gsap.killTweensOf(`#${id}`)
    text1Ref.current && gsap.killTweensOf(text1Ref.current.lines)
    text2Ref.current && gsap.killTweensOf(text2Ref.current.lines)
    text1Ref.current && text1Ref.current.revert()
    text2Ref.current && text2Ref.current.revert()
    gsap.killTweensOf(`#${id} .svg path`)
    gsap.killTweensOf(`#${id} .svg rect`)
  }

  function handleEnter() {
    killAllTweensAndResetSplits()
    text1Ref.current = new SplitText(`#${id} .text1`, {type: "lines", mask: "lines"})
    text2Ref.current = new SplitText(`#${id} .text2`, {type: "lines", mask: "lines"})

    gsap.set(`#${id} .text2`, {display: "block", yPercent: 0})

    gsap.set(text2Ref.current.lines, {yPercent: 100})

    gsap.to(`#${id}`, {scale: 1.06, duration: 0.3, ease: "power2.out"})
    gsap.to(`#${id}`, {scale: 1.03, duration: 0.5, delay: 0.3, ease: "power2.out"})

    gsap.to(`#${id} .svg path`, {duration: 0.3, ease: ease, attr: {d: hoverPath}})
    gsap.to(`#${id} .svg rect`, {duration: 0.3, ease: ease, attr: {y: "0"}})

    gsap.to(text1Ref.current.lines, {yPercent: -100, duration: 0.5, ease: "power2.out", stagger: 0.05})
    gsap.to(text2Ref.current.lines, {yPercent: 0, duration: 0.5, ease: "power2.out", stagger: 0.05})
  }

  function handleLeave() {
    killAllTweensAndResetSplits()

    text1Ref.current = new SplitText(`#${id} .text1`, {type: "lines", mask: "lines"})
    text2Ref.current = new SplitText(`#${id} .text2`, {type: "lines", mask: "lines"})

    gsap.to(`#${id}`, {scale: 1, duration: 0.3, ease: "power2.out"})

    gsap.to(`#${id} .svg path`, {duration: 0.5, ease: ease, attr: {d: initialPath}})
    gsap.to(`#${id} .svg rect`, {duration: 0.5, ease: ease, attr: {y: "200"}})

    gsap.to(text1Ref.current.lines, {yPercent: 0, duration: 0.5, ease: "power2.out"})
    gsap.to(text2Ref.current.lines, {yPercent: 100, duration: 0.3, ease: "power4.out"})
  }

  return (
    <div
      id={id}
      onMouseEnter={() => !disabled && !loading && handleEnter()}
      onMouseLeave={() => handleLeave()}
      className={`relative flex items-center justify-center w-full bg-woodsmoke-light light:bg-athensgray-light overflow-hidden h-full cursor-pointer shadow-(--inset_shadow) border-white light:border-black px-4 py-2 rounded-2xl ${className}`}>
      <svg className="svg absolute inset-0 w-full h-full fill-white light:fill-black" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect width="300" x={"-100"} y={200} height="100" className="fill-white light:fill-black" />
        <path d={initialPath} />
      </svg>
      <span className="text1 relative font-medium">{text1}</span>
      <span className="text2 text-black light:text-white absolute font-medium">{text2}</span>
      <div className={`loader-cover absolute bg-white light:bg-black inset-0 ${showLoading ? "flex" : "hidden"} w-full h-full items-center justify-center`}>
        <div className="loader-wrapper">
          <Loader2 className="stroke-2 animate-spin text-black light:text-white" />
        </div>
      </div>
    </div>
  )
}
