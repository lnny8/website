"use client"
import {Sparkle} from "lucide-react"
import React, {useRef, useState} from "react"
import HoverButton from "@/lib/components/hoverButton"
import Image from "next/image"
import SocialSpan from "@/lib/components/socialSpan"
import toast from "@/lib/components/toast"
import ShineText from "@/lib/components/shineText"
import {motion} from "motion/react"
import {useGSAP} from "@gsap/react"
import gsap from "gsap"
import {SplitText} from "gsap/all"

export default function Page() {
  const [formData, setFormData] = useState({name: "", email: "", message: ""})
  const [loading, setLoading] = useState(false)
  const badgeRef = useRef(null)
  const titleRef = useRef(null)

  gsap.registerPlugin(SplitText)

  useGSAP(() => {
    if (!badgeRef.current || !titleRef.current) return

    const badgeSplit = new SplitText(badgeRef.current, {type: "words", mask: "words"})
    const titleSplit = new SplitText(titleRef.current, {type: "words", mask: "words"})

    gsap.from(badgeSplit.words, {
      opacity: 0,
      y: 12,
      filter: "blur(10px)",
      stagger: 0.06,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.1,
    })

    gsap.from(titleSplit.words, {
      opacity: 0,
      y: 12,
      filter: "blur(10px)",
      stagger: 0.06,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.2,
    })
  }, [])

  function validEmail() {
    const email = formData.email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  async function sendMessage() {
    if (formData.name.length < 2) return toast("Please enter your name.", "error")
    if (!validEmail()) return toast("Please enter a valid email address.", "error")
    if (formData.message.length < 2) return toast("Please enter a message.", "error")

    setLoading(true)
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify({
          from: "Lenny <hello@lnny.dev>",
          to: ["lenny.muffler@gmail.com"],
          subject: "Message from Portfolio",
          html: `<p>Name: ${formData.name}</p><p>Email: ${formData.email}</p><p>Message: ${formData.message}</p>`,
        }),
      })
      const data = await res.json()
      console.log("email send response", data)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
    toast("Message sent successfully!", "success")
    setFormData({name: "", email: "", message: ""})
  }

  return (
    <main className="min-h-screen max-w-6xl mx-auto md:px-0 px-6">
      <span ref={badgeRef} className="pt-40 flex gap-3 text-sm tracking-wider items-center font-clash">
        <ShineText text="CONNECT WITH ME" />
      </span>
      <h1 ref={titleRef} className="text-5xl font-clash font-medium mt-5 md:max-w-lg">
        Let&apos;s start a project together
      </h1>

      <div className="grid md:grid-cols-2 gap-10 mt-10">
        <motion.div initial={{opacity: 0, y: 40}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.8, ease: "easeOut"}} viewport={{once: true, amount: 0.3}} className="flex flex-col relative">
          <motion.label initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.45, delay: 0.05}} viewport={{once: true, amount: 0.8}} className="text-sm font-medium" htmlFor="contact-fullName">
            Full Name
          </motion.label>
          <motion.input
            initial={{opacity: 0, y: 12}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.45, delay: 0.1}}
            viewport={{once: true, amount: 0.8}}
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            type="text"
            id="contact-fullName"
            className="bg-woodsmoke-light shadow-(--inset_shadow) light:bg-athensgray-light rounded-xl light:border-black/10-xl mt-2 px-4 py-2 focus:outline-none focus:ring-2 ring-lime"
          />
          <motion.label initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.45, delay: 0.15}} viewport={{once: true, amount: 0.8}} className="text-sm font-medium mt-5" htmlFor="contact-email">
            Email
          </motion.label>
          <motion.input
            initial={{opacity: 0, y: 12}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.45, delay: 0.2}}
            viewport={{once: true, amount: 0.8}}
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            type="email"
            id="contact-email"
            className="bg-woodsmoke-light light:bg-athensgray-light shadow-(--inset_shadow) rounded-xl mt-2 px-4 py-2 focus:outline-none focus:ring-2 ring-lime"
          />
          <motion.label initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.45, delay: 0.25}} viewport={{once: true, amount: 0.8}} className="text-sm font-medium mt-5" htmlFor="contact-message">
            Message
          </motion.label>
          <motion.textarea
            initial={{opacity: 0, y: 12}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.45, delay: 0.3}}
            viewport={{once: true, amount: 0.8}}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows={4}
            id="contact-message"
            className="bg-woodsmoke-light shadow-(--inset_shadow) light:bg-athensgray-light rounded-xl mt-2 px-4 py-2 focus:outline-none focus:ring-2 ring-lime"
          />
          <motion.button initial={{opacity: 0, y: 12}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.45, delay: 0.35}} viewport={{once: true, amount: 0.8}} disabled={loading} onClick={() => sendMessage()} className="mt-10 relative w-42 h-12">
            <HoverButton loading={loading} text1="Submit" text2="I'm curious" />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 50, scale: 0.98}}
          whileInView={{opacity: 1, y: 0, scale: 1}}
          transition={{duration: 0.9, type: "spring", bounce: 0.2}}
          viewport={{once: true, amount: 0.3}}
          className="bg-woodsmoke-light shadow-(--inset_shadow) rounded-3xl p-5 flex flex-col gap-7 light:bg-white h-max">
          <motion.span initial={{opacity: 0, x: -10}} whileInView={{opacity: 1, x: 0}} transition={{duration: 0.5, delay: 0.15}} viewport={{once: true, amount: 0.8}} className="px-4 py-2 flex gap-3 items-center justify-center rounded-full bg-lime/10 w-max">
            <div className="rounded-full size-2 bg-lime relative">
              <div className="bg-lime rounded-full absolute inset-0 animate-[blink_1s_infinite]" />
            </div>
            <span className="text-sm">Available for work</span>
          </motion.span>

          <div className="">
            <Image src="/images/lenny_q.png" alt="Lenny Muffler Logo" width={100} height={100} className="light:hidden bg-whitef border border-white/10 light:border-black/10 p-2 rounded-full bg-whitef" />
            <Image src="/images/lenny_q_white.png" alt="Lenny Muffler Logo" width={100} height={100} className="hidden light:block border border-white/10 light:border-black/10 p-2 rounded-full" />
          </div>

          <motion.p initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.55, delay: 0.35}} viewport={{once: true, amount: 0.8}} className="text-white/70 light:text-black/70 font-light">
            My inbox is always open, Whether you have a project or just want to say Hi. I would love to hear from you. Feel free to contact me and I&apos;ll get back to you.
          </motion.p>

          <motion.div initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.45}} viewport={{once: true, amount: 0.8}}>
            <SocialSpan />
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
