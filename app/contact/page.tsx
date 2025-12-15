"use client"
import {Check, Loader2, Sparkle} from "lucide-react"
import React, {useState} from "react"
import HoverButton from "../tutorials/hover-button/button"
import Image from "next/image"
import {Facebook, Github, Instagram, Linkedin, Mail, Twitter} from "lucide-react"
import Link from "next/link"
import SocialSpan from "@/lib/social-span"
import toast from "@/lib/toast"

export default function Page() {
  const [formData, setFormData] = useState({name: "", email: "", message: ""})
  const [loading, setLoading] = useState(false)

  function validEmail() {
    const email = formData.email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  async function sendMessage() {
    if (formData.name.length < 2) return toast("Please enter your name.", "error")
    if (!validEmail()) return toast("Please enter a valid email address.", "error")
    if (formData.message.length < 2) return toast("Please enter a message.", "error")
    setLoading(true)
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify({
          from: "Lenny <hello@lnny.dev>",
          to: ["lenny.muffler@gmail.com"],
          subject: "Message from Portfolio",
          html: `<p>Name: ${formData.name}</p><p>Email: ${formData.email}</p><p>Message: ${formData.message}</p>`,
        }),
      })
      const data = await res.json()
      console.log("email send response", data)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
    toast("Message sent successfully!", "success")
    setFormData({name: "", email: "", message: ""})
  }

  async function fakeMessage() {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    toast("Message sent successfully!", "success")
    setFormData({name: "", email: "", message: ""})
  }

  return (
    <main className="min-h-screen max-w-7xl mx-auto md:px-0 px-6">
      <span className="text-lime pt-40 flex gap-3 text-sm tracking-wider items-center font-clash">
        <Sparkle className="size-4" />
        CONNECT WITH ME
      </span>
      <h1 className="text-5xl font-clash font-medium mt-5 md:max-w-lg">Let's start a project together</h1>

      <div className="grid md:grid-cols-2 gap-10 mt-10">
        <div className="flex flex-col relative">
          <label className="text-sm font-medium" htmlFor="contact-fullName">
            Full Name
          </label>
          <input
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            type="text"
            id="contact-fullName"
            className="border border-white/10 light:border-black/10 rounded-xl light:border-black/10-xl mt-2 px-4 py-2 focus:outline-none focus:ring-2 ring-lime"
          />
          <label className="text-sm font-medium mt-5" htmlFor="contact-email">
            Email
          </label>
          <input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" id="contact-email" className="border border-white/10 light:border-black/10 rounded-xl mt-2 px-4 py-2 focus:outline-none focus:ring-2 ring-lime" />
          <label className="text-sm font-medium mt-5" htmlFor="contact-message">
            Message
          </label>
          <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={4} id="contact-message" className="border border-white/10 light:border-black/10 rounded-xl mt-2 px-4 py-2 focus:outline-none focus:ring-2 ring-lime" />
        </div>

        <div className="bg-woodsmoke-light rounded-3xl p-5 flex flex-col md:gap-0 gap-6 h-full justify-between light:bg-white">
          <span className="px-4 py-2 flex gap-3 items-center justify-center rounded-full bg-lime/10 w-max">
            <div className="rounded-full size-2 bg-lime relative">
              <div className="bg-lime rounded-full absolute inset-0 animate-[blink_1s_infinite]" />
            </div>
            <span className="text-sm">Available for work</span>
          </span>

          <Image src="/logo/logo_white.png" alt="Lenny Muffler Logo" width={100} height={100} className="light:hidden border border-white/10 light:border-black/10 p-2 rounded-full" />
          <Image src="/logo/logo_black.png" alt="Lenny Muffler Logo" width={100} height={100} className="hidden light:block border border-white/10 light:border-black/10 p-2 rounded-full" />

          <p className="text-white/70 light:text-black/70 font-light">My inbox is always open, Whether you have a project or just want to say Hi. I would love to hear from you. Feel free to contact me and I'll get back to you.</p>

          <SocialSpan />
        </div>
        <button disabled={loading} onClick={() => fakeMessage()} className="relative w-42 h-10.5">
          <HoverButton loading={loading} text1="Submit" text2="I'm curious" />
        </button>
      </div>
    </main>
  )
}
