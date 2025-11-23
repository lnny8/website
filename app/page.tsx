"use client"
import gsap from "gsap"
import {useGSAP} from "@gsap/react"
import {ScrambleTextPlugin} from "gsap/ScrambleTextPlugin"
import {SplitText} from "gsap/SplitText"
import {ScrollSmoother} from "gsap/ScrollSmoother"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import {DrawSVGPlugin} from "gsap/DrawSVGPlugin"
import {ScrollToPlugin} from "gsap/ScrollToPlugin"
import {projects} from "../lib/projects"
import Link from "next/link"
import ImageTilt from "@/lib/ui/image-tilt"
import Name from "@/lib/name"
import Indicator from "./indicator"
import {Suspense} from "react"
import Image from "next/image"
import { p } from "motion/react-client"

export default function Page() {
  gsap.registerPlugin(ScrambleTextPlugin, SplitText, ScrollSmoother, ScrollTrigger, DrawSVGPlugin, ScrollToPlugin)

  const sections = [
    {name: "Start", link: "#start"},
    {name: "Knowledge", link: "#knowledge"},
    {name: "Projects", link: "#projects"},
    {name: "Tutorials", link: "#tutorials"},
  ]
  useGSAP(() => {
    const panels = gsap.utils.toArray<HTMLElement>("#tutorials .panel")
    if (!panels.length) return
    gsap.to(panels, {
      ease: "none",
      scrollTrigger: {
        trigger: "#tutorials",
        pin: panels[1],
        scrub: 0.5,
        end: "+=" + window.innerHeight,
      },
    })
  })

  const skills = {
    "🧠 Programming Languages": ["JavaScript", "TypeScript", "Python", "Java", "HTML", "GLSL", "TSL"],
    "🔧 Development": ["Linux", "Git", "n8n", "Caddy", "Docker", "Hetzner Cloud", "coolify", "replicate"],
    "🔒 Security & Access": ["auth0", "HMAC", "JWT", "SSL", "OAuth", "Stripe API", "Webhooks", "Caddy"],
    "🎨 Design": ["Web- / Mobile Design", "Custom Tkinter", "Figma", "Blender", "TailwindCSS"],
    "🧩 Frameworks": ["React", "Next.js", "Expo", "OpenCV", "Supabase", "Three.js", "GSAP / motion"],
    "🤖 AI": ["Reinforcement Learning", "DQN", "Pytorch", "Monte Carlo method"],
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="fixed z-10">
        <Indicator sections={sections} />
      </div>
      {/* Hero */}
      <section id="start" aria-label="Hero section with a big ASCII Art of the name Lenny from the author Lenny Muffler" className="relative w-screen overflow-hidden h-screen px-6f pb-24 pt-32 sm:pt-40 flex flex-col items-center justify-center">
        <Suspense fallback={"loading..."}>
          <Name />
        </Suspense>
      </section>

      {/* Knowledge */}
      <section id="knowledge" className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">Tools I return to daily</h2>
            <p className="mt-4 text-white/60">A concise overview of the languages, frameworks, and platforms I use to move ideas into production.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([category, skillList]) => (
              <article key={category} className="relative overflow-hidden rounded-3xl border-2 border-white/10 p-6 transition-colors duration-300 hover:border-white/20 hover:bg-white/5">
                <h4 className="text-xl font-semibold tracking-tight">{category}</h4>
                <div className="flex flex-wrap gap-2 pt-5">
                  {skillList.map((item) => (
                    <span className="bg-white/5 items-center rounded-xl px-3 py-1" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_65%)] opacity-0 transition duration-300 hover:opacity-100" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">Some cool projects</h2>
            <p className="mt-4 text-white/60">Interactive experiments, client work, and personal tools that show how I combine motion, data, and polish.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link href={project.link} key={project.name} className="relative">
                <div className="group relative overflow-hidden rounded-3xl border-2 border-white/10 p-5 backdrop-blur transition duration-300 hover:border-white/20 hover:bg-white/5">
                  <h3 className="text-lg sm:text-xl font-semibold tracking-wide text-white/90">{project.name}</h3>
                  <div className="my-4 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                  <div className="flex flex-wrap gap-2">
                    <ImageTilt picture={project.picture} name={project.name} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="tutorials" className="">
        <article className="panel border-2 bg-black border-white/20 max-w-5xl mx-auto rounded-4xl flex-col relative p-10 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">Horizontal Scroll Tutorial</h2>
          <p className="mt-4 mb-8 text-white/70">Learn how to create stunning scroll animations with GSAP and ScrollTrigger.</p>
          <Image src={"/tutorials/horizontal-scroll.png"} width={600} height={400} alt="" />
          <Link href="/tutorials/horizontal-scroll" className="mt-6 px-6 py-3 bg-white text-black rounded-full font-semibold uppercase tracking-[0.3em]">
            Read Tutorial
          </Link>
        </article>
        <article className="panel border-2 bg-black border-white/20 max-w-5xl mx-auto rounded-4xl flex-col relative p-10 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">Liquid Button Tutorial</h2>
          <Image src={"/tutorials/horizontal-scroll.png"} width={600} height={400} alt="" />
          <p className="mt-4 text-white/70">Learn how to create a liquid button effect using GSAP and SVG filters.</p>
          <Link href="/tutorials/liquid-button" className="mt-6 px-6 py-3 bg-white text-black rounded-full font-semibold uppercase tracking-[0.3em]">
            Read Tutorial
          </Link>
        </article>
        <article className="panel border-2 bg-black border-white/20 max-w-5xl mx-auto rounded-4xl flex-col relative p-10 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">Image Tilt Tutorial</h2>
          <p className="mt-4 text-white/70">Learn how to create an interactive image tilt effect using GSAP and React.</p>
          <Image src={"/tutorials/horizontal-scroll.png"} width={600} height={400} alt="" />
          <Link href="/tutorials/image-tilt" className="mt-6 px-6 py-3 bg-white text-black rounded-full font-semibold uppercase tracking-[0.3em]">
            Read Tutorial
          </Link>
        </article>
      </section>
    </main>
  )
}
