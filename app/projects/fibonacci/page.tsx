"use client"
import React, {useState} from "react"

export default function page() {
  const [num, setNum] = useState(0)

  function fibonacci(n: number) {
    return Math.round((1 / Math.sqrt(5)) * (((1 + Math.sqrt(5)) / 2) ** n - ((1 - Math.sqrt(5)) / 2) ** n))
  }

  return (
    <main className="bg-black w-full h-screen flex items-center justify-center flex-col">
      <input type="text" className="bg-white text-black" value={num} onChange={(e) => setNum(Number(e.target.value))} />
      {fibonacci(num)}
    </main>
  )
}
