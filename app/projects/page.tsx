import {projects} from "@/lib/data/projects"
import Link from "next/link"
import React from "react"
import Image from "next/image"

export default function Page() {
  return (
    <main className="min-h-screen w-full max-w-7xl mx-auto flex items-center justify-center">
      <div className="mt-40 grid w-full md:grid-cols-2 gap-10 group/all has-[>a:hover]:[&>a:not(:hover)]:opacity-50">
        {projects.map((project, index) => (
          <Link href={project.link} className={`flex flex-col group md:hover:opacity-100 transition-opacity duration-300 ${index % 2 === 1 ? "md:translate-y-14" : ""}`} key={project.title}>
            <div className="rounded-3xl relative flex items-center aspect-3/2 justify-center mb-3 overflow-hidden" style={{backgroundColor: project.color}}>
              <Image src={project.imageUrl} fill className="group-hover:scale-105 z-1 transition-transform duration-300" alt={"Image of " + project.description} />
              <div
                style={{
                  backgroundImage: `linear-gradient(150deg, transparent 45%, rgba(255,255,255,0.42) 50%, transparent 55%)`,
                  backgroundSize: "400% 100%",
                  backgroundPositionX: "400%",
                }}
                className="absolute inset-0 group-hover:animate-[shinenodelay_0.5s_linear]"
              />
            </div>
            <span className="text-xl font-medium">{project.title}</span>
            <span className="text-sm text-white/70 light:text-black/70 font-light flex items-center justify-between">
              <span>{project.description}</span>
              <span className="text-white/70 light:text-black/70 font-light">{project.date}</span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
