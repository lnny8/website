"use client"
import React from "react"

export default function page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center">Download BlackJack</h1>
      <a href="/games/BlackJack.jar" download className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mt-4">
        Download .jar
      </a>
    </main>
  )
}
