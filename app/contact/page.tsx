"use client"
import {Sparkle} from "lucide-react"
import React from "react"
import HoverButton from "../tutorials/hover-button/button"
import Image from "next/image"
import {Facebook, Github, Instagram, Linkedin, Mail, Twitter} from "lucide-react"
import Link from "next/link"
import SocialSpan from "@/lib/social-span"

export default function Page() {
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Handle form submission logic here
  }

  return (
    <main className="min-h-screen max-w-7xl mx-auto">
      <span className="text-lime pt-40 flex gap-3 text-sm tracking-wider items-center font-clash">
        <Sparkle className="size-4" />
        CONNECT WITH ME
      </span>
      <h1 className="text-5xl font-clash font-medium mt-5 max-w-lg">Let's start a project together</h1>

      <div className="grid grid-cols-2 gap-10 mt-10">
        <form onSubmit={handleSubmit} className="flex flex-col relative">
          <label className="text-sm font-medium" htmlFor="contact-fullName">
            Full Name
          </label>
          <input type="text" id="contact-fullName" className="border-1 border-white/10 light:border-black/10 rounded-xl light:border-black/10-xl mt-2 px-4 py-2 focus:outline-none focus:ring-2 ring-lime" />
          <label className="text-sm font-medium mt-5" htmlFor="contact-email">
            Email
          </label>
          <input type="text" id="contact-email" className="border-1 border-white/10 light:border-black/10 rounded-xl mt-2 px-4 py-2 focus:outline-none focus:ring-2 ring-lime" />
          <label className="text-sm font-medium mt-5" htmlFor="contact-message">
            Message
          </label>
          <textarea rows={4} id="contact-message" className="border-1 border-white/10 light:border-black/10 rounded-xl mt-2 px-4 py-2 focus:outline-none focus:ring-2 ring-lime" />
        </form>

        <div className="bg-woodsmoke-light rounded-3xl p-5 flex flex-col h-full justify-between light:bg-white">
          <span className="px-4 py-2 flex gap-3 items-center justify-center rounded-full bg-lime/10 w-max">
            <div className="rounded-full size-2 bg-lime relative">
              <div className="bg-lime rounded-full absolute inset-0 animate-[blink_1s_infinite]" />
            </div>
            <span className="text-sm">Available for work</span>
          </span>

          <Image src="/logo/logo_white.png" alt="Lenny Muffler Logo" width={100} height={100} className="light:hidden border-1 border-white/10 light:border-black/10 p-2 rounded-full" />
          <Image src="/logo/logo_black.png" alt="Lenny Muffler Logo" width={100} height={100} className="hidden light:block border-1 border-white/10 light:border-black/10 p-2 rounded-full" />

          <p className="text-white/70 light:text-black/70 font-light">My inbox is always open, Whether you have a project or just want to say Hi. I would love to hear from you. Feel free to contact me and I'll get back to you.</p>

          <SocialSpan />
        </div>
        <div className="relativemt-10 w-42">
          <HoverButton text1="Submit" text2="I'm curious" />
        </div>
      </div>
    </main>
  )
}
