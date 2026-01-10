import {ArrowUpRight, Code, Code2, Hand, Pen, PenTool, Sparkle, SwatchBook} from "lucide-react"
import Link from "next/link"
import React, {Suspense} from "react"
import HoverButton from "@/lib/components/hoverButton"
import Marquee from "@/lib/components/marquee"
import AnimationText from "@/lib/components/animationText"
import Image from "next/image"
import Accordion from "@/lib/components/accordion"
import ShineText from "@/lib/components/shineText"
import {projects, selectedProjects} from "@/lib/data/data"
import Robot from "@/lib/robot/robot"

export default function Page() {
  const socialLinks = [
    {name: "LinkedIn", url: "https://linkedin.com/in/lennymuffler"},
    {name: "GitHub", url: "https://github.com/lnny8"},
    {name: "Instagram", url: "https://instagram.com/lnny.8"},
    {name: "Email", url: "mailto:lenny@lnny.dev"},
  ]

  const expertise = [
    {title: "Development", icon: <Code2 className="size-5" />, imageUrl: "/expertise/development.png", content: "Building responsive web applications with modern frameworks like React and Next.js. Creating interactive experiences that work seamlessly across all devices."},
    {title: "Hardware Design", icon: <PenTool className="size-5" />, imageUrl: "/expertise/design.png", content: "Designing and prototyping hardware solutions, from circuit boards to physical interfaces. Bringing digital concepts into the physical world."},
    {title: "3D Modeling", icon: <SwatchBook className="size-5" />, imageUrl: "/expertise/branding.png", content: "Creating detailed 3D models and prototypes using CAD software. Designing custom components for both digital visualization and 3D printing."},
  ]

  return (
    <main className="min-h-screen w-full">
      <section className="max-w-7xl mx-auto pt-40 px-6 md:px-0">
        <h1 className="pb-8 flex gap-3">
          <Hand className="text-lime animate-wave" style={{transformOrigin: "75% 75%"}} />
          Hey! I'm Lenny
        </h1>

        <h2 className="md:text-7xl text-5xl font-clash font-medium md:flex-row flex-col flex">
          <span>
            Building{" "}
            <span className="bg-linear-to-r from-lime to-blue-400 bg-clip-text text-transparent">
              innovative <br />
              projects{" "}
            </span>
            from code <br />
            to hardware
          </span>
          <div className="flex-1 relative -z-1">
            {/* <Suspense fallback={"loading robot..."}> */}
              <Robot />
            {/* </Suspense> */}
          </div>
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center md:gap-15 gap-10 mt-10">
          <div className="md:w-1/2 w-full bg-white/10 light:bg-black/10 h-px" />
          <div className="md:w-1/2 h-full flex items-center justify-center text-white/60 light:text-black/60">17-year-old student from Stuttgart with a passion for technology. Building web apps, designing hardware, and bringing ideas to life through code.</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="hidden md:flex gap-2 font-light group mt-10">
            {socialLinks.map((link) => (
              <Link key={link.name} href={link.url} className="flex gap-2 items-center justify-center text-white/70 group-hover:opacity-50 hover:opacity-100 light:text-black/70 transition-opacity duration-300" target="_blank">
                <span>{link.name.toUpperCase()}</span>
                <ArrowUpRight className="size-4" />
              </Link>
            ))}
          </div>

          <Link href={"/about"} className="w-42 h-12 mt-10 relative">
            <HoverButton text1="Know me better" text2="About me" />
          </Link>
        </div>
      </section>

      <Marquee />

      <section className="max-w-7xl md:px-0 px-6 mx-auto flex flex-col items-center mt-20">
        <span className="text-lime flex gap-3 text-sm tracking-wider items-center font-clash">
          <Sparkle className="size-4" />
          <ShineText text="ABOUT ME" />
        </span>
        <AnimationText />
      </section>

      <section className="max-w-7xl md:px-0 px-6 mx-auto flex flex-col mt-40">
        <span className="text-lime flex gap-3 text-sm tracking-wider items-center font-clash">
          <Sparkle className="size-4" />
          <ShineText text="MY WORK" />
        </span>

        <h1 className="text-5xl font-clash font-medium mt-5">Selected Projects</h1>
        <h2 className="mt-5 text-white/70 light:text-black/70">Here's a curated selection showcasing my expertise and the achieved results.</h2>

        <div className="mt-10 grid md:grid-cols-2 gap-10 group/all md:has-[>a:hover]:[&>a:not(:hover)]:opacity-50">
          {selectedProjects.slice(0, 4).map((project, index) => (
            <Link href={project.link} className={`flex flex-col group md:hover:opacity-100 transition-opacity duration-300 ${index % 2 === 1 ? "md:translate-y-14" : ""}`} key={project.title}>
              <div className="rounded-3xl relative flex items-center aspect-3/2 justify-center mb-3 overflow-hidden" style={{backgroundColor: project.color}}>
                <Image src={project.imageUrl} fill className="group-hover:scale-105 z-1 transition-transform duration-300" alt={"image of" + project.description} />
                <div
                  style={{
                    backgroundImage: `linear-gradient(150deg, transparent 45%, rgba(255,255,255,0.42) 50%, transparent 55%)`,
                    backgroundSize: "400% 100%",
                    backgroundPositionX: "400%",
                  }}
                  className="absolute inset-0 group-hover:animate-[shinenodelay_0.5s_linear]"
                />
              </div>
              <span className="text-xl font-medium">{project.title}</span>
              <span className="text-sm text-white/70 font-light flex items-center justify-between">
                <span>{project.description}</span>
                <span className="text-white/70 font-light">{project.date}</span>
              </span>
            </Link>
          ))}
        </div>
        <Link href={"/projects"} className="relative md:mt-30 mt-10 w-42 h-12 mx-auto">
          <HoverButton text1="View All Projects" text2="View All Projects" />
        </Link>
      </section>

      <section className="max-w-7xl md:px-0 px-6 mx-auto flex flex-col mt-40">
        <span className="text-lime flex gap-3 text-sm tracking-wider items-center font-clash">
          <Sparkle className="size-4" />
          <ShineText text="SPECIALITY" />
        </span>
        <h1 className="text-5xl font-clash font-medium mt-5">Areas of Expertise</h1>

        <Accordion items={expertise} />
      </section>
    </main>
  )
}
