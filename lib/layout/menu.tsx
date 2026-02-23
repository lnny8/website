"use client"

import React, {useEffect, useRef} from "react"
import Link from "next/link"
import {Moon, Sun} from "lucide-react"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import {useGSAP} from "@gsap/react"
import {SplitText} from "gsap/all"
import {useTheme} from "next-themes"
import {motion} from "motion/react"
import {usePathname} from "next/navigation"
import tabs from "@/lib/data/tabs"

export default function Menu() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const backgroundRef = useRef<HTMLDivElement | null>(null)
  const hoverData = useRef<Map<HTMLElement, {topSplit: SplitText; bottomSplit: SplitText; tl?: gsap.core.Timeline}>>(new Map())
  const {theme, setTheme} = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const pathname = usePathname()

  gsap.registerPlugin(ScrollTrigger, SplitText)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if(theme) initScollAnimation(theme)
  }, [theme])

  function initScollAnimation(theme: string) {
    if (!containerRef.current) return
    if (!backgroundRef.current) return
    gsap.killTweensOf(containerRef.current)
    gsap.killTweensOf(backgroundRef.current)
    gsap.fromTo(
      containerRef.current,
      {maxWidth: "80rem", paddingInline: "0rem"},
      {
        maxWidth: "46rem",
        paddingInline: "1.5rem",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "+=240",
          scrub: true,
        },
      },
    )
    gsap.fromTo(
      backgroundRef.current,
      {opacity: 0},
      {
        opacity: 1,
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "+=240",
          scrub: true,
        },
      },
    )
  }

  function handleLinkHover(e: React.MouseEvent) {
    const link = e.currentTarget as HTMLElement
    const topText = link.querySelector(".text-top") as HTMLElement
    const bottomText = link.querySelector(".text-bottom") as HTMLElement
    if (!topText || !bottomText) return

    let data = hoverData.current.get(link)
    if (!data) {
      const topSplit = new SplitText(topText, {type: "chars", mask: "chars"})
      const bottomSplit = new SplitText(bottomText, {type: "chars", mask: "chars"})
      data = {topSplit, bottomSplit}
      hoverData.current.set(link, data)
    }

    data.tl?.kill()
    gsap.set(bottomText, {display: "block"})

    const tl = gsap.timeline()
    tl.set(data.bottomSplit.chars, {yPercent: 100, opacity: 0})
    tl.to(data.bottomSplit.chars, {yPercent: 0, duration: 0.4, opacity: 1, ease: "power2.out", stagger: 0.01}, 0)
    tl.to(data.topSplit.chars, {yPercent: -100, duration: 0.4, opacity: 0, ease: "power2.out", stagger: 0.01}, 0)
    data.tl = tl
  }

  function handleLinkLeave(e: React.MouseEvent) {
    const link = e.currentTarget as HTMLElement
    const topText = link.querySelector(".text-top") as HTMLElement
    const bottomText = link.querySelector(".text-bottom") as HTMLElement
    if (!topText || !bottomText) return

    const data = hoverData.current.get(link)
    if (!data) return

    data.tl?.kill()
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(bottomText, {display: "none"})
      },
    })

    tl.to(data.topSplit.chars, {yPercent: 0, opacity: 1, stagger: 0.01, duration: 0.4, ease: "power2.inOut"}, 0)
    tl.to(data.bottomSplit.chars, {yPercent: 100, opacity: 0, stagger: 0.01, duration: 0.4, ease: "power2.inOut"}, 0)
    data.tl = tl
  }

  async function handleThemeToggle() {
    if (!mounted) return
    const newTheme = theme === "dark" ? "light" : "dark"
    const button = containerRef.current?.querySelector("button") as HTMLButtonElement | null

    if (!button || typeof document.startViewTransition !== "function") {
      setTheme(newTheme)
      initScollAnimation(newTheme)
      return
    }

    const transition = document.startViewTransition(() => {
      setTheme(newTheme)
      initScollAnimation(newTheme)
    })

    await transition.ready

    const {top, left, width, height} = button.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(Math.max(left, window.innerWidth - left), Math.max(top, window.innerHeight - top))

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
      },
      {
        duration: 400,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    )
  }

  return (
    <nav className="w-full hidden md:flex fixed h-20 items-center justify-center z-10">
      <div ref={containerRef} className="w-full max-w-7xl flex items-center justify-between py-3 relative">
        <div ref={backgroundRef} className="bg-woodsmoke-light light:bg-athensgray-light rounded-2xl shadow-(--inset_shadow) opacity-0 absolute inset-0 -z-1" />
        <Link href="/" className="text-white font-clash light:text-black font-medium text-lg">
          LM
        </Link>
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <Link
              onMouseEnter={(e) => handleLinkHover(e)}
              onMouseLeave={(e) => handleLinkLeave(e)}
              key={tab.label}
              href={tab.link}
              className={`flex items-center justify-center gap-2 cursor-pointer relative ${pathname === tab.link ? "text-white light:text-black" : "text-white/70 light:text-black/70 hover:text-white light:hover:text-black"}`}>
              {pathname === tab.link && <motion.div initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}} className="rounded-full size-1.5 bg-lime" />}
              <span className="text-sm flex flex-col">
                <span className="text-top">{tab.label}</span>
                <span className="text-bottom absolute hidden">{tab.label}</span>
              </span>
            </Link>
          ))}
        </div>
        <motion.button animate={mounted ? {rotate: theme === "dark" ? 0 : 90, transition: {duration: 0.5, type: "spring"}} : {rotate: 0}} whileTap={{scale: 0.9}} className="cursor-pointer" onClick={handleThemeToggle}>
          {mounted ? theme === "dark" ? <Moon className="size-5 text-white/70 hover:text-white transition-all duration-300" /> : <Sun className="size-5 text-black/70 hover:text-black transition-all duration-300" /> : <span className="block size-5" />}
        </motion.button>
      </div>
    </nav>
  )
}
