import React from "react"

export default function Card({category, skillList}: {category: string; skillList: string[]}) {
  return (
    <div id="home-skillblock" key={category} className="group relative rounded-2xl p-5 border-1 border-white/10 bg-white/10 backdrop-blur-xl">
      <h3 className="text-lg sm:text-xl font-semibold tracking-wide text-white/90">{category}</h3>
      <div className="my-4 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

      <div className="flex flex-wrap gap-2">
        {skillList.map((skill) => (
          <span className="bg-white/5 items-center rounded-xl px-3 py-1" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
