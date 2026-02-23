import {Linkedin, Github, Instagram, Mail} from "lucide-react"
import Link from "next/link"
import React from "react"

import { socials } from "../data/data"

export default function SocialSpan() {
  return (
    <div className="flex gap-4 group">
      <Link href={socials.linkedin} target="_blank" aria-label="LinkedIn">
        <Linkedin className="size-5 text-white/70 light:text-black/70 hover:text-white group-hover:opacity-50 hover:opacity-100 transition-opacity duration-300" />
      </Link>
      <Link href={socials.github} target="_blank" aria-label="GitHub">
        <Github className="size-5 text-white/70 light:text-black/70 hover:text-white group-hover:opacity-50 hover:opacity-100 transition-opacity duration-300" />
      </Link>
      <Link href={socials.instagram} target="_blank" aria-label="Instagram">
        <Instagram className="size-5 text-white/70 light:text-black/70 hover:text-white group-hover:opacity-50 hover:opacity-100 transition-opacity duration-300" />
      </Link>
      <Link href={socials.email} target="_blank" aria-label="Email">
        <Mail className="size-5 text-white/70 light:text-black/70 hover:text-white group-hover:opacity-50 hover:opacity-100 transition-opacity duration-300" />
      </Link>
    </div>
  )
}
