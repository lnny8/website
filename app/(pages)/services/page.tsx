"use client"

import Image from "next/image"
import Link from "next/link"
import HoverButton from "@/lib/components/hoverButton"
import {useGSAP} from "@gsap/react"
import gsap from "gsap"
import {SplitText} from "gsap/all"
import {useRef} from "react"

const services = [
  {
    title: "Website",
    description: "Modern, responsive websites that are fast, accessible, and built to convert visitors into customers.",
    mediaType: "image",
    mediaSrc: "/services/website.png",
    alt: "Website service",
    buttonText1: "Get your website",
    buttonText2: "Customers are waiting",
  },
  {
    title: "n8n Automation",
    description: "Custom workflow automations that connect your tools, remove repetitive tasks, and save you time every week.",
    mediaType: "image",
    mediaSrc: "/services/n8n.png",
    alt: "Automation service",
    buttonText1: "Get your automation",
    buttonText2: "Let's automate",
  },
  {
    title: "Product Video",
    description: "Clear and engaging product videos that explain your value quickly and make your product easier to understand.",
    mediaType: "video",
    mediaSrc: ["/services/white.mp4", "/services/red.mp4"],
    alt: "Product video service",
    buttonText1: "Get your video",
    buttonText2: "The models are ready",
  },
]

export default function Page() {
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const cardsRef = useRef<HTMLElement>(null)

  gsap.registerPlugin(SplitText)

  useGSAP(() => {
    if (!titleRef.current || !descriptionRef.current || !cardsRef.current) return

    const cards = cardsRef.current.children
    const titleSplit = new SplitText(titleRef.current, {type: "words, chars", mask: "chars"})
    const descriptionSplit = new SplitText(descriptionRef.current, {type: "words, chars", mask: "chars"})

    gsap.from(titleSplit.chars, {opacity: 0, yPercent: 100, stagger: 0.02, ease: "back.inOut"})
    gsap.from(descriptionSplit.words, {opacity: 0, filter: "blur(12px)", stagger: {amount: 0.3}, ease: "power4.inOut", delay: 0.3})
    gsap.from(cards, {opacity: 0, yPercent: 16, scale: 0.95, stagger: 0.12, ease: "power3.out", delay: 0.45})
  }, [])

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-0 pt-32 pb-20">
      <h1 ref={titleRef} className="text-5xl font-clash font-medium">
        Services
      </h1>
      <p ref={descriptionRef} className="text-lg text-white/70 light:text-black/70 mt-3 max-w-2xl">
        What I can help you with.
      </p>

      <section ref={cardsRef} className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <article key={service.title} className="rounded-3xl p-6 bg-woodsmoke-light light:bg-athensgray-light shadow-(--inset_shadow)">
            <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden mb-5 bg-white/5 light:bg-black/5">
              {service.mediaType === "video" && Array.isArray(service.mediaSrc) ? (
                <div className="w-full h-full grid grid-cols-2 gap-2 p-2">
                  {service.mediaSrc.map((src, index) => (
                    <video key={`${src}-${index}`} className="w-full h-full object-cover rounded-xl aspect-9/16" src={src} autoPlay muted loop playsInline />
                  ))}
                </div>
              ) : (
                <Image src={typeof service.mediaSrc === "string" ? service.mediaSrc : "/images/blueprint.jpeg"} alt={service.alt} fill className="object-cover" />
              )}
            </div>
            <h2 className="text-2xl font-clash font-semibold">{service.title}</h2>
            <p className="mt-3 text-white/70 light:text-black/70 leading-relaxed">{service.description}</p>
            <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="block mt-6 w-48 mx-auto h-12">
              <HoverButton text1={service.buttonText1} text2={service.buttonText2} />
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}
