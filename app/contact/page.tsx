"use client"
import ContactBackground from "@/lib/ui/blob"
import {Github, Instagram, Linkedin} from "lucide-react"
import React, {Suspense} from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export default function ContactPage() {

  useGSAP(() => {
    if (typeof window === "undefined") return
    const tl = gsap.timeline()
    tl.to("#contact-bgcover", {opacity: 0, duration: 5, backdropFilter: "blur(0px)", ease: "power2.out"})
  })


  const socialLinks = [
    {href: "https://linkedin.com/in/lennymuffler", label: "LinkedIn", icon: Linkedin},
    {href: "https://github.com/lnny8", label: "GitHub", icon: Github},
    {href: "https://instagram.com/lnny.8", label: "Instagram", icon: Instagram},
  ]
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.12),_transparent_60%)]" />

      <div className="pointer-events-none absolute inset-0 -z-40 opacity-80">
        <Suspense fallback={<div className="h-full w-full bg-black" />}>
          <div id="contact-bgcover" className="absolute inset-0" style={{backdropFilter: "blur(100px)"}} />
          <ContactBackground />
        </Suspense>
      </div>

      <section className="relative px-6 pt-40 pb-28">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-10">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.4em] text-white/45">Collaborations</span>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">Let&apos;s build something bold</h1>
              <p className="max-w-xl text-white/70">I partner with teams to craft web experiences that blend motion, clarity, and technical depth. From realtime dashboards to creative experiments, I focus on shipping polished work that feels alive yet dependable.</p>
              <p className="max-w-xl text-white/60">Tell me about your next idea—what problem it solves, how fast you want to move, and the feeling you want people to walk away with. I&apos;ll help map the path from first prototype to launch.</p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-white/60">
              {["Motion-first UI", "WebGPU & 3D", "Intelligent tooling", "Product strategy"].map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 p-10 backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.2),_transparent_70%)]" />
            <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(140deg,_rgba(56,189,248,0.15),_transparent_55%)]" />

            <div className="space-y-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/45">Email</p>
                <a href="mailto:lenny@muffler.me" className="mt-3 inline-flex items-center gap-3 text-2xl font-semibold text-white transition hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
                  lenny@muffler.me
                </a>
              </div>

              <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">Availability</p>
                  <p className="mt-2 text-sm text-white/75">
                    Booking new projects from <span className="font-semibold text-white">November 2025</span>.
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">Location</p>
                  <p className="mt-2 text-sm text-white/75">Working remotely (CET) with global clients and distributed teams.</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/45">Social</p>
                <nav aria-label="Social links" className="mt-4 grid gap-3 sm:grid-cols-3">
                  {socialLinks.map(({href, label, icon: Icon}) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="group flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/70 transition hover:border-white/25 hover:text-white">
                      <Icon className="h-5 w-5 transition group-hover:scale-110" />
                      <span>{label}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
