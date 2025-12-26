import React from "react"
import Image from "next/image"
import Link from "next/link"
import {ArrowLeft} from "lucide-react"
import HoverButton from "../components/hoverButton"

export default function ProjectPage({title, imageUrl, projectUrl, description, stack, text2, date}: {title: string; imageUrl: string; projectUrl: string; description: string; stack: string[]; text2?: string; date?: string}) {
  return (
    <main className="min-h-screen max-w-5xl mx-auto">
      <div className="pt-40 flex justify-between items-center">
        <Link href="/projects" className="flex text-white light:text-black font-light text-sm opacity-60 hover:opacity-100 transition-opacity duration-300 items-center justify-center gap-2">
          <ArrowLeft className="size-4" />
          <span>Back to Projects</span>
        </Link>
        <div className="py-1 px-2 border-white/20 light:border-black/20 border rounded-lg opacity-60">{date ? date : 2025}</div>
      </div>
      <Image className="mt-10 rounded-2xl w-full" width={1000} src={imageUrl} height={600} alt={title} />
      <div className="flex mt-10 items-center justify-between">
        <h1 className="text-5xl font-clash font-medium pb-4">{title}</h1>
        <Link href={projectUrl} className="w-42 h-12 relative">
          <HoverButton text1="Check it out" text2={text2 ?? title} />
        </Link>
      </div>
      <div className="pt-10 max-w-4xl">
        <p>{description}</p>
        <div className="flex gap-3 mt-5">
          {stack.map((stack) => (
            <span className="rounded-full bg-white/5 light:bg-black/5 px-4 py-1" key={stack}>{stack}</span>
          ))}
        </div>
      </div>
    </main>
  )
}
