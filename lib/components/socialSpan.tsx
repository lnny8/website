import {Linkedin, Github, Instagram, Mail} from "lucide-react"
import Link from "next/link"
import React from "react"

export default function SocialSpan() {
  return (
    <div className="flex gap-4 group">
      <Link href="https://linkedin.com/in/lennymuffler" target="_blank" aria-label="LinkedIn">
        <Linkedin className="size-5 text-white/70 light:text-black/70 hover:text-white group-hover:opacity-50 hover:opacity-100 transition-opacity duration-300" />
      </Link>
      <Link href="https://github.com/lnny8" target="_blank" aria-label="GitHub">
        <Github className="size-5 text-white/70 light:text-black/70 hover:text-white group-hover:opacity-50 hover:opacity-100 transition-opacity duration-300" />
      </Link>
      <Link href="https://instagram.com/lnny.8" target="_blank" aria-label="Instagram">
        <Instagram className="size-5 text-white/70 light:text-black/70 hover:text-white group-hover:opacity-50 hover:opacity-100 transition-opacity duration-300" />
      </Link>
      <Link href="mailto:lenny@lnny.dev" target="_blank" aria-label="Email">
        <Mail className="size-5 text-white/70 light:text-black/70 hover:text-white group-hover:opacity-50 hover:opacity-100 transition-opacity duration-300" />
      </Link>
    </div>
  )
}
