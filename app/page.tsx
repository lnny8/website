import {ArrowUpRight, Hand, Sparkle} from "lucide-react"
import Link from "next/link"
import React from "react"
import HoverButton from "./tutorials/hover-button/button"

import Marquee from "@/lib/marquee"
import { useGSAP } from "@gsap/react"
import AnimationText from "@/lib/animation-text"

export default function Page() {
  const socialLinks = [
    {name: "LinkedIn", url: "https://linkedin.com/in/lennymuffler"},
    {name: "GitHub", url: "https://github.com/lnny8"},
    {name: "Instagram", url: "https://instagram.com/lnny.8"},
    {name: "Gmail", url: "mailto:lennymuffler@gmail.com"},
  ]

  return (
    <main className="bg-woodsmoke light:bg-athensgray light:text-black min-h-screen w-full">
      <section className="max-w-7xl mx-auto pt-40">
        <h1 className="pb-8 flex gap-3">
          <Hand className="text-lime animate-wave" style={{transformOrigin: "75% 75%"}} />
          Hey! It's me, Lenny
        </h1>

        <h2 className="text-7xl font-clash font-medium">
          Crafting{" "}
          <span className="bg-gradient-to-r from-lime to-blue-400 bg-clip-text text-transparent">
            purpose driven experiences
          </span>{" "}
          that inspire <br />& engage
        </h2>

        <div className="flex items-center justify-center gap-15 mt-10">
          <div className="w-1/2 bg-white/10 light:bg-black/10 h-0.25" />
          <div className="w-1/2 h-full flex items-center justify-center text-white/60 light:text-black/60">I work with brands globally to build pixel-perfect, engaging, and accessible digital experiences that drive results and achieve business goals.</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2 font-light group mt-10">
            {socialLinks.map((link) => (
              <Link key={link.name} href={link.url} className="flex gap-2 items-center justify-center text-white/70 group-hover:text-white/40 hover:text-white/70 light:text-black/70 light:group-hover:text-black/40 light:hover:text-black/70" target="_blank">
                <span>{link.name.toUpperCase()}</span>
                <ArrowUpRight className="size-4" />
              </Link>
            ))}
          </div>

          <div className="w-42 h-12 mt-10 relative">
            <HoverButton text1="Know me better" text2="About me" />
          </div>
        </div>
      </section>

      <Marquee />

      <section className="max-w-7xl mx-auto flex flex-col items-center mt-20">
        <h1 className="text-lime flex gap-3 text-sm font-light tracking-wider items-center justify-center font-clash ">
          <Sparkle className="size-4" />
          ABOUT ME
        </h1>
        <AnimationText />
      </section>
    </main>
  )
}
