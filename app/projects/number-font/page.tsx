"use client"
import Image from "next/image"
import React, {useEffect} from "react"

export default function page() {
  const [number, setNumber] = React.useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return
    window.addEventListener("keydown", (e) => {
      if (e.key >= "0" && e.key <= "9") {
        setNumber(Number(e.key))
      }
    })
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center flex-col px-6">
        <h1 className="text-4xl font-bold text-center">Digital Clock Number Font</h1>
        <p className="text-center mt-4 text-white/70">Press a number key (0-9) to see the corresponding number font.</p>
        <Image src={`/numbers/${number}.png`} alt="Number Font" width={200} height={200} className="mt-4" />
      </div>
    </main>
  )
}
