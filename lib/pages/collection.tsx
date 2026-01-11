"use client"
import Link from "next/link"
import React, {useRef, useState} from "react"
import Image from "next/image"
import {AnimatePresence, motion} from "motion/react"
import {getBackgroundColor} from "../data/getBackgroundColor"
import {useTheme} from "next-themes"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"

export default function Collection({title, description, data, categories}: {title: string; description: string; data: any[]; categories?: string[]}) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const {theme} = useTheme()
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)

  gsap.registerPlugin(SplitText)

  useGSAP(() => {
    if(!titleRef.current || !descriptionRef.current) return
    const titleSplit = new SplitText(titleRef.current, {type: "words, chars", mask: "chars"})
    const descriptionSplit = new SplitText(descriptionRef.current, {type: "words, chars", mask: "chars"})
    gsap.from(titleSplit.chars, {opacity: 0, yPercent: 100, stagger: 0.02, ease: "back.inOut"})
    gsap.from(descriptionSplit.words, {opacity: 0, xPercent: 0, stagger: {amount: 0.2}, ease: "power4.inOut", delay: 0.3})
  }, [])
  
  return (
    <section className="max-w-7xl md:px-0 px-6 mx-auto flex flex-col">
      <div className="mt-32 mb-20 flex flex-col md:flex-row md:justify-between md:items-end">
        <div>
          <h1 ref={titleRef} className="md:text-6xl text-5xl font-clash font-semibold leading-tight">{title}</h1>
          <span ref={descriptionRef} className="text-white/70 light:text-black/70 font-light text-lg">{description}</span>
        </div>
        {categories && (
          <motion.div initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1, transition: {delay: 0.3}}} className="flex md:gap-5 pt-10 md:pt-0">
            {["All", ...categories].map((category) => (
              <button onClick={() => setSelectedCategory(category)} key={category} className="relative md:px-6 px-4 py-2 rounded-full cursor-pointer">
                {category}
                {selectedCategory === category && <motion.div style={{borderRadius: 9999}} transition={{type: "spring", stiffness: 420, damping: 24}} className="bg-white/10 light:bg-black/10 absolute inset-0 -z-1" layoutId="backGround_category" />}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      <div className="grid w-full md:grid-cols-2 gap-10 group/all md:has-[>a:hover]:[&>a:not(:hover)]:opacity-50">
        <AnimatePresence>
          {data
            .filter((item) => selectedCategory === "All" || item.category === selectedCategory)
            .map((project, index) => (
              <motion.div initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1, transition: {duration: 1, type: "spring", delay: index * 0.2 + 0.4}}} exit={{opacity: 0, scale: 0.5, transition: {duration: 0.1}}} layoutId={project.title} key={project.title}>
                <Link href={project.link} className={`flex flex-col group md:hover:opacity-100 transition-opacity duration-300 ${index % 2 === 1 ? "md:translate-y-14" : ""}`}>
                  <div className="rounded-3xl relative flex items-center aspect-3/2 justify-center mb-3 overflow-hidden" style={{backgroundColor: theme == "light" ? getBackgroundColor(project.title, 84, 50) : getBackgroundColor(project.title, 16, 10)}}>
                    <Image src={project.imageUrl} fill className="group-hover:scale-105 z-1 transition-transform duration-300" alt={"Image of " + project.description} />
                    <div
                      style={{
                        backgroundImage: `linear-gradient(150deg, transparent 40%, rgba(255,255,255,0.42) 50%, transparent 60%)`,
                        backgroundSize: "400% 100%",
                        backgroundPositionX: "400%",
                      }}
                      className="absolute inset-0 group-hover:animate-[shinenodelay_0.42s_linear]"
                    />
                  </div>
                  <span className="text-xl font-medium">{project.title}</span>
                  <span className="text-sm text-white/70 light:text-black/70 font-light flex items-center justify-between">
                    <span>{project.description}</span>
                    <span className="text-white/70 light:text-black/70 font-light">{project.date}</span>
                  </span>
                </Link>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
