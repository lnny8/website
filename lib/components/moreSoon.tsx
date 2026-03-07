"use client"
import {motion} from "motion/react"
import Image from "next/image"
import React from "react"

export default function MoreSoon() {
  return (
    <motion.div
      initial={{opacity: 0, scale: 0.8, y: 100}}
      whileInView={{opacity: 1, scale: 1, transition: {duration: 1, type: "spring", delay: 0.3}}}
      className="md:max-w-6xl mx-6 md:mx-auto grid md:grid-cols-2 content-center place-items-center rounded-3xl shadow-(--inset_shadow) bg-woodsmoke-light light:bg-athensgray-light">
      <div className="md:pl-42 px-10 md:px-0 pt-10 md:pt-0">
        <h1 className="md:text-6xl text-5xl font-clash tracking-tight font-semibold">More content coming soon...</h1>
        <p className="mt-2 text-lg text-white/70 light:text-black/70 font-light">Stay tuned for updates.</p>
      </div>
      <Image src="/images/worker.png" className="pt-8 md:mr-42" alt="more content coming soon" width={300} height={400} />
    </motion.div>
  )
}
