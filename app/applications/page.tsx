import Link from "next/link"
import React from "react"
import Image from "next/image"

export default function Page() {
    const applications = [
        {
            href: "/applications/sorting-algorythm-visualizer",
            title: "Sorting Algorithm Visualizer",
            image: "/test/sorting.png"
        }
    ]

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      {applications.map((app) => (
        <Link key={app.href} href={app.href} className="bg-white p-4 rounded-lg shadow-md text-black flex flex-col items-center mx-4 hover:scale-105 transition-transform">
          <span>{app.title}</span>
          <Image alt={app.title} width={200} height={200} src={app.image} />
        </Link>
      ))}
    </main>
  )
}
