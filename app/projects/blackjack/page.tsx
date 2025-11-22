"use client"
import React from "react"

export default function page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center">BlackJack in Java</h1>
      <a href="/files/BlackJack.jar" download className="bg-white text-black mt-20 text-lg tracking-tight font-black px-6 py-4 rounded-2xl cursor-pointer">
        Download .jar
      </a>
    </main>
  )
}
