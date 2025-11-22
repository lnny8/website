"use client"
import React, {useEffect, useState} from "react"
import gsap from "gsap"
import {AnimatePresence, motion} from "motion/react"

const SECTIONS = [
  {name: "Start", link: "#start"},
  {name: "Knowledge", link: "#knowledge"},
  {name: "Projects", link: "#projects"},
  {name: "Tutorials", link: "#tutorials"},
]

export default function Indicator() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState<string>(SECTIONS[0].name)

  useEffect(() => {
    const menu = document.getElementById("menu-border")
    if (menu) {
      menu.style.opacity = ((scrollProgress - window.innerHeight * (3 / 4)) / (window.innerHeight / 4)).toString()
    }
  }, [scrollProgress])

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY
      const visibleSection = SECTIONS.find((section, index) => {
        const nextSection = SECTIONS[index + 1]
        const sectionElement = document.querySelector(section.link)
        const nextSectionElement = nextSection ? document.querySelector(nextSection.link) : null
        const sectionTop = sectionElement ? sectionElement.getBoundingClientRect().top + window.scrollY : 0
        const nextSectionTop = nextSectionElement ? nextSectionElement.getBoundingClientRect().top + window.scrollY : Infinity
        return scrollY >= sectionTop - 200 && scrollY < nextSectionTop - 200
      })

      setScrollProgress((prev) => (prev === scrollY ? prev : scrollY))
      if (visibleSection) {
        setCurrentSection((prev) => (prev === visibleSection.name ? prev : visibleSection.name))
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, {passive: true})
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="absolute flex-col items-start pl-10 pt-20 top-0 gap-3 hidden md:flex">
      {SECTIONS.map((section) => (
        <div key={section.name} className="flex items-center gap-3">
          <AnimatePresence mode="wait">{currentSection === section.name && <motion.div exit={{scale: 0.1}} transition={{duration: 0.3}} initial={{scale: 0.1}} animate={{scale: 1}}
          className="bg-white rounded-full size-2 absolute -translate-x-4" />}</AnimatePresence>
          <button
            onMouseEnter={(event) => {
              const underline = event.currentTarget.querySelector("div")
              gsap.to(underline, {scaleX: 1, transformOrigin: "left center", ease: "power2.out"})
            }}
            onMouseLeave={(event) => {
              const underline = event.currentTarget.querySelector("div")
              gsap.to(underline, {scaleX: 0, transformOrigin: "right center", ease: "power2.out"})
            }}
            onClick={() => gsap.to(window, {scrollTo: {y: section.link, offsetY: 200}, duration: 1, ease: "power2.out"})}
            className="text-[#bbb] hover:text-white transition-colors cursor-pointer">
            {section.name}
            <div className="w-full h-[2px] bg-white origin-left scale-x-0" />
          </button>
        </div>
      ))}
    </div>
  )
}
