"use client"
import gsap from "gsap"
import {useGSAP} from "@gsap/react"
import {ScrambleTextPlugin} from "gsap/ScrambleTextPlugin"
import {SplitText} from "gsap/SplitText"
import {ScrollSmoother} from "gsap/ScrollSmoother"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import {projects} from "../lib/projects"
import Link from "next/link"
import Image from "next/image"

export default function Page() {
  gsap.registerPlugin(ScrambleTextPlugin, SplitText, ScrollSmoother, ScrollTrigger)

  useGSAP(() => {
    const t1 = new SplitText("#home-t1", {type: "words, chars", mask: "words"})
    const t2 = new SplitText("#home-t2", {type: "words, chars", mask: "chars"})
    const t3 = new SplitText("#home-t3", {type: "words, chars", mask: "chars"})
    const tl = gsap.timeline()
    tl.from(t1.chars, {yPercent: 100, opacity: 1, duration: 0.5, ease: "back.out", stagger: 0.05}, 0)
    tl.from(t2.chars, {yPercent: 100, opacity: 1, duration: 0.3, ease: "back.out", stagger: {amount: 0.4}, delay: 0.3}, 0)
    tl.from("#home-s1", {y: 0, opacity: 0, ease: "power2.inOut", duration: 2}, "-=1.4")
    tl.from("#home-skillblock", {y: 70, opacity: 0, ease: "back.inOut", duration: 1, stagger: 0.2}, "<0.6")

    gsap.from(t3.chars, {yPercent: 100, opacity: 1, duration: 0.5, ease: "back.out",
      stagger: 0.05, scrollTrigger: {trigger: "#home-t3", start: "top 90%"}})
    gsap.from("#home-projectblock", {y: 70, opacity: 0, duration: 1, ease: "back.inOut", stagger: 0.2, scrollTrigger: {trigger: "#home-s2", start: "top 85%"}})
  }, [])

  const skills = {
    "🧠 Programming Languages": ["JavaScript", "TypeScript", "Python", "Java", "HTML", "GLSL"],
    "🔧 Development": ["n8n", "Git", "Docker", "Hetzner Cloud", "coolify", "replicate"],
    "🔒 Security & Access": ["auth0", "HMAC", "JWT", "OAuth", "Stripe API"],
    "🎨 Design": ["Webdesign", "Mobile Design", "Custom Tkinter", "Figma", "Blender"],
    "🧩 Frameworks": ["React", "Next.js", "Expo", "OpenCV", "supabase"],
    "📚 Libraries": ["Three.js", "GSAP", "Motion", "TailwindCSS", "Pytorch & PyBullet (learning)"],
  }

  return (
    <main id="home-m" className="min-h-screen flex flex-col reflative">
      {/* Hero */}
      <div className="h-screen flex flex-col items-center justify-center -translate-y-20">
        <h1 id="home-t1" className="text-center text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight">
          Lenny Muffler
        </h1>
        <p id="home-t2" className="text-center text-xl sm:text-2xl text-white/70 mt-4">
          software developer
        </p>
      </div>

      {/* Knowledge */}
      <section id="home-s1" className="-translate-y-60">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Knowledge</h2>
            <p className="mt-3 text-white/60 max-w-2xl mx-auto">A concise overview of the technologies and tools I use.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <div id="home-skillblock" key={category} className="group relative rounded-2xl p-5 border-1 border-white/10 bg-white/10 backdrop-blur-xl">
                <h3 className="text-lg sm:text-xl font-semibold tracking-wide text-white/90">{category}</h3>
                <div className="my-4 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span className="bg-white/5 items-center rounded-xl px-3 py-1" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="home-s2">
        <h2 id="home-t3" className="text-center pb-32 text-3xl sm:text-5xl font-bold tracking-tight">
          Projects
        </h2>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link href={project.link} key={project.name} className="relative">
                <div id="home-projectblock" key={project.name} className="group relative rounded-2xl p-5 border-1 border-white/10 bg-white/10 backdrop-blur-xl">
                  <h3 className="text-lg sm:text-xl font-semibold tracking-wide text-white/90">{project.name}</h3>
                  <div className="my-4 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

                  <div className="flex flex-wrap gap-2">
                    <Image src={project.picture} alt={project.name} width={500} height={500} className="rounded-xl hover:scale-105 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
