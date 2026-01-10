import Image from "next/image"
import React from "react"

const sections = [
  {
    title: "Web Development",
    description: "Building modern, performant web experiences with React, Next.js, and motion design.",
    images: ["/interests/websites3.png", "/interests/websites2.png", "/interests/websites1.png"],
  },
  {
    title: "Server Infrastructure",
    description: "Managing Linux servers, databases, and automation workflows for reliable deployment.",
    images: ["/interests/server1.png", "/interests/server2.png", "/interests/server3.png"],
  },
  {
    title: "Hardware & PCB Design",
    description: "Prototyping circuits, designing PCBs, and creating physical interfaces.",
    images: ["/interests/hardware1.png", "/interests/hardware2.png", "/interests/hardware3.png"],
  },
  {
    title: "3D Modeling & Printing",
    description: "Designing, rendering, printing custom components using CAD software.",
    images: ["/interests/3d1.png", "/interests/3d2.png", "/interests/3d3.png"],
  },
  {
    title: "Creative Coding",
    description: "Mobile app development and interactive experiences through code.",
    images: ["/interests/creative1.png", "/interests/creative2.png", "/interests/creative3.png"],
  },
  {
    title: "Automation & Scripting",
    description: "Creating scripts and automations in n8n to streamline workflows and increase efficiency.",
    images: ["/interests/automation1.png", "/interests/automation2.png", "/interests/automation3.png"],
  },
]

const about = [
  {
    title: "age",
    description: "17",
    icon: "🎂",
  },
  {
    title: "location",
    description: "Stuttgart, Germany",
    icon: "📍",
  },
  {
    title: "education",
    description: "High School Student",
    icon: "🎓",
  },
]

export default function Page() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto w-full pb-24">
      <section className="pt-32 px-6 md:px-0">
        <h1 className="text-6xl font-clash font-semibold leading-tight mb-6">About me</h1>
        <p className="text-xl text-white/80 light:text-black/80 leading-relaxed">
          Hi, I'm Lenny Muffler, a 17-year-old high school student from Stuttgart, Germany with a passion for technology and creativity. From building web applications to designing hardware prototypes, I love exploring new ways to bring ideas to life through code and design. When
          I'm not coding, you can find me tinkering with 3D modeling or experimenting with automation workflows. I'm always eager to learn and take on new challenges in the tech world.
        </p>
      </section>

      <section className="px-6 md:px-0 mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {about.map((item) => (
          <div key={item.title} className="rounded-xl border border-white/5 light:border-black/5 bg-white/5 light:bg-black/5 p-4 flex flex-col items-center text-center gap-3">
            <div className="text-3xl">{item.icon}</div>
            <h3 className="text-xl font-clash font-semibold">{item.description}</h3>
            <p className="text-white/70 light:text-black/70 text-sm capitalize">{item.title}</p>
          </div>
        ))}
      </section>

      {sections.map((section, idx) => (
        <section key={section.title} className="px-6 md:px-0 mt-24">
          <h2 className="text-4xl md:text-5xl font-clash font-semibold mb-4">{section.title}</h2>
          <p className="text-lg text-white/70 light:text-black/70 mb-8 max-w-2xl">{section.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {section.images.map((img, imgIdx) => (
              <div key={imgIdx} className="relative aspect-3/2 group rounded-2xl overflow-hidden cursor-pointer bg-white/5 light:bg-black/5 border border-white/10 light:border-black/10">
                <Image src={img} alt={`${section.title} ${imgIdx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* <section className="max-w-6xl mx-auto px-6 md:px-0 mt-24">
        <div className="rounded-3xl border border-white/10 light:border-black/10 bg-white/5 light:bg-black/5 p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <h3 className="text-3xl font-clash font-semibold">Let's work together</h3>
            <p className="text-white/70 light:text-black/70">Available for projects and collaborations.</p>
          </div>
          <a className="inline-flex items-center justify-center rounded-full px-8 py-4 bg-lime text-woodsmoke font-clash font-medium hover:bg-lime/90 transition-colors duration-200" href="mailto:lenny@lnny.dev">
            Get in touch
          </a>
        </div>
      </section> */}
    </main>
  )
}
