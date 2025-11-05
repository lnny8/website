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
import {ArrowLeft, ArrowRight} from "lucide-react"
import ImageTilt from "@/lib/ui/image-tilt"
import Blob from "@/lib/old"

export default function Page() {
  gsap.registerPlugin(ScrambleTextPlugin, SplitText, ScrollSmoother, ScrollTrigger, DrawSVGPlugin, ScrollToPlugin)

  useGSAP(() => {
    const t1 = new SplitText("#home-t1", {type: "words, chars", mask: "words"})
    const t2 = new SplitText("#home-t2", {type: "words, chars", mask: "chars"})
    const t3 = new SplitText("#home-t3", {type: "words, chars", mask: "chars"})
    const t5 = new SplitText("#home-t5", {type: "lines words, chars", mask: "lines"})
    const t6 = new SplitText("#home-t6", {type: "lines words, chars", mask: "lines"})
    const tl = gsap.timeline()
    tl.from("#home-gradient1", {opacity: 0, duration: 2}, 0)
    tl.from("#home-t4", {opacity: 0, duration: 1}, 0.3)
    tl.from(t1.chars, {yPercent: 100, opacity: 0, duration: 0.5, ease: "back.out", stagger: 0.05}, "<0.3")
    tl.from(t2.chars, {yPercent: 100, opacity: 0, duration: 0.3, ease: "back.out", stagger: {amount: 0.4}, delay: 0.3}, "<")
    tl.from(document.querySelectorAll("#home-spans span"), {yPercent: 100, opacity: 0, duration: 0.5, ease: "back.out", stagger: 0.1}, "<0.42")
    tl.from("#home-t7", {opacity: 0, y: 100, duration: 1}, "<")
    tl.from(t5.lines, {yPercent: 100, opacity: 1, duration: 0.5, ease: "back.out", stagger: 0.05}, "<")
    tl.from(t6.lines, {yPercent: 100, opacity: 1, duration: 0.3, ease: "back.out", stagger: {amount: 0.4}, delay: 0.3}, "<")
    tl.from("#home-sb", {y: 70, opacity: 0, duration: 1, stagger: 0.2, ease: "back.inOut"}, "-=1.4")
    // tl.from("#home-s1", {y: 0, opacity: 0, ease: "power2.inOut", duration: 2}, "-=1.4")

    // gsap.from(t3.chars, {yPercent: 100, opacity: 1, duration: 0.5, ease: "back.out", stagger: 0.05, scrollTrigger: {trigger: "#home-t3", start: "top 90%"}})
    // gsap.from("#home-projectblock", {y: 70, opacity: 0, duration: 1, ease: "back.inOut", stagger: 0.2, scrollTrigger: {trigger: "#home-s2", start: "top 85%"}})
  }, [])

  const skills = {
    "🧠 Programming Languages": ["JavaScript", "TypeScript", "Python", "Java", "HTML", "GLSL", "TSL"],
    "🔧 Development": ["n8n", "Git", "Docker", "Hetzner Cloud", "coolify", "replicate", "Ubuntu"],
    "🔒 Security & Access": ["auth0", "HMAC", "JWT", "OAuth", "Stripe API", "Webhooks"],
    "🎨 Design": ["Web- / Mobile Design", "Custom Tkinter", "Figma", "Blender", "TailwindCSS"],
    "🧩 Frameworks": ["React", "Next.js", "Expo", "OpenCV", "Supabase", "Three.js", "GSAP / motion"],
    "🤖 AI": ["Reinforcement Learning", "DQN", "Pytorch", "Monte Carlo method"],
  }

  return (
    <main id="home-m" className="relative min-h-screen overflow-hidden">
      <div id="home-gradient1" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_55%)]" />
      <div id="home-gradient2" className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.1),_transparent_60%)]" />

      {/* Hero */}
      <section className="relative px-6 pb-24 pt-32 sm:pt-40">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <span className="text-xs uppercase tracking-[0.5em] text-white/40" id="home-t4">
            Creative Engineer
          </span>
          <h1 id="home-t1" className="mt-8 text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl">
            Lenny Muffler
          </h1>
          <p id="home-t2" className="mt-6 max-w-2xl text-lg text-white/70 sm:text-2xl">
            Software developer crafting playful interfaces, reliable systems, and immersive web experiences.
          </p>
          <div id="home-spans" className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-white/60">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-colors duration-300 hover:border-white/30 hover:bg-white/10">Full-stack Product Builder</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-colors duration-300 hover:border-white/30 hover:bg-white/10">Real-time Interfaces</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-colors duration-300 hover:border-white/30 hover:bg-white/10">Simulation & AI</span>
          </div>
        </div>
      </section>

      {/* Knowledge */}
      <section id="home-s1" className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-white/40" id="home-t7">
              Knowledge Stack
            </span>
            <h2 id="home-t5" className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
              Tools I return to daily
            </h2>
            <p id="home-t6" className="mt-4 text-white/60">
              A concise overview of the languages, frameworks, and platforms I use to move ideas into production.
            </p>
          </div>
          <div id="test" className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([category, skillList]) => (
              <article id="home-sb" key={category} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-white/30 hover:bg-white/10">
                <h4 className="text-xl font-semibold tracking-tight">{category}</h4>
                <div className="flex flex-wrap gap-2 pt-5">
                  {skillList.map((item) => (
                    <span id="home-skillList-item" className="bg-white/5 items-center rounded-xl px-3 py-1" key={item}>
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
      <section id="home-s2" className="relative px-6 pb-32">
      {/* <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.12),_transparent_75%)]" /> */}
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-white/40">Projects</span>
            <h2 id="home-t3" className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
              Selected builds
            </h2>
            <p className="mt-4 text-white/60">Interactive experiments, client work, and personal tools that show how I combine motion, data, and polish.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link href={project.link} key={project.name} className="relative">
                <div id="home-projectblock" className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition duration-300 hover:border-white/30 hover:bg-white/10">
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

      {/* UI Components */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur">
          <div className="mx-auto max-w-3xl">
            <span className="text-xs uppercase tracking-[0.4em] text-white/40">UI Playground</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">Reusable components I refine</h2>
            <p className="mt-4 text-white/60">Micro-interactions and hover effects that make interfaces feel responsive without sacrificing clarity.</p>
          </div>
          <div className="relative mt-12 flex flex-col items-center gap-10">
            <div className="flex items-center gap-4 text-sm text-white/50">
              <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-neutral-900 px-4 py-2 transition hover:border-white/30 hover:text-white">
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-neutral-900 px-4 py-2 transition hover:border-white/30 hover:text-white">
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-2">
              {[true, false, false, false, false].map((current, index) => (
                <span key={index} className={`h-2 w-8 rounded-full ${current ? "bg-white/60" : "bg-white/20"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
