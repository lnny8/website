import Background from "@/lib/background"

export default function Page() {
  const skills = {
    "🧠 Programming Languages": ["JavaScript", "TypeScript", "Python", "Java", "HTML", "GLSL"],
    "🔧 Development": ["n8n", "Git", "Docker", "Hetzner Cloud", "coolify", "replicate"],
    "🔒 Security & Access": ["auth0", "HMAC", "JWT", "OAuth", "Stripe API"],
    "🎨 Design": ["Webdesign", "Mobile Design", "Custom Tkinter", "Figma", "Blender"],
    "🧩 Frameworks": ["React", "Next.js", "Expo", "OpenCV", "supabase"],
    "📚 Libraries": ["Three.js", "GSAP", "Motion", "TailwindCSS", "Pytorch & PyBullet (learning)"],
  }

  return (
    <main className="min-h-screen flex flex-col reflative">
      {/* Hero */}
      <div className="mx-auto max-w-7xl px-6 pt-42">
        <h1 className="text-center text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight">Lenny Muffler</h1>
        <p className="text-center text-xl sm:text-2xl text-white/70 mt-4">software developer</p>
      </div>

      {/* Knowledge */}
      <section className="pt-42">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Knowledge</h2>
            <p className="mt-3 text-white/60 max-w-2xl mx-auto">A concise overview of the technologies and tools I use.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="group relative rounded-2xl p-5 border-1 border-white/10 bg-white/10 backdrop-blur-xl">
                <h3 className="text-lg sm:text-xl font-semibold tracking-wide text-white/90">{category}</h3>
                <div className="my-4 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span className="bg-white/5 items-center rounded-xl px-3 py-1" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="h-200" />
    </main>
  )
}
