"use client"
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react"
import gsap from "gsap"
import {Minus, Plus} from "lucide-react"

export default function Page() {
  const [probs, setProbs] = useState<{prob: number; color: string}[]>([
    {prob: 0.3, color: "#f00"},
    {prob: 0.3, color: "#0f0"},
    {prob: 0.4, color: "#00f"},
  ])
  const barRef = useRef<HTMLDivElement | null>(null)
  const [activeHandle, setActiveHandle] = useState<number | null>(null)
  //   const gradientParts = [
  //     `${probs[0].color} 0%`,

  //     `${probs[0].color} ${probs[0].prob * 100}%`,
  //     `${probs[1].color} ${probs[0].prob * 100}%`,

  //     `${probs[1].color} ${probs[0].prob * 100 + probs[1].prob * 100}%`,
  //     `${probs[2].color} ${probs[0].prob * 100 + probs[1].prob * 100}%`
  // ]

  const gradientParts = useMemo(() => {
    let cumulative = 0

    return probs.flatMap(({color, prob}) => {
      const start = cumulative * 100
      cumulative += prob
      const end = cumulative * 100
      return [`${color} ${start}%`, `${color} ${end}%`]
    })
  }, [probs])

  const boundaryPercents = useMemo(() => {
    let cumulative = 0
    return probs.slice(0, -1).map(({prob}) => {
      cumulative += prob
      return cumulative * 100
    })
  }, [probs])

  function spinWheel() {
    gsap.killTweensOf("#wheelspin-circle")
    gsap.set("#wheelspin-circle", {rotation: 0})
    let randomRotation = Math.random() * 360
    gsap.to("#wheelspin-circle", {
      rotation: 360 * 5 + randomRotation,
      duration: 4,
      ease: "power4.out",
      onComplete: () => alert(getResult(randomRotation)),
    })
  }
  function getResult(rotation: number) {
    const normalized = (360 - (rotation % 360) + 360) % 360
    const ratio = normalized / 360
    let cumulative = 0

    for (const {prob, color} of probs) {
      cumulative += prob
      if (ratio <= cumulative) return color
    }

    return probs.at(-1)?.color ?? ""
  }

  const updateHandlePosition = useCallback(
    (clientX: number, handleIndex = activeHandle) => {
      const bar = barRef.current
      if (!bar || handleIndex === null) return

      const rect = bar.getBoundingClientRect()
      const rawRatio = (clientX - rect.left) / rect.width
      const ratio = Math.min(Math.max(rawRatio, 0), 1)

      setProbs((prev) => {
        if (handleIndex < 0 || handleIndex >= prev.length - 1) return prev
        const leftFixed = prev.slice(0, handleIndex).reduce((sum, item) => sum + item.prob, 0)
        const segmentTotal = prev[handleIndex].prob + prev[handleIndex + 1].prob
        const min = leftFixed
        const max = leftFixed + segmentTotal
        const clamped = Math.min(Math.max(ratio, min), max)
        const updated = [...prev]
        updated[handleIndex] = {...updated[handleIndex], prob: clamped - leftFixed}
        updated[handleIndex + 1] = {...updated[handleIndex + 1], prob: max - clamped}
        return updated
      })
    },
    [activeHandle]
  )

  useEffect(() => {
    if (activeHandle === null) return

    function handleMove(event: MouseEvent) {
      updateHandlePosition(event.clientX)
    }

    function handleUp() {
      setActiveHandle(null)
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseup", handleUp)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseup", handleUp)
    }
  }, [activeHandle, updateHandlePosition])

  function handleMouseDown(e: React.MouseEvent) {
    if (!barRef.current || boundaryPercents.length === 0) return
    const offset = 3
    const rect = e.currentTarget.getBoundingClientRect()
    const progressOnBar = ((e.clientX - rect.left) / rect.width) * 100

    const closestIndex = boundaryPercents.findIndex((boundary) => Math.abs(progressOnBar - boundary) <= offset)
    if (closestIndex === -1) return

    setActiveHandle(closestIndex)
    updateHandlePosition(e.clientX, closestIndex)
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  function addColor() {
    setProbs((prev) => {
      const newProb = 1 / (prev.length + 1)
      const updatedProbs = prev.map((prob) => ({prob: newProb, color: prob.color}))
      return [...updatedProbs, {prob: newProb, color: getRandomColor()}]
    })
  }

  function removeColor() {
    setProbs((prev) => {
      if (prev.length <= 2) return prev
      const newProb = 1 / (prev.length - 1)
      const updatedProbs = prev.slice(0, -1).map((prob) => ({prob: newProb, color: prob.color}))
      return updatedProbs
    })
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center gap-10 px-6 text-center">
      <div className="max-w-2xl space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">Probability · Tooling</p>
        <h1 className="text-4xl font-bold">Wheelspin probability editor</h1>
        <p className="text-white/70">I use this interactive control to prototype reward mechanics and pricing wheels. Drag the handles to redistribute odds, then spin the wheel to preview outcomes.</p>
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <div id="wheelspin-circle" className="overflow-hidden rounded-full size-100" aria-live="polite" style={{backgroundImage: `conic-gradient(${gradientParts.join(", ")})`}} />
        <div className="pointer-events-none absolute -top-6 h-10 w-5 rounded-b-full bg-white shadow-xl" aria-hidden />
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-white/60">Drag the handles on the slider to rebalance the distribution.</p>
        <div className="flex items-center justify-center">
          <div ref={barRef} onMouseDown={(e) => handleMouseDown(e)} className="relative h-10 w-80 rounded" style={{backgroundImage: `linear-gradient(to right, ${gradientParts.join(", ")})`}}>
            {boundaryPercents.map((boundary, index) => (
              <button
                key={`handle-${index}`}
                type="button"
                className="absolute top-1/2 h-6 w-1 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize bg-white/80"
                style={{left: `${boundary}%`}}
                onMouseDown={(e) => {
                  e.stopPropagation()
                  setActiveHandle(index)
                  updateHandlePosition(e.clientX, index)
                }}
              />
            ))}
          </div>
          <Plus onClick={() => addColor()} className="cursor-pointer bg-white text-black rounded-full m-2" />
        </div>

        <button className="px-6 py-3 cursor-pointer bg-white text-black rounded-full font-semibold uppercase tracking-[0.3em]" onClick={() => spinWheel()}>
          Spin
        </button>
      </div>
    </main>
  )
}
