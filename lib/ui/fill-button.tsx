"use client"
import React, {useId, useLayoutEffect} from "react"
import gsap from "gsap"

export default function FillButton({text}: {text: string}) {
  const id = useId()
  const color2 = "#ffffff"
  const color1 = "#00000000"

  function handleEnter(e: React.MouseEvent) {
    const bounds = e.currentTarget.getBoundingClientRect()
    const dx = bounds.left // distance from left border to button
    const dy = bounds.top
    const xPercent = (e.clientX - dx) / bounds.width
    const yPercent = (e.clientY - dy) / bounds.height
    console.log(e.clientX + ", " + dx + ", " + bounds.width)
    gsap.set("#" + id, {backgroundImage: `radial-gradient(circle at ${xPercent * 100}% ${yPercent * 100}%, ${color1} 10%, ${color2} 10%)`})
    gsap.to("#" + id, {backgroundImage: `radial-gradient(circle at ${xPercent * 100}% ${yPercent * 100}%, ${color1} 100%, ${color2} 100%)`, duration: 0.5, ease: "power4.out"})
  }

  function handleLeave(e: React.MouseEvent) {
    const bounds = e.currentTarget.getBoundingClientRect()
    const dx = bounds.left // distance from left border to button
    const dy = bounds.top
    const xPercent = (e.clientX - dx) / bounds.width
    const yPercent = (e.clientY - dy) / bounds.height
    gsap.killTweensOf("#" + id)
    gsap.to("#" + id, {ease: "circ.out", backgroundImage: `radial-gradient(circle at ${xPercent * 100}% ${yPercent * 100}%, ${color1} 0%, ${color2} 0%)`, duration: 0.2})
  }

  return (
    <div
      id={id}
      className="text-xl border-white cursor-pointer border-2 px-4 py-2 rounded-3xl"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, ${color1} 0%, ${color2} 0%)`,
      }}
      onMouseEnter={(e) => handleEnter(e)}
      onMouseLeave={(e) => handleLeave(e)}>
      <span style={{mixBlendMode: "difference"}}>{text}</span>
    </div>
  )
}
