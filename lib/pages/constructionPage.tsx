import HoverButton from "@/lib/components/hoverButton"
import Link from "next/link"
import React from "react"
import Image from "next/image"

export default function ConstructionPage() {
  return <main className="min-h-screen flex flex-col items-center justify-center">
    <Image src="/images/worker.png" alt="Under Construction" width={300} height={300} />
    <span className="text-3xl font-clash text-center">Hi, this site is currently under construction.<br /> Please check back later.</span>
    <Link href={"/"} className="w-42 h-12 mt-10"><HoverButton text1={"Back Home"} text2={"See You Soon"} /></Link>
  </main>
}
