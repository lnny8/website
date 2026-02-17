"use client"
import {experienceCategories, imageSections} from "@/lib/data/data"
import React, { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import { motion } from "motion/react"

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
    <main className="pt-32 max-w-7xl mx-auto px-6 md:px-0">
      <h1 ref={titleRef} className="text-6xl leading-tight font-clash font-semibold">Expertise</h1>
      <h2 ref={descriptionRef} className="text-white/70 light:text-black/70 font-light text-lg">All of my knowledge in one place</h2>

      <div className="grid grid-cols-2 gap-6 pt-10">
        {experienceCategories.map((category, index) => (
          <motion.div  initial={{opacity: 0, y: 120}} animate={{opacity: 1, y: 0, transition: {duration: 1, type: "spring", delay: index * 0.1 + 0.4}}} className="shadow-(--inset_shadow) border-white/5 light:border-black/5 bg-white/5 light:bg-black/5 cursor-pointer rounded-3xl p-6" key={category.title}>
            <h3 className="font-semibold font-clash text-2xl">{category.title}</h3>
            <p className="text-white/70 light:text-black/70 font-light pb-10">{category.description}</p>
            <div className="flex gap-x-6 gap-y-2 flex-wrap">
              {category.items.map((item) => (
                <div className="" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {imageSections.map((section, idx) => (
        <section
          key={section.title}
          className="sticky top-24 z-10 px-6 md:px-0 mt-24 bg-woodsmoke-light rounded-4xl shadow-(--inset_shadow) p-10!"
          style={{ zIndex: idx + 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-clash font-semibold mb-4">{section.title}</h2>
          <p className="text-lg text-white/70 light:text-black/70 mb-8 max-w-2xl">{section.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {section.images.map((img, imgIdx) => (
              <div key={imgIdx} className="relative aspect-3/2 group rounded-2xl overflow-hidden cursor-pointer bg-white/5 light:bg-black/5 border border-white/10 light:border-black/10 shadow-(--inset_shadow)">
                <Image src={img} alt={`${section.title} ${imgIdx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
