"use client"
import MoreSoon from "@/lib/components/moreSoon"
import {about} from "@/lib/data/data"
import {useGSAP} from "@gsap/react"
import Image from "next/image"
import React, { useRef } from "react"
import { SplitText } from "gsap/all"
import gsap from "gsap"

export default function Page() {

  const titleRef = useRef(null)
  const descriptionRef = useRef(null)

  gsap.registerPlugin(SplitText)

  useGSAP(() => {
    if (!titleRef.current || !descriptionRef.current) return
    const titleSplit = new SplitText(titleRef.current, {type: "words, chars", mask: "chars"})
    const descriptionSplit = new SplitText(descriptionRef.current, {type: "words, chars", mask: "chars"})
    gsap.from(titleSplit.chars, {opacity: 0, yPercent: 100, stagger: 0.02, ease: "back.inOut"})
    gsap.from(descriptionSplit.words, {opacity: 0, xPercent: 0, stagger: {amount: 0.2}, ease: "power4.inOut", delay: 0.3})
  }, [])
  
  return (
    <main className="min-h-screen max-w-7xl mx-auto w-full pb-24">
      <section className="pt-32 px-6 md:px-0">
        <h1 className="text-6xl font-clash font-semibold leading-tight mb-6">About me</h1>
        <p className="text-xl text-white/80 light:text-black/80 leading-relaxed">
          Hi, I'm Lenny Muffler, a 17-year-old high school student from Stuttgart, Germany with a passion for technology and creativity. From building web applications to designing hardware prototypes, I love exploring new ways to bring ideas to life through code and design. When
          I'm not coding, you can find me tinkering with 3D modeling or experimenting with automation workflows. I'm always eager to learn and take on new challenges in the tech world.
        </p>
      </section>

      <section className="px-6 md:px-0 mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 pb-12">
        {about.map((item) => (
          <div key={item.title} className="rounded-3xl shadow-(--inset_shadow) bg-woodsmoke-light light:bg-athensgray-light p-4 flex flex-col items-center text-center gap-3">
            <div className="text-3xl">{item.icon}</div>
            <h3 className="text-xl font-clash font-semibold">{item.description}</h3>
            <p className="text-white/70 light:text-black/70 text-sm capitalize">{item.title}</p>
          </div>
        ))}
      </section>

      <MoreSoon />
    </main>
  )
}
