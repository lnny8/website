"use client"
import React, {useState} from "react"

export default function Page() {
  const [num, setNum] = useState(0)

  function fibonacci(n: number) {
    return Math.round((1 / Math.sqrt(5)) * (((1 + Math.sqrt(5)) / 2) ** n - ((1 - Math.sqrt(5)) / 2) ** n))
  }

  return (
    <main className="bg-black w-full min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-xl space-y-6">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">Math utility</p>
        <h1 className="text-4xl font-bold">Fibonacci visual by Lenny Muffler</h1>
        <p className="text-white/70">A compact TypeScript helper I often drop into prototypes when generating easing curves or animating particle counts. Enter an index to instantly inspect the resulting Fibonacci number.</p>
        <label htmlFor="fibonacci-input" className="flex flex-col gap-3 text-left text-sm text-white/60">
          <span>Pick an index (0-1476)</span>
          <input type="number" id="fibonacci-input" min={0} max={1476} className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-white/60 focus:outline-none" value={num} onChange={(e) => setNum(Number(e.target.value))} />
        </label>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-lg font-semibold text-white">
          Result: <span className="font-mono">{fibonacci(num)}</span>
        </div>
      </div>
    </main>
  )
}
