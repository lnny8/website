"use client"
import React, {useState} from "react"
import {abc} from "@/lib/data/ansi"
import HoverButton from "@/lib/components/hoverButton"

export default function Page() {
  const [input, setInput] = useState("")

  function getCodes(text: string) {
    return text
      .toLowerCase()
      .split("")
      .map((char) => char.charCodeAt(0))
      .join(" ")
  }

  function getAscii(text: string) {
    const glyphs = text.split(" ").map((asciiCode) => abc[Number(asciiCode) as keyof typeof abc] ?? "")
    const glyphLines = glyphs.map((glyph) => glyph.split("\n"))
    const maxLines = Math.max(0, ...glyphLines.map((lines) => lines.length))

    const mergedLines = Array.from({length: maxLines}, (_, lineIndex) => {
      return glyphLines.map((lines) => lines[lineIndex] ?? "").join("")
    })

    return mergedLines.join("\n")
  }

  function getText(text: string) {
    const codes = getCodes(text)
    const ascii = getAscii(codes)
    return ascii
  }

  const outputAscii = getText(input !== "" ? input : " ")

  return (
    <main className="min-h-screen max-w-6xl mx-auto md:px-0 px-6 pt-32 pb-10 flex flex-col">
      <h1 className="text-6xl font-clash font-semibold leading-tight">ASCII Generator</h1>
      <p className="mt-3 text-white/70 light:text-black/70 font-light">Type text and convert it into ASCII art.</p>

      <section className="mt-10 rounded-3xl bg-woodsmoke-light shadow-(--inset_shadow) p-6 light:bg-athensgray-light border border-white/10 light:border-black/10">
        <label className="text-sm font-medium">Enter text</label>
        <input
          type="text"
          onChange={(e) => setInput(e.currentTarget.value)}
          value={input}
          className="mt-2 w-full rounded-xl bg-woodsmoke-light shadow-(--inset_shadow) border-white/10 light:border-black/10 light:bg-athensgray-light px-4 py-3 text-sm focus:outline-none focus:ring-2 ring-lime"
          placeholder="Type something..."
        />

        <pre className="mt-6 whitespace-pre overflow-x-auto font-mono md:text-xs/3.5 text-[8px]/2.5 rounded-xl bg-woodsmoke-dark/60 light:bg-athensgray px-4 py-4 border border-white/10 light:border-black/10">{outputAscii}</pre>
        <div className="flex gap-4 mt-5">
          <button className="w-42 h-12" onClick={() => navigator.clipboard.writeText(outputAscii)}>
            <HoverButton text1="Copy ASCII" text2="Copied?" />
          </button>
        </div>
      </section>
    </main>
  )
}
