import React from "react"
import Image from "next/image"
import Link from "next/link"
import HoverButton from "./tutorials/hover-button/button"

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <span className="font-clash font-black text-9xl flex">
        4<Image src="/images/smiley.png" alt="Smiley Face" width={128} height={128} />4
      </span>
      <h1 className="mt-5 font-bold text-3xl">Oops! Page not found.</h1>
      <h2 className="mt-3 text-white/70 light:text-black/70">We couldn't find the page you're looking for. Please check the URL and try again.</h2>
      <Link className="mt-5 font-bold cursor-pointer" href={"/"}><HoverButton text1={"Back to Homepage"} text2={"Go home"} /></Link>
    </main>
  )
}
