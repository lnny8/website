"use client"
import {ArrowUpRight, Code, Code2, Hand, Pen, PenTool, Sparkle, Split, SwatchBook} from "lucide-react"
import Link from "next/link"
import React, {Suspense, useRef} from "react"
import HoverButton from "@/lib/components/hoverButton"
import Marquee from "@/lib/components/marquee"
import AnimationText from "@/lib/components/animationText"
import Accordion from "@/lib/components/accordion"
import ShineText from "@/lib/components/shineText"
import {selectedProjects, socials} from "@/lib/data/data"
import Robot from "@/lib/robot/robot"
import {useGSAP} from "@gsap/react"
import gsap from "gsap"
import {ScrollTrigger, SplitText} from "gsap/all"
import Collection from "@/lib/pages/collection"
import ImageTrail from "@/lib/components/imageTrail"
import {images} from "./art/page"
import Image from "next/image"

export default function Page() {
  const socialLinks = [
    {name: "LinkedIn", url: socials.linkedin},
    {name: "GitHub", url: socials.github},
    {name: "Instagram", url: socials.instagram},
    {name: "Email", url: socials.email},
  ]

  const expertise = [
    {
      title: "Web Development",
      icon: <Code2 className="size-5" />,
      imageUrl: "/expertise/web.png",
      content: "Building responsive web applications with modern frameworks like React and Next.js. Creating interactive experiences that work seamlessly across all devices.",
    },
    {
      title: "3D and Hardware Design",
      icon: <PenTool className="size-5" />,
      imageUrl: "/expertise/3d.png",
      content: "From concept to creation, I design and prototype hardware solutions. Skilled in CAD software for 3D modeling, photorealistic rendering and PCB design.",
    },
    {
      title: "Automation & n8n",
      icon: <Code className="size-5" />,
      imageUrl: "/expertise/automation.png",
      content: "Designing workflow automations in n8n to connect services, streamline processes, and reduce manual effort.",
    },
    {
      title: "AI & Machine Learning",
      icon: <Sparkle className="size-5" />,
      imageUrl: "/expertise/ai.png",
      content: "Leveraging AI models and ML techniques to create intelligent features, from data processing to user-facing experiences.",
    },
  ]

  gsap.registerPlugin(SplitText, ScrollTrigger)

  const viewAllButtonRef = useRef(null)
  const specialityRef = useRef(null)
  const expertiseTitleRef = useRef(null)
  const expertiseDescriptionRef = useRef(null)
  const aiArtTitleRef = useRef(null)
  const aiArtDescriptionRef = useRef(null)
  const aiArtContentRef = useRef(null)
  const aiArtButtonRef = useRef(null)

  useGSAP(() => {
    gsap.from(".hero-text-fill", {
      opacity: 0,
      delay: 0.42,
      duration: 0.8,
      ease: "power4.inOut",
    })
    gsap.from(".hero-text-stroke", {
      opacity: 1,
      delay: 0.62,
      duration: 0.4,
      ease: "power4.inOut",
    })

    gsap.from(viewAllButtonRef.current, {
      opacity: 0,
      y: 10,
      filter: "blur(12px)",
      delay: 0.8,
      duration: 0.6,
      ease: "power4.out",
      scrollTrigger: {
        trigger: viewAllButtonRef.current,
        start: "top 85%",
        toggleActions: "play reverse restart reverse",
      },
    })

    gsap.from(specialityRef.current, {
      opacity: 0,
      y: 10,
      filter: "blur(12px)",
      delay: 0.8,
      duration: 0.6,
      ease: "power4.out",
      scrollTrigger: {
        trigger: specialityRef.current,
        start: "top 80%",
        toggleActions: "play reverse restart reverse",
      },
    })

    const expertiseTitleSplit = new SplitText(expertiseTitleRef.current, {type: "words"})
    const expertiseDescriptionSplit = new SplitText(expertiseDescriptionRef.current, {type: "words"})

    gsap.from(expertiseTitleSplit.words, {
      opacity: 0,
      y: 10,
      filter: "blur(12px)",
      stagger: 0.05,
      duration: 0.6,
      ease: "power4.out",
      scrollTrigger: {
        trigger: expertiseTitleRef.current,
        start: "top 80%",
        toggleActions: "play reverse restart reverse",
      },
    })

    gsap.from(expertiseDescriptionSplit.words, {
      opacity: 0,
      y: 10,
      filter: "blur(12px)",
      stagger: 0.05,
      duration: 0.6,
      ease: "power4.out",
      scrollTrigger: {
        trigger: expertiseDescriptionRef.current,
        start: "top 80%",
        toggleActions: "play reverse restart reverse",
      },
    })

    const aiArtTitleSplit = new SplitText(aiArtTitleRef.current, {type: "words"})
    const aiArtDescriptionSplit = new SplitText(aiArtDescriptionRef.current, {type: "words"})

    gsap.from(aiArtTitleSplit.words, {
      opacity: 0,
      y: 10,
      filter: "blur(12px)",
      stagger: 0.05,
      duration: 0.6,
      ease: "power4.out",
      scrollTrigger: {
        trigger: aiArtTitleRef.current,
        start: "top 80%",
        toggleActions: "play reverse restart reverse",
      },
    })

    gsap.from(aiArtDescriptionSplit.words, {
      opacity: 0,
      y: 10,
      filter: "blur(12px)",
      stagger: 0.05,
      duration: 0.6,
      ease: "power4.out",
      scrollTrigger: {
        trigger: aiArtDescriptionRef.current,
        start: "top 80%",
        toggleActions: "play reverse restart reverse",
      },
    })

    gsap.from(aiArtContentRef.current, {
      opacity: 0,
      y: 10,
      filter: "blur(12px)",
      duration: 0.6,
      ease: "power4.out",
      scrollTrigger: {
        trigger: aiArtContentRef.current,
        start: "top 80%",
        toggleActions: "play reverse restart reverse",
      },
    })

    gsap.from(aiArtButtonRef.current, {
      opacity: 0,
      y: 10,
      filter: "blur(12px)",
      duration: 0.6,
      ease: "power4.out",
      scrollTrigger: {
        trigger: aiArtButtonRef.current,
        start: "top 85%",
        toggleActions: "play reverse restart reverse",
      },
    })

    const splitAbout = new SplitText(".about-text", {type: "words"})
    gsap.from(splitAbout.words, {
      opacity: 0,
      y: 10,
      filter: "blur(12px)",
      stagger: 0.05,
      delay: 0.8,
      duration: 0.6,
      ease: "power4.out",
      onComplete: () => splitAbout.revert(),
    })
  }, [])

  return (
    <main className="min-h-screen w-full">
      <div className="fixed inset-0 -z-1"></div>

      <section className="max-w-7xl mx-auto pt-40 px-6 md:px-0">
        <h1 className="pb-8 flex gap-3">
          <Hand className="text-lime animate-wave" style={{transformOrigin: "75% 75%"}} />
          Hey! I'm Lenny Muffler
        </h1>

        {/* blobs */}
        {/* <div className="w-300 h-200 absolute top-0 right-0 -z-1 md:scale-100 scale-42" style={{transformOrigin: "top right"}}>
          <Image src={"/graphics/top.svg"} alt="background graphic" fill className="object-contain light:hidden" />
          <Image src={"/graphics/top_light.svg"} alt="background graphic" fill className="object-contain hidden light:block" />
        </div> */}

        <h2 className="relative md:text-7xl text-[42px] leading-10 md:leading-17 font-clash font-medium md:flex-row flex-col flex">
          <span className="hero-text-stroke opacity-0 [-webkit-text-stroke:0.3px_#fff] light:[-webkit-text-stroke:0.3px_#000] [-webkit-text-fill-color:transparent]">
            Building{" "}
            <span className="bg-[linear-gradient(90deg,#0af,#65F)]f bg-clip-text text-transparent">
              innovative
              <br />
            </span>
            <span className="bg-[linear-gradient(90deg,#65F,#f772c2)]f bg-clip-text text-transparent">projects </span>
            from code <br />
            to hardware
          </span>

          <span className="hero-text-fill absolute inset-0 [-webkit-text-stroke:0.3px_#fff]f flight:[-webkit-text-stroke:0.3px_#000]">
            Building{" "}
            <span className="bg-[linear-gradient(90deg,#0af,#95F)] bg-clip-text text-transparent">
              innovative
              <br />
            </span>
            <span className="bg-[linear-gradient(90deg,#95F,#f772c2)] bg-clip-text text-transparent">projects </span>
            from code <br />
            to hardware
          </span>

          {/* <div className="flex-1 relative -z-1">
            <Robot />
          </div> */}
        </h2>

        <div className="md:hidden -translate-y-20">
          <Marquee direction="right" />
        </div>
        <div className="md:hidden -translate-y-35">
          <Marquee direction="left" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center md:gap-15 gap-10 md:mt-10 -mt-40">
          <div className="md:w-1/2 w-full bg-white/10 light:bg-black/10 h-px" />
          <div className="md:w-1/2 h-full text-right text-white/60 light:text-black/60 about-text">17-year-old student from Stuttgart with a passion for technology. Building web apps, designing hardware, and bringing ideas to life through code.</div>
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

      <div className="md:block hidden mt-20">
        <Marquee />
      </div>

      <section className="max-w-7xl md:px-0 px-6 mx-auto flex flex-col items-center mt-20">
        {/* <span className="text-lime flex gap-3 text-sm tracking-wider items-center font-clash">
          <Sparkle className="size-4" />
          <ShineText text="ABOUT ME" />
        </span> */}
        <AnimationText />
      </section>

      <section className="max-w-7xl md:px-0 px-6 mx-auto flex flex-col mt-20">
        {/* <span className="text-lime flex gap-3 text-sm tracking-wider items-center font-clash">
          <Sparkle className="size-4" />
          <ShineText text="MY WORK" />
        </span> */}
        <Collection data={selectedProjects} title={"Selected Work"} description={"Some cool projects, Applications and Tutorials"} />
        <Link ref={viewAllButtonRef} href={"/projects"} className="relative md:mt-30 mt-10 w-42 h-12 mx-auto">
          <HoverButton text1="View All Projects" text2="View All Projects" />
        </Link>
      </section>

      <section className="max-w-7xl md:px-0 px-6 mx-auto items-center mt-20">
        <h1 ref={aiArtTitleRef} className="text-5xl font-clash font-medium">
          AI Art
        </h1>
        <p ref={aiArtDescriptionRef} className="text-lg text-white/70 light:text-black/70 mt-3 max-w-2xl">
          Some interesting AI-generated images
        </p>
        <div ref={aiArtContentRef} className="mt-10 w-full h-142 shadow-(--inset_shadow) rounded-2xl bg-woodsmoke-light light:bg-athensgray-light flex items-center justify-center overflow-hidden relative">
          <span className="text-center w-full absolute text-4xl font-clash font-medium text-white/8 light:text-black/8">Hover me</span>
          <ImageTrail variant={1} key={"imageTrail"} items={images} />
        </div>
        <Link ref={aiArtButtonRef} href={"/art"} className="z-5 block mt-10 w-42 h-12 mx-auto md:col-span-4">
          <HoverButton text1="View All Art" text2="Enter my Museum" />
        </Link>
      </section>

      <section className="max-w-7xl md:px-0 px-6 mx-auto flex flex-col mt-40">
        <span ref={specialityRef} className="text-lime flex gap-3 text-sm tracking-wider items-center font-clash">
          <Sparkle className="size-4" />
          <ShineText text="SPECIALITY" />
        </span>
        <h1 ref={expertiseTitleRef} className="text-5xl font-clash font-medium mt-5">
          Areas of Expertise
        </h1>
        <h2 ref={expertiseDescriptionRef} className="mt-5 text-white/70 light:text-black/70">
          A glimpse into my areas of expertise.
        </h2>
        <Accordion items={expertise} />
      </section>

    </main>
  )
}
