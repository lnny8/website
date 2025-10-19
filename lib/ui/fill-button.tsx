"use client"
import React, {useId, useLayoutEffect} from "react"
import gsap from "gsap"

export default function FillButton({size, text}: {size: number, text: string}) {
  const id = useId()

  function handleEnter(e: React.MouseEvent) {
    const bounds = e.currentTarget.getBoundingClientRect()
    const dx = bounds.left // distance from left border to button
    const dy = bounds.top
    const xPercent = (e.clientX - dx) / bounds.width
    const yPercent = (e.clientY - dy) / bounds.height
    console.log(e.clientX + ", " + dx + ", " + bounds.width)
    gsap.set("#"+id, {backgroundImage: `radial-gradient(circle at ${xPercent * 100}% ${yPercent * 100}%, #fff 10%, #000 10%)`})
    gsap.to("#"+id, {backgroundImage: `radial-gradient(circle at ${xPercent * 100}% ${yPercent * 100}%, #fff 100%, #000 100%)`, duration: 0.5, ease: "power4.out"})
  }

  function handleLeave(e: React.MouseEvent) {
    const bounds = e.currentTarget.getBoundingClientRect()
    const dx = bounds.left // distance from left border to button
    const dy = bounds.top
    const xPercent = (e.clientX - dx) / bounds.width
    const yPercent = (e.clientY - dy) / bounds.height
    gsap.killTweensOf("#"+id)
    gsap.to("#"+id, {ease: "circ.out", backgroundImage: `radial-gradient(circle at ${xPercent * 100}% ${yPercent * 100}%, #fff 0%, #000 0%)`, duration: 0.2})
  }

  return (
    <div
      id={id}
      className={`font-semibold border-white cursor-pointer`}
      style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, #fff 0%, #000 0%)",
        padding: `${size*6}px`,
        paddingLeft: `${size*16}px`,
        paddingRight: `${size*16}px`,
        borderRadius: `${size*18}px`,
        fontSize: `${size*16}px`,
        borderWidth: `${size/1.3*2}px`
      }}
      onMouseEnter={(e) => handleEnter(e)}
      onMouseLeave={(e) => handleLeave(e)}>
      <span style={{mixBlendMode: "difference"}}>{text}</span>
    </div>
  )
}
