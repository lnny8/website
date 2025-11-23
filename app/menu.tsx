"use client"
import Link from "next/link"
import React, {useEffect, useState} from "react"
import gsap from "gsap"

export default function Menu() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const menu = document.getElementById("menu-border")
    if (menu) {
      menu.style.opacity = (scrollProgress / 100).toString()
    }
  }, [scrollProgress])

  useEffect(() => {
    function handleScroll() {
      setScrollProgress((prev) => (prev === scrollY ? prev : scrollY))
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, {passive: true})
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav className="fixed top-0 text-white w-full z-10" aria-label="Primary">
      <div className="2xl:max-w-6xl xl:max-w-4xl lg:max-w-2xl md:max-w-md md:mt-15 mt-10 mx-10 md:mx-auto flex items-center justify-between relative">
        <div id="menu-border" className="mx-auto absolute bg-black -z-1 inset-0 -inset-y-5 -inset-x-10 border-2 border-white/10 rounded-4xl" />
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
    </nav>
  )
}
