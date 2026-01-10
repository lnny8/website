import React from "react"
import Image from "next/image"
import Link from "next/link"
import HoverButton from "@/lib/components/hoverButton"

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <span className="font-clash font-black text-9xl flex">
        4<Image src="/images/smiley.png" alt="Smiley Face" width={128} height={128} />4
      </span>
      <h1 className="mt-8 font-bold text-3xl">Page not found.</h1>
      <h2 className="mt-4 text-white/70 light:text-black/70">Looks like you took a wrong turn. Double-check the URL and give it another try.</h2>
      <Link className="mt-8 h-12 font-bold cursor-pointer" href={"/"}>
        <HoverButton className="px-8" text1={"Back to Homepage"} text2={"Go home"} />
      </Link>
    </main>
  )
}
