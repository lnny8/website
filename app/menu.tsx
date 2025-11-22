"use client"
import Link from "next/link"
import React, {useEffect} from "react"
import gsap from "gsap"

export default function Menu() {
  const [scrollProgress, setScrollProgress] = React.useState(0)

  const sections = [
    {name: "Start", link: "#start"},
    {name: "Knowledge", link: "#knowledge"},
    {name: "Projects", link: "#projects"},
  ]

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.body.scrollHeight - window.innerHeight
      const scrolled = (scrollTop / docHeight) * 100
      setScrollProgress(scrolled)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const menu = document.getElementById("menu-border")
    const progressBar = document.getElementById("menu-progressbar")
    const currentSection = sections.find((section, index) => {
      const nextSection = sections[index + 1]
      const sectionElement = document.querySelector(section.link)
      const nextSectionElement = nextSection ? document.querySelector(nextSection.link) : null
      const sectionTop = sectionElement ? sectionElement.getBoundingClientRect().top + window.scrollY : 0
      const nextSectionTop = nextSectionElement ? nextSectionElement.getBoundingClientRect().top + window.scrollY : Infinity
      return window.scrollY >= sectionTop - 200 && window.scrollY < nextSectionTop - 200
    })
    let currentLight = document.querySelector(`#menu-light-${currentSection?.name}`) as HTMLElement | null
    let otherLights = sections.filter((section) => section.name !== currentSection?.name).map((section) => document.querySelector(`#menu-light-${section.name}`) as HTMLElement | null)
    if (menu) {
      menu.style.opacity = ((scrollProgress - 40) / 10).toString()
    }
    otherLights.forEach((light) => {
      if (light) {
        light.style.opacity = "0"
      }
    })
    if (currentLight) {
      currentLight.style.opacity = "1"
    }
    // if (progressBar) {
    //   progressBar.style.background = `linear-gradient(to right, #888 ${scrollProgress}%, rgba(255, 255, 255, 0) ${scrollProgress}%)`
    // }
  }, [scrollProgress])

  return (
    <nav className="fixed top-0 text-white w-full z-10">
      {/* <div id="menu-progressbar" className="absolute h-2 w-full" /> */}
      <div className="max-w-4xl md:mt-15 mt-10 mx-10 md:mx-0 md:right-1/2 md:translate-x-1/2 flex items-center justify-between">
        <div id="menu-border" className="absolute bg-black -z-1 inset-0 -inset-y-5 -inset-x-10 border-2 border-white/10 rounded-4xl" />
        <Link href="/">
          <span className="font-black text-[#555] tracking-widest">LENNY MUFFLER</span>
        </Link>
        <Link href="mailto:lenny@lenny.website" className="hover:bg-[#222] rounded-xl group p-2">
          <svg width="32" height="32" fill="none">
            <path
              className="group-hover:fill-white"
              fill="#555"
              fillRule="evenodd"
              d="M4.622 11.716C4.365 11.524 4 11.678 4 12v8a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5v-8c0-.322-.365-.476-.622-.284L18.4 18.45a4 4 0 0 1-4.8 0l-8.978-6.733zm.89-1.832c-.418-.313-.532-.903-.177-1.286A4.987 4.987 0 0 1 9 7h14c1.448 0 2.752.615 3.665 1.598.355.383.24.973-.176 1.286L17.2 16.85a2 2 0 0 1-2.4 0L5.511 9.884z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
      <div className="absolute flex-col items-start pl-10 pt-20 top-0 gap-3 hidden md:flex">
        {sections.map((section) => (
          <div key={section.name} className="flex items-center gap-3">
            <div id={`menu-light-${section.name}`} className="bg-white rounded-full size-2 opacity-0" />
            <button onClick={() => gsap.to(window, {scrollTo: {y: section.link, offsetY: 200}, duration: 1, ease: "power2.out"})} className="text-[#bbb] hover:text-white transition-colors cursor-pointer">
              {section.name}
            </button>
          </div>
        ))}
      </div>
    </nav>
  )
}
