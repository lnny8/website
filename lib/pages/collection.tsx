"use client"
import Link from "next/link"
import React, {useState} from "react"
import Image from "next/image"
import {AnimatePresence, motion} from "motion/react"

export default function Collection({title, description, data, categories}: {title: string; description: string; data: any[]; categories?: string[]}) {
  const [selectedCategory, setSelectedCategory] = useState("All")

  return (
    <section className="max-w-7xl md:px-0 px-6 mx-auto flex flex-col">
      <div className="mt-32 mb-20 flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-clash font-semibold leading-tight">{title}</h1>
          <span className="text-white/70 light:text-black/70 font-light text-lg">{description}</span>
        </div>
        {categories && (
          <div className="flex gap-5">
            {["All", ...categories].map((category) => (
              <button onClick={() => setSelectedCategory(category)} key={category} className="relative px-6 py-2 rounded-full cursor-pointer">
                {category}
                {selectedCategory === category && <motion.div style={{borderRadius: 9999}} transition={{type: "spring", stiffness: 420, damping: 24}} className="bg-white/10 light:bg-black/10 absolute inset-0 -z-1" layoutId="backGround_category" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid w-full md:grid-cols-2 gap-10 group/all md:has-[>a:hover]:[&>a:not(:hover)]:opacity-50">
      <AnimatePresence>
        {data
          .filter((item) => selectedCategory === "All" || item.category === selectedCategory)
          .map((project, index) => (
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.1 } }} layoutId={project.title} key={project.title}>
              <Link href={project.link} className={`flex flex-col group md:hover:opacity-100 transition-opacity duration-300 ${index % 2 === 1 ? "md:translate-y-14" : ""}`}>
                <div className="rounded-3xl relative flex items-center aspect-3/2 justify-center mb-3 overflow-hidden" style={{backgroundColor: project.color}}>
                  <Image src={project.imageUrl} fill className="group-hover:scale-105 z-1 transition-transform duration-300" alt={"Image of " + project.description} />
                  <div
                    style={{
                      backgroundImage: `linear-gradient(150deg, transparent 40%, rgba(255,255,255,0.42) 50%, transparent 60%)`,
                      backgroundSize: "400% 100%",
                      backgroundPositionX: "400%",
                    }}
                    className="absolute inset-0 group-hover:animate-[shinenodelay_0.42s_linear]"
                  />
                </div>
                <span className="text-xl font-medium">{project.title}</span>
                <span className="text-sm text-white/70 light:text-black/70 font-light flex items-center justify-between">
                  <span>{project.description}</span>
                  <span className="text-white/70 light:text-black/70 font-light">{project.date}</span>
                </span>
              </Link>
            </motion.div>
          ))}
      </AnimatePresence>
      </div>
    </section>
  )
}
