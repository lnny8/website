import {Facebook, Instagram, Linkedin, Mail, Twitter, X} from "lucide-react"
import React from "react"
import Link from "next/link"
import HoverButton from "./tutorials/hover-button/button"

export default function Footer() {
  return (
    <footer className="w-full bg-woodsmoke pt-40">
      <div className="rounded-4xl bg-[#111116] w-full max-w-7xl mx-auto py-20 flex flex-col items-center justify-center">
        <div className="px-4 py-2 flex gap-3 items-center justify-center rounded-full bg-lime/10">
          <div className="rounded-full size-2 bg-lime animate-pulse" />
          <span className="text-sm">Available for work</span>
        </div>
        <span className="text-5xl max-w-md font-clash text-center mt-5">Let's create your next big idea</span>
        <div className="pt-10"><HoverButton text1="Contact Me" text2="Contact Me" /></div>
      </div>

      <div className="flex items-center justify-between max-w-7xl mx-auto py-10">
        <div>© 2024 Lenny Muffler. All rights reserved.</div>
        <div className="flex gap-4">
          <Link href="https://linkedin.com/in/lennymuffler" target="_blank" aria-label="LinkedIn">
            <Linkedin className="size-5 text-white/70 hover:text-white transition-all duration-300" />
          </Link>
          <Link href="github.com/lnny8" target="_blank" aria-label="GitHub">
            <X className="size-5 text-white/70 hover:text-white transition-all duration-300" />
          </Link>
          <Link href="https://instagram.com/lnny.8" target="_blank" aria-label="Instagram">
            <Instagram className="size-5 text-white/70 hover:text-white transition-all duration-300" />
          </Link>
          <Link href="mailto:lennymuffler@gmail.com" target="_blank" aria-label="Email">
            <Mail className="size-5 text-white/70 hover:text-white transition-all duration-300" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
