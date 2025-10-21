"use client"
import Link from "next/link"
import React from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import FillButton from "@/lib/ui/fill-button"

export default function Menu() {

  useGSAP(() => {
    gsap.from("#menu-logo", {y: -100, opacity: 0, ease: "back.out", duration: 1})
    gsap.from("#menu-link", {y: -100, opacity: 0, ease: "back.out", duration: 1})
  })

  return (
    <nav className="fixed text-white w-full top-0 z-10 flex items-center p-7" >
        {/* <div className="absolute inset-0 -z-1 backdrop-blur-3xl bg-black" style={{maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.7), rgba(0,0,0,0))"}} /> */}
        <Link id="menu-logo" href="/" className="hover:opacity-60 transition-opacity">
          {/* <span className="tracking-tight text-xl font-bold">Lenny</span> */}
          <Image src="/lenny/logo.svg" alt="Logo" width={50} height={50} />
        </Link>
        <Link id="menu-link" href="/contact" className="ml-auto relative"><FillButton text="Get in touch" /></Link>
        
    </nav>
  )
}
