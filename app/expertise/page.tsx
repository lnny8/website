"use client"

import React, {useMemo, useState} from "react"
import {experienceCategories} from "@/lib/data/data"
import {AnimatePresence, motion} from "motion/react"

function Chip({label}: {label: string}) {
  return <div className="rounded-full border border-white/10 light:border-black/10 bg-white/5 light:bg-black/5 px-4 py-2 text-sm text-white/90 light:text-black/90 hover:bg-white/10 light:hover:bg-black/10 transition-colors">{label}</div>
}

export default function Page() {
  const categories = useMemo(() => experienceCategories.map((c) => c.title), [])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const flattened = useMemo(() => {
    return experienceCategories.flatMap((c) => c.items.map((name) => ({name, category: c.title})))
  }, [])

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return flattened
    return flattened.filter((x) => x.category === selectedCategory)
  }, [flattened, selectedCategory])

  return (
    <main className="min-h-screen max-w-7xl mx-auto w-full pb-24">
      <section className="pt-32 px-6 md:px-0">
        <h1 className="text-6xl font-clash font-semibold leading-tight mb-6">Expertise</h1>
        <p className="text-xl text-white/80 light:text-black/80 leading-relaxed max-w-3xl">A breakdown of the tools, technologies, and domains I use most — grouped so it’s easy to scan.</p>
      </section>

      <section className="px-6 md:px-0 mt-10 flex flex-wrap gap-2">
        {["All", ...categories].map((category) => (
          <button onClick={() => setSelectedCategory(category)} key={category} className="relative px-4 md:px-6 py-2 rounded-full cursor-pointer text-sm md:text-base">
            {category}
            {selectedCategory === category && <motion.div style={{borderRadius: 9999}} transition={{type: "spring", stiffness: 420, damping: 24}} className="bg-white/10 light:bg-black/10 absolute inset-0 -z-1" layoutId="backGround_experience_category" />}
          </button>
        ))}
      </section>

      {selectedCategory === "All" ? (
        <section className="px-6 md:px-0 mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {experienceCategories.map((category) => (
            <div key={category.title} className="rounded-2xl border border-white/10 light:border-black/10 bg-white/5 light:bg-black/5 p-6">
              <div className="flex flex-col gap-1 mb-4">
                <h2 className="text-2xl font-clash font-semibold">{category.title}</h2>
                {category.description && <p className="text-sm text-white/70 light:text-black/70">{category.description}</p>}
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <Chip key={`${category.title}-${item}`} label={item} />
                ))}
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="px-6 md:px-0 mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <AnimatePresence>
              {filtered.map((item) => (
                <motion.div key={`${item.category}-${item.name}`} initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1, transition: {duration: 0.25}}} exit={{opacity: 0, scale: 0.9, transition: {duration: 0.1}}}>
                  <Chip label={item.name} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}
    </main>
  )
}
