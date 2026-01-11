import Image from "next/image"
import React from "react"

export default function MoreSoon() {
  return (
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 content-center place-items-center rounded-3xl border border-white/5 light:border-black/5 bg-white/5 light:bg-black/5">
      <div className="md:pl-42 px-10 md:px-0 pt-10 md:pt-0">
        <h1 className="text-6xl font-clash tracking-tight font-semibold">More content coming soon...</h1>
        <p className="mt-2 text-lg text-white/70 light:text-black/70 font-light">Stay tuned for updates.</p>
      </div>
      <Image src="/images/worker.png" className="pt-8 md:mr-42" alt="more content coming soon" width={300} height={400} />
    </div>
  )
}
