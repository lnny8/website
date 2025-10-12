import Link from "next/link"
import React from "react"

export default function page() {
  const skills = {
    Languages: ["TypeScript", "Python", "Java", "HTML", "GLSL"],
    Frameworks: ["React", "Next.js", "Expo", "OpenCV", "supabase"],
    Website: ["Three.js", "gsap", "motion", "TailwindCSS", "zustand"],
    Development: ["n8n", "Git", "Docker","Hetzner Cloud"],
    Security: ["auth0","HMAC", "JWT", "OAuth"],
    Design: ["UI/UX design", "Figma", "Blender"],
    Platforms: ["replicate", "Stripe API", "coolify"],
    AI: ["Pytorch (learning)", "pybullet (learning)"],
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col pt-40">
      <div>
        <h1 className="text-8xl font-bold text-center">Lenny Muffler</h1>
        <h2 className="text-4xl text-center pt-5 pb-20">software developer</h2>
      </div>

      <h2 className="text-6xl mt-40 font-bold text-center pb-10">knowledge</h2>
      <div className="grid grid-cols-3 gap-10 px-20 mb-20">
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category} className="flex flex-col items-start mb-15 border border-white/20 rounded-2xl">
            <h3 className="text-3xl text-center my-2 mb-5 w-full">{category}</h3>
            <div className="text-2xl flex flex-col pb-10 w-full h-full">
              {skillList.map((skill) => (
                <span className="pl-10" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
