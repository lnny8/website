import {ArrowUpRight, Code, Code2, Hand, Pen, PenTool, Sparkle, SwatchBook} from "lucide-react"
import Link from "next/link"
import React from "react"
import HoverButton from "./tutorials/hover-button/button"
import Marquee from "@/lib/marquee"
import {useGSAP} from "@gsap/react"
import AnimationText from "@/lib/animation-text"
import Image from "next/image"
import {col} from "motion/react-client"
import {color} from "motion"
import Accordion from "@/lib/accordion"

export default function Page() {
  const socialLinks = [
    {name: "LinkedIn", url: "https://linkedin.com/in/lennymuffler"},
    {name: "GitHub", url: "https://github.com/lnny8"},
    {name: "Instagram", url: "https://instagram.com/lnny.8"},
    {name: "Gmail", url: "mailto:lennymuffler@gmail.com"},
  ]

  const projects = [
    {title: "Lonui", description: "A demo website", imageUrl: "/projects/lonui.png", link: "#", date: "2024", color: "#faa"},
    {title: "Flowline", description: "Logical Simulator", imageUrl: "/projects/flowline.png", link: "#", date: "2024", color: "#aaf"},
    {title: "Sorting Visualizer", description: "Visualize sorting algorithms", imageUrl: "/projects/sorting.png", link: "#", date: "2025", color: "#aff"},
    {title: "Image Editor", description: "An online image editor", imageUrl: "/projects/images.png", link: "#", date: "2025", color: "#faf"},
  ]

  const expertise = [
    {title: "Development", icon: <Code2 className="size-5" />, imageUrl:"/expertise/development.jpg", content: "Building responsive websites. Providing the users an enriching experience that responds to any device and screen size."},
    {title: "UI/UX Design", icon: <PenTool className="size-5" />, imageUrl:"/expertise/design.png", content: "Designing user-centric, modern interfaces that shapes how the audience interacts with the product."},
    {title: "Branding", icon: <SwatchBook className="size-5" />, imageUrl:"/expertise/branding.png", content: "Building brand identities including working on logo, typography, iconography, colour palette, visual language, and brand personality."},
  ]

  return (
    <main className="min-h-screen w-full">
      <section className="max-w-7xl mx-auto pt-40">
        <h1 className="pb-8 flex gap-3">
          <Hand className="text-lime animate-wave" style={{transformOrigin: "75% 75%"}} />
          Hey! I'm Lenny
        </h1>

        <h2 className="text-7xl font-clash font-medium">
          Crafting <span className="bg-gradient-to-r from-lime to-blue-400 bg-clip-text text-transparent">purpose driven experiences</span> that inspire <br />& engage
        </h2>

        <div className="flex items-center justify-center gap-15 mt-10">
          <div className="w-1/2 bg-white/10 light:bg-black/10 h-0.25" />
          <div className="w-1/2 h-full flex items-center justify-center text-white/60 light:text-black/60">I work with brands globally to build pixel-perfect, engaging, and accessible digital experiences that drive results and achieve business goals.</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2 font-light group mt-10">
            {socialLinks.map((link) => (
              <Link key={link.name} href={link.url} className="flex gap-2 items-center justify-center text-white/70 group-hover:opacity-50 hover:opacity-100 light:text-black/70 transition-opacity duration-300" target="_blank">
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
        <span className="text-lime flex gap-3 text-sm tracking-wider items-center justify-center font-clash">
          <Sparkle className="size-4" />
          ABOUT ME
        </span>
        <AnimationText />
      </section>

      <section className="max-w-7xl mx-auto flex flex-col mt-40">
        <span className="text-lime flex gap-3 text-sm tracking-wider items-center font-clash">
          <Sparkle className="size-4" />
          MY WORK
        </span>

        <h1 className="text-5xl font-clash font-medium mt-5">Selected Projects</h1>
        <h2 className="mt-5 text-white/70 light:text-black/70">Here's a curated selection showcasing my expertise and the achieved results.</h2>

        <div className="mt-10 grid grid-cols-2 gap-10 group/all">
          {projects.map((project, index) => (
            <Link href={project.link} className="flex flex-col group group-hover/all:opacity-50 hover:opacity-100 transition-opacity duration-300" key={project.title} style={{translate: index % 2 === 1 ? "0px 4rem" : ""}}>
              <div className="rounded-3xl relative flex items-center justify-center mb-3" style={{background: project.color}}>
                <Image src={project.imageUrl} width={500} height={500} className="group-hover:scale-105 transition-transform duration-300" alt={"image of" + project.description} />
              </div>
              <span className="text-xl font-medium">{project.title}</span>
              <span className="text-sm text-white/70 font-light flex items-center justify-between">
                <span>{project.description}</span>
                <span className="text-white/70 font-light">{project.date}</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="relative mt-30 w-42 h-12 mx-auto">
          <HoverButton text1="View All Projects" text2="View All Projects" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto flex flex-col mt-40">
        <span className="text-lime flex gap-3 text-sm tracking-wider items-center font-clash">
          <Sparkle className="size-4" />
          SECIALITY
        </span>
        <h1 className="text-5xl font-clash font-medium mt-5">Areas of Expertise</h1>

        <Accordion items={expertise} />
      </section>
    </main>
  )
}
