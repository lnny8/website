"use client"
import Link from "next/link"
import React from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import FillButton from "@/lib/ui/fill-button"

export default function Menu() {

  useGSAP(() => {
    gsap.from("#menu-logo", {x: -100, opacity: 0, ease: "back.out", duration: 1})
    gsap.from("#menu-link", {y: -100, opacity: 0, ease: "back.out", duration: 1})
  })

  return (
    <nav className="fixed text-white w-full top-0 z-10 flex items-center p-7" >
        <Link id="menu-logo" href="/" className="hover:opacity-60 transition-opacity">
          <Image src="/lenny/logo.svg" className="hover:-rotate-12 transition-transform hover:scale-110" alt="Logo" width={50} height={50} />
        </Link>
        <Link id="menu-link" href="/contact" className="ml-auto relative"><FillButton text="Get in touch" /></Link>
        
    </nav>
  )
}
