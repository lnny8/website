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
    const pt = gsap.timeline({repeat: -1, yoyo: true})
    pt.set("#home-path", {drawSVG: "0%"})
    pt.to("#home-path", {duration: 4, drawSVG: "100%", ease: "power2.inOut"})
    pt.to("#home-path", {duration: 3, drawSVG: "10% 20%", ease: "power2.inOut"})
    pt.to("#home-path", {duration: 3, drawSVG: "80% 90%", ease: "power2.inOut"})
    pt.to("#home-path", {duration: 4, drawSVG: "0% 30%", ease: "power2.inOut"})
    pt.to("#home-path", {duration: 2, drawSVG: "0% 70%", ease: "power2.inOut"})
    pt.to("#home-path", {duration: 1, drawSVG: "50% 90%", ease: "power2.inOut"})
    pt.to("#home-path", {duration: 2, drawSVG: "20% 20%", ease: "power2.inOut"})

    gsap.from(t3.chars, {yPercent: 100, opacity: 1, duration: 0.5, ease: "back.out", stagger: 0.05, scrollTrigger: {trigger: "#home-t3", start: "top 90%"}})
    gsap.from("#home-projectblock", {y: 70, opacity: 0, duration: 1, ease: "back.inOut", stagger: 0.2, scrollTrigger: {trigger: "#home-s2", start: "top 85%"}})
  }, [])

 
  const skills = {
    "🧠 Programming Languages": ["JavaScript", "TypeScript", "Python", "Java", "HTML", "GLSL"],
    "🔧 Development": ["n8n", "Git", "Docker", "Hetzner Cloud", "coolify", "replicate", "Ubuntu"],
    "🔒 Security & Access": ["auth0", "HMAC", "JWT", "OAuth", "Stripe API", "Webhooks"],
    "🎨 Design": ["Webdesign", "Mobile Design", "Custom Tkinter", "Figma", "Blender"],
    "🧩 Frameworks": ["React", "Next.js", "Expo", "OpenCV", "Supabase"],
    "📚 Libraries": ["Three.js", "GSAP", "Motion", "TailwindCSS", "Pytorch (learning)"],
  }

  return (
    <main id="home-m" className="min-h-screen flex flex-col relative">
      <svg className="w-full absolute h-screen mx-auto" width="4104" height="2061" viewBox="0 0 4104 2061">
        <path
          id="home-path"
          d="M33.5 1419.5C17.3333 1663.67 104.2 2074.2 581 1763C1057.8 1451.8 894.5 1423 648 1258.5C401.5 1094 997.5 696 900.5 607.5C803.5 519 417 753.5 353 553C289 352.5 1304.5 8.49984 1453.5 32.9998C1602.5 57.4998 1697 294 1855 297.5C2013 301 2652 240 2630.5 334C2609 428 1754.5 589.499 1788 696C1821.5 802.5 2633.5 541 2752 571C2870.5 601 3436 1006 3567 945C3698 883.999 2995 495 3059 407C3123 319 3761.5 209.5 3834.5 297.5C3907.5 385.5 4102 1346.5 4068.5 1456C4035 1565.5 3275 1236.5 3317.5 1395C3360 1553.5 3423.5 1696.5 3509 1745C3594.5 1793.5 3737 1656.5 3798 1681C3859 1705.5 4114 1860.5 4035 1979C3956 2097.5 2916 1973 2837 1933.5C2758 1894 2530 1535 2560.5 1456C2591 1377 2837 1489 2837 1352.5C2837 1216 2019 1310 1821.5 1352.5C1624 1395 1721 1532 1526.5 1611C1332 1690 1134.5 1580.5 1134.5 1580.5"
          stroke="#111"
          strokeWidth="63"
        />
      </svg>

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
              <Card scrambleList={true} id={"home-skillblock"} key={category} skillList={skillList} title={category} />
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
          <Card id="random-Card-home" scrambleList={false} skillList={["React", "Tailwind CSS", "GSAP", "Framer Motion"]} title={"UI Components"} />
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
