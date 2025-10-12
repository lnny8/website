import Link from "next/link"
import React from "react"
import Image from "next/image"

export default function Menu() {

  return (
    <nav className="fixed text-white w-full top-0 z-10 flex items-center p-7">
        <Link href="/" className="hover:opacity-80"><Image src="/lenny/logo.svg" alt="Logo" width={50} height={50} /></Link>
        <Link href="/contact" className="ml-auto cursor-pointer bg-white text-black py-2 px-3 rounded-2xl">Get in touch</Link>
    </nav>
  )
}
