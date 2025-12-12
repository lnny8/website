import {ArrowUpRight, Hand, Sparkle} from "lucide-react"
import Link from "next/link"
import React from "react"
import HoverButton from "./tutorials/hover-button/button"

import Marquee from "@/lib/marquee"

export default function Page() {
  const socialLinks = [
    {name: "LinkedIn", url: "https://linkedin.com/in/lennymuffler"},
    {name: "GitHub", url: "https://github.com/lnny8"},
    {name: "Instagram", url: "https://instagram.com/lnny.8"},
    {name: "Gmail", url: "mailto:lennymuffler@gmail.com"},
  ]

  return (
    <main className="bg-woodsmoke min-h-screen w-full">
      <section className="max-w-7xl mx-auto pt-40">
        <h1 className="pb-8 flex gap-3">
          <Hand className="text-lime animate-wave" style={{transformOrigin: "75% 75%"}} />
          Hey! It's me, Lenny
        </h1>

        <h2 className="text-7xl font-clash">
          Crafting{" "}
          <span className="text-lime">
            purpose driven <br />
            experiences
          </span>{" "}
          that inspire <br />& engage
        </h2>

        <div className="flex items-center justify-center gap-15 mt-10">
          <div className="w-1/2 bg-white/10 h-0.25" />
          <div className="w-1/2 h-full flex items-center justify-center font-light text-sm text-white/50">I work with brands globally to build pixel-perfect, engaging, and accessible digital experiences that drive results and achieve business goals.</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2 font-light group mt-10">
            {socialLinks.map((link) => (
              <Link key={link.name} href={link.url} className="flex gap-2 items-center justify-center text-white/70 hover:text-white transition-all duration-300" target="_blank">
                <span>{link.name}</span>
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
        <h1 className="text-lime flex gap-3 text-sm font-light tracking-wider items-center justify-center">
          <Sparkle className="size-4" />
          ABOUT ME
        </h1>
        <p className="text-center text-3xl mt-10">
            I'm Lenny Muffler, Software Developer and Designer with over 2 years of experience.
            With strong focus on producing high quality & impactful digital experiences that drive results and achieve business goals.
            I specialize in creating user-centric designs and developing robust web applications.
            My passion lies in crafting seamless digital experiences that engage users and leave a lasting impression.
        </p>
      </section>
    </main>
  )
}
