"use client"
import Link from "next/link"
import React, {useRef, useState} from "react"
import Image from "next/image"
import {AnimatePresence, motion} from "motion/react"
import {getBackgroundColor} from "../data/getBackgroundColor"
import {useTheme} from "next-themes"
import {useGSAP} from "@gsap/react"
import gsap from "gsap"
import {ScrollTrigger, SplitText} from "gsap/all"

export default function Collection({title, description, data, categories}: {title: string; description: string; data: any[]; categories?: string[]}) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const {theme} = useTheme()
  const headerRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)

  gsap.registerPlugin(SplitText, ScrollTrigger)

  useGSAP(() => {
    if (!headerRef.current || !titleRef.current || !descriptionRef.current) return
    const titleSplit = new SplitText(titleRef.current, {type: "words, chars", mask: "chars"})
    const descriptionSplit = new SplitText(descriptionRef.current, {type: "words, chars", mask: "chars"})
    const scrollTrigger = {
      trigger: headerRef.current,
      start: "top 85%",
      once: false,
      toggleActions: "play none none reverse",
    }

    gsap.from(titleSplit.words, {opacity: 0, y: 10, stagger: 0.05, filter: "blur(12px)", ease: "back.inOut", scrollTrigger})
    gsap.from(descriptionSplit.words, {opacity: 0, y: 10, stagger: 0.05, filter: "blur(12px)", ease: "power4.inOut", delay: 0.3, scrollTrigger})

    return () => {
      titleSplit.revert()
      descriptionSplit.revert()
    }
  }, [])

  return (
    <section className="max-w-6xl w-full md:px-0 px-6 mx-auto flex flex-col">
      <div className="mt-32 mb-20 flex flex-col md:flex-row md:justify-between md:items-end">
        <div ref={headerRef}>
          <h1 ref={titleRef} className="text-5xl font-clash font-medium leading-tight">
            {title}
          </h1>
          <span ref={descriptionRef} className="text-white/70 light:text-black/70 font-light text-lg">
            {description}
          </span>
        </div>
        {categories && (
          <motion.div initial={{opacity: 0, scale: 0}} whileInView={{opacity: 1, scale: 1, transition: {delay: 0.3}}} viewport={{once: false, amount: 0.35, margin: "-10% 0px -10% 0px"}} className="flex md:gap-5 pt-10 md:pt-0">
            {["All", ...categories].map((category) => (
              <button onClick={() => setSelectedCategory(category)} key={category} className="relative md:px-6 px-4 py-2 rounded-full cursor-pointer">
                {category}
                {selectedCategory === category && (
                  <motion.div style={{borderRadius: 9999, boxShadow: "var(--inset_shadow)"}} transition={{type: "spring", stiffness: 420, damping: 24}} className="bg-white/10 light:bg-athensgray-light absolute inset-0 -z-1" layoutId="backGround_category" />
                )}
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
              <motion.div
                initial={{opacity: 0, scale: 0.5}}
                whileInView={{opacity: 1, scale: 1, transition: {duration: 1, type: "spring", delay: 0}}}
                viewport={{once: false}}
                exit={{opacity: 0, scale: 0.5, transition: {duration: 0.1}}}
                layoutId={project.title}
                key={project.title}>
                <Link href={project.link} className={`flex flex-col group md:hover:opacity-100 transition-opacity duration-300 ${index % 2 === 1 ? "md:translate-y-14" : ""}`}>
                  <div
                    className="rounded-3xl relative flex items-center aspect-3/2 justify-center mb-3 overflow-hidden"
                    style={{boxShadow: "var(--inset_shadow)", backgroundColor: theme == "light" ? getBackgroundColor(project.title, 98, 100) : getBackgroundColor(project.title, 8, 10)}}>
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
