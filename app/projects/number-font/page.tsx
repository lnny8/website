"use client"
import Image from "next/image"
import React, {useEffect} from "react"

export default function Page() {
  const [number, setNumber] = React.useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        setNumber(Number(e.key))
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-3xl space-y-6">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">Typography · Experiment</p>
        <h1 className="text-4xl font-bold">Number Font Sampler</h1>
        <p className="text-white/70">I created a custom bitmap-inspired typeface for scoreboard-style interfaces. Press a number key (0-9) to explore how each glyph animates in my motion comps.</p>
        <Image src={`/numbers/${number}.png`} alt={`Custom number font for digit ${number} by Lenny Muffler`} width={280} height={280} className="mx-auto rounded-3xl border border-white/10 bg-black/60 p-6" />
        <p className="text-sm text-white/60">Use it to drive countdowns, dashboards, or kinetic typography for campaigns.</p>
      </div>
    </main>
  )
}
