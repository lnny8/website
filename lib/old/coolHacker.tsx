"use client"
import React, {useEffect} from "react"

export default function Background() {
  useEffect(() => {
    const canvas = document.querySelector(".background") as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:'\",.<>?/\\`~".split("")
    const fontSize = 16
    const columns = Math.floor(width / fontSize)
    const drops = Array(columns).fill(0)
    function draw() {
      if (!ctx) return
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = "#0f0"
      ctx.font = fontSize + "px monospace"
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }
    const interval = setInterval(draw, 33)
    window.addEventListener("resize", () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    })
    return () => {
      clearInterval(interval)
    }
  }, [])

  return <canvas className="background fixed -z-100 w-screen h-screen"></canvas>
}
