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
import {image} from "motion/react-client"
import FillButton from "./tutorials/fill-button/fill-button"
import {ArrowRight} from "lucide-react"
import HorizontalScroll from "./tutorials/horizontal-scroll/horizontalScroll"
import Blob from "./tutorials/blob/blob"
import Background from "@/lib/bg"

export default function Page() {
  gsap.registerPlugin(ScrambleTextPlugin, SplitText, ScrollSmoother, ScrollTrigger, DrawSVGPlugin, ScrollToPlugin)

  const sections = [
    {name: "Start", link: "#start"},
    {name: "Knowledge", link: "#knowledge"},
    {name: "Projects", link: "#projects"},
    {name: "Tutorials", link: "#tutorials"},
  ]

  const tutorials = [
    {
      title: "Horizontal Scroll with GSAP",
      description: "Learn how to create stunning horizontal scroll animations using GSAP and ScrollTrigger in this step-by-step tutorial.",
      link: "/tutorials/horizontal-scroll",
      image: "/tutorials/horizontal-scroll.png",
    },
    {title: "3D Letters", description: "Create interactive 3D letters with Three.js and React Three Fiber.", link: "/tutorials/3d-letters", image: "/tutorials/horizontal-scroll.png"},
  ]

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
      <Background />
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
              <article
                key={category}
                className="relative backdrop-blur-lg overflow-hidden rounded-3xl bg-white/5 border-1 border-white/10 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                <h4 className="text-xl font-semibold tracking-tight">{category}</h4>
                <div className="flex flex-wrap gap-2 pt-5">
                  {skillList.map((item) => (
                    <span className="bg-white/5 items-center rounded-xl px-3 py-1" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
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
                <div className="group bg-white/5 relative overflow-hidden rounded-3xl border-1 border-white/10 p-5 backdrop-blur-lg transition duration-300 hover:border-white/20 hover:bg-white/10">
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
        <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl text-center">Useful tutorials</h2>
        <p className="mt-4 text-white/60 text-center">Dive into hands-on guides covering animation, shaders, and UI polish so you can adapt the techniques immediately in your own builds.</p>
        <div className="grid grid-cols-2 gap-8 w-full max-w-7xl mx-auto mt-12">
          <article className="rounded-4xl w-full h-full transition-all duration-300 bg-white/5 hover:border-white/20 hover:bg-white/10 border border-white/10 backdrop-blur-lg p-8 flex flex-col gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Featured tutorial</p>
              <h3 className="text-2xl font-semibold mt-2">Liquid Button</h3>
              <p className="text-white/70">Build a radial-fill hover effect powered by GSAP and layered gradients. Perfect for call-to-action buttons that feel alive.</p>
            </div>
            <div className="w-full">
              <span className="text-sm text-white/60">Demo</span>
              <div className="mt-4 rounded-3xl border border-white/10 bg-white/5  px-10 py-12 flex items-center justify-center">
                <FillButton text="Hover me" />
              </div>
            </div>
            <Link href="/tutorials/fill-button" className="text-sm group uppercase tracking-[0.3em] text-white/80 hover:text-white">
              Read tutorial <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-3 transition-transform duration-300" />
            </Link>
          </article>

          <article className="rounded-4xl row-span-2 w-full h-full transition-all duration-300 bg-white/5 hover:border-white/20 hover:bg-white/10 border border-white/10 backdrop-blur-lg p-8 flex flex-col gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Featured tutorial</p>
              <h3 className="text-2xl font-semibold mt-2">Horizontal Scroll</h3>
              <p className="text-white/70">Learn how to craft seamless horizontal scroll experiences with GSAP's ScrollTrigger and smart layout math.</p>
            </div>
            <div className="w-full h-full">
              <span className="text-sm text-white/60">Demo</span>
              <div className="mt-4 relative w-full h-full rounded-3xl border border-white/10 bg-white/5 px-10 py-12 flex items-center justify-center">
                <HorizontalScroll />
              </div>
            </div>
            <Link href="/tutorials/horizontal-scroll" className="pt-10 text-sm group uppercase tracking-[0.3em] text-white/80 hover:text-white">
              Read tutorial <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-3 transition-transform duration-300" />
            </Link>
          </article>

          <article className="rounded-4xl w-full h-full transition-all duration-300 bg-white/5 hover:border-white/20 hover:bg-white/10 border border-white/10 backdrop-blur-lg p-8 flex flex-col gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Featured tutorial</p>
              <h3 className="text-2xl font-semibold mt-2">WebGPU Blob Shader</h3>
              <p className="text-white/70">Learn how to craft seamless horizontal scroll experiences with GSAP’s ScrollTrigger and smart layout math.</p>
            </div>
            <div className="w-full">
              <span className="text-sm text-white/60">Demo</span>
              <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 px-10 py-12 flex items-center justify-center">
                <Suspense fallback={"loading..."}>
                  <Blob />
                </Suspense>
              </div>
            </div>
            <Link href="/tutorials/fill-button" className="text-sm group uppercase tracking-[0.3em] text-white/80 hover:text-white">
              Read tutorial <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-3 transition-transform duration-300" />
            </Link>
          </article>



          <article className="rounded-4xl w-full h-full col-span-2 transition-all duration-300 bg-white/5 hover:border-white/20 hover:bg-white/10 border border-white/10 backdrop-blur-lg p-8 flex flex-col gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Featured tutorial</p>
              <h3 className="text-2xl font-semibold mt-2">Big Tutorial</h3>
              <p className="text-white/70">Learn how to craft seamless horizontal scroll experiences with GSAP’s ScrollTrigger and smart layout math.</p>
            </div>
            <div className="w-full">
              <span className="text-sm text-white/60">Demo</span>
              <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 px-10 py-12 flex items-center justify-center">
                <Suspense fallback={"loading..."}>
                  <Blob />
                </Suspense>
              </div>
            </div>
            <Link href="/tutorials/fill-button" className="text-sm group uppercase tracking-[0.3em] text-white/80 hover:text-white">
              Read tutorial <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-3 transition-transform duration-300" />
            </Link>
          </article>
        </div>
      </section>
    </main>
  )
}
