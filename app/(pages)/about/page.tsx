"use client"
import MoreSoon from "@/lib/components/moreSoon"
import {about} from "@/lib/data/data"
import {useGSAP} from "@gsap/react"
import Image from "next/image"
import {useRef} from "react"
import {SplitText} from "gsap/all"
import gsap from "gsap"
import { motion } from "motion/react"

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
    gsap.from(descriptionSplit.words, {opacity: 0, xPercent: 0, filter: "blur(12px)", stagger: {amount: 0.8}, ease: "power4.inOut", delay: 0.3})
    // gsap.from(cards, {scale: 0, yPercent: 100, stagger: 0.1, ease: "back.inOut", delay: 0.7})
    gsap.from(".lenny-image", {opacity: 0, ease: "back.inOut", delay: 0.9})
  }, [])

  return (
    <main className="min-h-screen max-w-7xl mx-auto w-full pb-24">
      <section className="pt-32 px-6 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <h1 ref={titleRef} className="text-5xl font-clash font-medium mb-6">
              About me
            </h1>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <p ref={descriptionRef} className="order-1 md:order-first text-xl col-span-1 text-white/80 light:text-black/80 leading-relaxed">
                Hi, I'm Lenny Muffler, a 17-year-old high school student from Stuttgart, Germany with a passion for technology and creativity. From building web applications to designing hardware prototypes, I love exploring new ways to bring ideas to life through code and
                design. When I'm not coding, you can find me tinkering with 3D modeling or experimenting with automation workflows. I'm always eager to learn and take on new challenges in the tech world.
              </p>
              <div className="lenny-image relative md:size-100 w-full h-60 md:rounded-full rounded-3xl bg-woodsmoke-light light:bg-athensgray-light shadow-(--inset_shadow) mx-auto overflow-hidden">
                <Image src="/images/lenny.png" alt="Photo of Lenny Muffler" fill className="object-contain light:hidden" priority />
                <Image src="/images/lenny_white.png" alt="Photo of Lenny Muffler" fill className="object-contain light:block hidden" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={cardsRef} className="px-6 md:px-0 mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 pb-12f">
        {about.map((item) => (
          <motion.div initial={{opacity: 0, scale: 0.5}} whileInView={{opacity: 1, scale: 1, transition: {duration: 1, type: "spring", delay: 0.3}}} key={item.title} className="rounded-3xl shadow-(--inset_shadow) bg-woodsmoke-light light:bg-athensgray-light p-4 flex flex-col items-center text-center gap-3">
            <div className="text-3xl">{item.icon}</div>
            <h3 className="text-xl font-clash font-semibold">{item.description}</h3>
            <p className="text-white/70 light:text-black/70 text-sm capitalize">{item.title}</p>
          </motion.div>
        ))}
      </section>

      <MoreSoon />
    </main>
  )
}
