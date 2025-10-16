"use client"
import Link from "next/link"
import React from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export default function Menu() {

  useGSAP(() => {
    gsap.from("nav", {y: -100, opacity: 0, ease: "back.out", duration: 1})
  })

  return (
    <nav className="fixed text-white w-full top-0 z-10 flex items-center p-7">
        <Link href="/" className="hover:opacity-60 transition-opacity"><Image src="/lenny/logo.svg" alt="Logo" width={50} height={50} /></Link>
        <Link href="/contact" className="ml-auto cursor-pointer bg-white text-black py-2 px-3 rounded-2xl">Get in touch</Link>
    </nav>
  )
}
