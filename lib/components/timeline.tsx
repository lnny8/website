"use client"
import {useScroll, useTransform, motion} from "motion/react"
import React, {useEffect, useRef, useState} from "react"
import {useGSAP} from "@gsap/react"
import gsap from "gsap"
import {ScrollTrigger, SplitText} from "gsap/all"

interface TimelineEntry {
  title: string
  content: React.ReactNode
}

export const Timeline = ({data}: {data: TimelineEntry[]}) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const [height, setHeight] = useState(0)

  gsap.registerPlugin(SplitText, ScrollTrigger)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  useGSAP(
    () => {
      if (!containerRef.current || !headingRef.current || !descriptionRef.current) return

      const headingSplit = new SplitText(headingRef.current, {type: "words"})
      const descriptionSplit = new SplitText(descriptionRef.current, {type: "words"})

      gsap.from(headingSplit.words, {
        opacity: 0,
        y: 10,
        filter: "blur(12px)",
        stagger: 0.05,
        duration: 0.6,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play reverse restart reverse",
        },
      })

      gsap.from(descriptionSplit.words, {
        opacity: 0,
        y: 10,
        filter: "blur(12px)",
        stagger: 0.03,
        duration: 0.6,
        ease: "power4.out",
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 85%",
          toggleActions: "play reverse restart reverse",
        },
      })

      gsap.from(".timeline-item", {
        opacity: 0,
        y: 12,
        filter: "blur(12px)",
        stagger: 0.12,
        duration: 0.7,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play reverse restart reverse",
        },
      })

      return () => {
        headingSplit.revert()
        descriptionSplit.revert()
      }
    },
    {scope: containerRef},
  )

  return (
    <div className="w-full" ref={containerRef}>
      <div className="max-w-6xl mx-auto py-20 px-4">
        <h2 ref={headingRef} className="md:text-5xl text-3xl font-clash mb-4 font-medium light:text-black text-white">
          Changelog from my journey
        </h2>
        <p ref={descriptionRef} className="text-white/70 light:text-black/70 font-light text-lg">
          My personal timeline of growth, learning, and milestones in the world of technology, creativity, and self-discovery. A reflection of my journey, highlighting key moments, achievements, and lessons learned along the way.
        </p>
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="timeline-item flex justify-start pt-10 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-woodsmoke-light light:bg-athensgray-light shadow-(--inset_shadow) flex items-center justify-center"></div>
              <h3 className="hidden md:block font-clash text-xl md:pl-20 md:text-5xl font-medium text-neutral-500 dark:text-neutral-500 ">{item.title}</h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">{item.title}</h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-0.5 bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-neutral-200 dark:via-neutral-700 to-transparent to-99% mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] ">
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-0.5 bg-linear-to-t from-purple-500 via-blue-500 to-transparent from-0% via-10% rounded-full"
          />
        </div>
      </div>
    </div>
  )
}
