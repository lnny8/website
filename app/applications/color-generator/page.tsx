"use client"
import HoverButton from "@/lib/components/hoverButton"
import React, {useEffect} from "react"

export default function Page() {
  const [brightness, setBrightness] = React.useState(50)
  const [saturation, setSaturation] = React.useState(50)
  const [generate, setGenerate] = React.useState(0)
  const [generatedColor, setGeneratedColor] = React.useState<string | null>(null)
  const [showHash, setShowHash] = React.useState(true)

  useEffect(() => {
    const randomHue = Math.floor(Math.random() * 360)
    const color = `hsl(${randomHue}, ${saturation}%, ${brightness}%)`
    const hexColor = (() => {
      const ctx = document.createElement("canvas").getContext("2d")
      if (!ctx) return null
      ctx.fillStyle = color
      return ctx.fillStyle
    })()
    const finalColor = showHash ? hexColor : hexColor?.replace("#", "")
    setGeneratedColor(finalColor || "")
  }, [brightness, saturation, generate, showHash])

  return (
    <main className="min-h-screen max-w-7xl pt-32 mx-auto flex flex-col">
      <h1 className="text-6xl font-clash font-semibold leading-tight">Color Generator</h1>
      <p className="pt-10">Pick a brightness</p>
      <input type="range" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="ui-range w-32" />
      <p>{brightness}</p>
      <p className="pt-10">Pick a saturation</p>
      <input type="range" value={saturation} onChange={(e) => setSaturation(Number(e.target.value))} className="ui-range w-32" />
      <p>{saturation}</p>
      <span className="pt-10">{generatedColor ? generatedColor : "generating..."}</span>
      <div className="flex gap-5">
        <input type="checkbox" id="showHash" checked={showHash} onChange={() => setShowHash(!showHash)} className="ui-checkbox select-none" />
        <label htmlFor="showHash" className="cursor-pointer select-none">
          Show #
        </label>
      </div>
      <div className="flex gap-5">
        <button className="w-42 h-12 mt-10" onClick={() => navigator.clipboard.writeText(generatedColor || "")}>
          <HoverButton text1="Copy Color" text2="Cool Color :D" />
        </button>
        <button className="w-42 h-12 mt-10" onClick={() => setGenerate((prev) => prev + 1)}>
          <HoverButton text1="Generate again" text2="Generate again" />
        </button>
      </div>
      <div className="mt-6 w-48 h-48 rounded-lg border border-white/10 light:border-black/10" style={{backgroundColor: showHash ? generatedColor! : "#" + generatedColor! || undefined}}></div>
    </main>
  )
}
