import {Facebook, Instagram, Linkedin, Mail, Twitter, X} from "lucide-react"
import React from "react"
import Link from "next/link"

export default function Footer() {
  const sections = [
    {name: "Start", link: "#start"},
    {name: "Knowledge", link: "#knowledge"},
    {name: "Projects", link: "#projects"},
    {name: "Tutorials", link: "#tutorials"},
  ]
  const projects = [
    {name: "Lonui AI Website", link: "/projects/lonui"},
    {name: "Project Two", link: "#project-two"},
  ]
  const tutorials = [
    {name: "Tutorial One", link: "#tutorial-one"},
    {name: "Tutorial Two", link: "#tutorial-two"},
  ]

  return (
    <footer className="w-full py-10 flex flex-col items-center justify-center gap-4 mt-20">
      <div className="flex justify-between w-full max-w-5xl pt-10">
        <div className="flex flex-col">
          <span className="font-bold text-2xl">Lenny Muffler</span>
          <span>Software Developer</span>
        </div>
        <div className="flex flex-col gap-2 pb-4">
          <span className="font-bold text-xl">Home</span>
          {sections.map((section) => (
            <a key={section.name} className="font-light" href={"/" + section.link}>
              {section.name.toUpperCase()}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2 pb-4">
          <span className="font-bold text-xl">Projects</span>
          {projects.map((section) => (
            <a key={section.name} className="font-light" href={"/" + section.link}>
              {section.name.toUpperCase()}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2 pb-4">
          <span className="font-bold text-xl">Tutorials</span>
          {tutorials.map((section) => (
            <a key={section.name} className="font-light" href={"/" + section.link}>
              {section.name.toUpperCase()}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-5xl bg-white/40 h-[2px] w-full rounded-full my-20" />

      <div className="w-full max-w-5xl flex flex-col gap-5 items-center justify-center">
        <div className="flex items-center justify-center gap-5">
          <Link href={"mailto:lenny@lenny.website"} className="p-3 border-1 border-white/20 rounded-4xl">
            <Mail />
          </Link>
          <Link href={"linkedin.com/in/lennymuffler"} className="p-3 border-1 border-white/20 rounded-4xl">
            <Linkedin />
          </Link>
        </div>
        <span>Copyright © 2025 Lenny Muffler</span>
      </div>
    </footer>
  )
}
