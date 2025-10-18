"use client"
import React from "react"
import gsap from "gsap"
import {PointerEvent as ReactPointerEvent} from "react"

export default function Card({skillList, title, id, scrambleList = false}: {skillList: string[]; title: string; id: string; scrambleList: boolean}) {
  function updateCardGradient(target: HTMLDivElement, e: ReactPointerEvent<HTMLDivElement>, duration = 0.3) {
    const rect = target.getBoundingClientRect()
    const pointerX = e.clientX - rect.left
    const pointerY = e.clientY - rect.top
    const background = target.querySelector<HTMLElement>("#home-card-bg")
    if (!background) return

    gsap.to(background, {
      backgroundImage: `radial-gradient(circle at ${pointerX}px ${pointerY}px, #22c55e 0%, #000 100%)`,
      opacity: 1,
      duration,
      overwrite: "auto",
    })
  }

  function handleCardEnter(e: ReactPointerEvent<HTMLDivElement>) {
    updateCardGradient(e.currentTarget, e, 0.6)

    const skillItems = e.currentTarget.querySelectorAll("#home-skillList-item")
    const skillListTween = gsap.getTweensOf(skillItems)
    if (skillListTween.length === 0 && scrambleList) {
      gsap.to(skillItems, {scrambleText: {text: "{original}", chars: "lowerCase", revealDelay: 0, speed: 0.3}, duration: 1, ease: "power2.inOut", stagger: 0.1})
    }
  }
  function handleCardMove(e: ReactPointerEvent<HTMLDivElement>) {
    updateCardGradient(e.currentTarget, e, 0.2)
  }
  function handleCardLeave(e: ReactPointerEvent<HTMLDivElement>) {
    const background = e.currentTarget.querySelector("#home-card-bg")
    if (!background) return
    gsap.killTweensOf(background)
    gsap.to(background, {backgroundImage: "radial-gradient(circle at 0px 0px, #22c55e 0%, #000 100%)", opacity: 0, duration: 0.5})
  }

  return (
    <div id={id} className="max-w-100 group relative border-neutral-800 border-1 rounded-[16px] p-5" onPointerEnter={handleCardEnter} onPointerMove={handleCardMove} onPointerLeave={handleCardLeave}>
      <div id="home-card-bg" style={{backgroundImage: "radial-gradient(circle at 0px 0px, #22c55e 0%, #000 100%)"}} className="absolute -inset-[1px] rounded-[16px] -z-5 opacity-0 blur-sm" />
      <div className="absolute inset-0 bg-neutral-950 -z-4 rounded-[16px]" />
      <h3 className="text-lg sm:text-xl font-semibold tracking-wide text-white/90 cursor-pointer">{title}</h3>
      <div className="my-4 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

      <div className="flex flex-wrap gap-2">
        {skillList.map((skill) => (
          <span id="home-skillList-item" className="cursor-pointer bg-white/5 items-center rounded-xl px-3 py-1" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
