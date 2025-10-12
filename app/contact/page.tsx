"use client"
import Game from "@/lib/game"
import {Github, Instagram, Linkedin} from "lucide-react"
import React from "react"

export default function ContactPage() {
  return (
    <main className="relative h-screen overflow-hidden bg-black text-white">
      <section className="max-w-5xl mx-auto px-4 pt-20 pb-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">WORK WITH ME</h1>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
            <div className="space-y-8 text-center md:text-left">
              <div>
                <p className="text-sm uppercase tracking-widest text-zinc-400">Email</p>
                <a href="mailto:lenny@muffler.me" className="mt-2 inline-block text-2xl md:text-3xl font-semibold text-zinc-200 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600 rounded">
                  lenny@muffler.me
                </a>
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest text-zinc-400">Social</p>
                <nav aria-label="Social links" className="mt-3">
                  <ul className="flex items-center justify-center md:justify-start gap-6">
                    <li>
                      <a href="https://linkedin.com/in/lennymuffler" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-lg hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600 transition">
                        <Linkedin className="size-10" />
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/lnny8" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-lg hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600 transition">
                        <Github className="size-10" />
                      </a>
                    </li>
                    <li>
                      <a href="https://instagram.com/lnny.8" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-lg hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600 transition">
                        <Instagram className="size-10" />
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 pb-8">
        <Game />
      </section>
    </main>
  )
}
