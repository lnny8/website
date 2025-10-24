import React from "react"

export default function Card({title, items, highlight}: {title: string; items: string[]; highlight?: string}) {
  return (
    <article key={title} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:border-white/30 hover:bg-white/10">
      {highlight && <span className="text-xs mb-4 font-semibold uppercase tracking-[0.3em] text-white/40">{highlight}</span>}
      <h4 className="text-xl font-semibold tracking-tight">{title}</h4>
      <div className="flex flex-wrap gap-2 pt-5">
        {items.map((item) => (
          <span id="home-skillList-item" className="bg-white/5 items-center rounded-xl px-3 py-1" key={item}>
            {item}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_65%)] opacity-0 transition duration-300 hover:opacity-100" />
    </article>
  )
}
