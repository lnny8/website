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
import Image from "next/image"
import Card from "@/lib/ui/magic-card"
import {ArrowLeft, ArrowRight} from "lucide-react"
import ImageTilt from "@/lib/ui/image-tilt"

export default function Page() {
  gsap.registerPlugin(ScrambleTextPlugin, SplitText, ScrollSmoother, ScrollTrigger, DrawSVGPlugin, ScrollToPlugin)

  useGSAP(() => {
    const t1 = new SplitText("#home-t1", {type: "words, chars", mask: "words"})
    const t2 = new SplitText("#home-t2", {type: "words, chars", mask: "chars"})
    const t3 = new SplitText("#home-t3", {type: "words, chars", mask: "chars"})
    const tl = gsap.timeline()
    tl.from(t1.chars, {yPercent: 100, opacity: 1, duration: 0.5, ease: "back.out", stagger: 0.05}, 0)
    tl.from(t2.chars, {yPercent: 100, opacity: 1, duration: 0.3, ease: "back.out", stagger: {amount: 0.4}, delay: 0.3}, 0)
    tl.from("#home-s1", {y: 0, opacity: 0, ease: "power2.inOut", duration: 2}, "-=1.4")
    tl.from("#home-skillblock", {y: 70, opacity: 0, ease: "back.inOut", duration: 1, stagger: 0.2}, "<0.6")

    gsap.from(t3.chars, {yPercent: 100, opacity: 1, duration: 0.5, ease: "back.out", stagger: 0.05, scrollTrigger: {trigger: "#home-t3", start: "top 90%"}})
    gsap.from("#home-projectblock", {y: 70, opacity: 0, duration: 1, ease: "back.inOut", stagger: 0.2, scrollTrigger: {trigger: "#home-s2", start: "top 85%"}})
  }, [])

 
  const skills = {
    "🧠 Programming Languages": ["JavaScript", "TypeScript", "Python", "Java", "HTML", "GLSL", "TSL"],
    "🔧 Development": ["n8n", "Git", "Docker", "Hetzner Cloud", "coolify", "replicate", "Ubuntu"],
    "🔒 Security & Access": ["auth0", "HMAC", "JWT", "OAuth", "Stripe API", "Webhooks"],
    "🎨 Design": ["Webdesign", "Mobile Design", "Custom Tkinter", "Figma", "Blender"],
    "🧩 Frameworks": ["React", "Next.js", "Expo", "OpenCV", "Supabase"],
    "📚 Libraries": ["Three.js", "GSAP", "Motion", "TailwindCSS", "Pytorch (learning)"],
  }

  return (
    <main id="home-m" className="min-h-screen flex flex-col relative">
      {/* Hero */}
      <div className="h-screen flex flex-col items-center justify-center -translate-y-10">
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
              <Card color="#fff" scrambleList={false} id={"home-skillblock"} key={category} skillList={skillList} title={category} />
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
                   <ImageTilt picture={project.picture} name={project.name} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-center pt-50 pb-32 text-3xl sm:text-5xl font-bold tracking-tight">My UI Components</h2>
        <div className="relative min-h-100 flex flex-col items-center justify-center mx-auto max-w-7xl bordfer-1">
          <h1 className="text-4xl font-bold tracking-tight pb-10">Magic Card</h1>
          <Card color="#fff" id="random-Card-home" scrambleList={false} skillList={["React", "Tailwind CSS", "GSAP", "Framer Motion"]} title={"UI Components"} />
          <button className="cursor-pointer absolute right-20 bg-neutral-900 p-4 rounded-2xl top-1/2 transform -translate-y-1/2">
            <ArrowRight />
          </button>
          <button className="cursor-pointer absolute left-20 bg-neutral-900 p-4 rounded-2xl top-1/2 transform -translate-y-1/2">
            <ArrowLeft />
          </button>
          {/* Indicators */}
          <div className="flex space-x-2 mt-4 absolute bottom-10">
            {[true, false, false, false, false].map((current, index) => (
              <span key={index} className={`w-3 h-3 rounded-full block ${current ? "bg-white/50" : "bg-white/20"}`}></span>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
