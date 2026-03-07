import Image from "next/image"

const stats = [
  {
    label: "Sprint",
    value: "5 days",
    description: "A full holiday stretch spent almost entirely on concept work, CAD planning, and production research.",
  },
  {
    label: "Core Input",
    value: "4 switches",
    description: "Cherry MX mechanical switches act as the main input surface for menus, games, and logic experiments.",
  },
  {
    label: "System",
    value: "ESP32-C3",
    description: "The concept is built around a compact controller with battery power, OLED UI, LEDs, and wireless pairing.",
  },
  {
    label: "Disciplines",
    value: "CAD + HW + UI",
    description: "The project pushed into industrial design, embedded planning, rendering, and beginner electronics work.",
  },
]

const pillars = [
  {
    title: "Portable game object",
    text: "QUAD·IO is imagined as a small standalone device for tactile mini-games, memory challenges, rhythm prompts, and simple logic interactions.",
  },
  {
    title: "Clean switch-driven UI",
    text: "A compact OLED display is navigated entirely through the four switches, keeping the interface simple and tightly linked to the physical hardware.",
  },
  {
    title: "Visual feedback in the body",
    text: "Diffuse underglow and per-switch lighting turn the enclosure itself into part of the interaction system rather than just a shell around electronics.",
  },
]

const buildLog = [
  {
    title: "Complete enclosure planning in CAD",
    image: "/quadio/quad1.png",
    alt: "Initial CAD render of the QUAD·IO enclosure",
    text: "The first major step was building the full device in Plasticity. That meant more than shaping the outside. I worked through the internal layout at the same time, checking cable runs, assembly order, wall thickness, tolerances, and how each part could realistically fit without turning the shell into something impossible to build.",
  },
  {
    title: "Balancing form and internal constraints",
    image: "/quadio/quad2.png",
    alt: "Detailed CAD view showing the QUAD·IO internal structure",
    text: "A lot of the design time went into iteration. The goal was a minimal, compact object, but every visual decision had to survive practical constraints like component clearance, accessible mounting points, and enough space to assemble and service the device cleanly.",
  },
  {
    title: "Rendering to test materials and mood",
    image: "/quadio/quad3.png",
    alt: "Rendered Blender visualization of QUAD·IO",
    text: "While refining the hardware concept, I also moved the model into Blender to test how the object feels visually. That let me explore materials, lighting, and the overall atmosphere of the device before any physical build work started.",
  },
  {
    title: "Material research with functional intent",
    image: "/quadio/quad4.png",
    alt: "Material and lighting study for the QUAD·IO concept",
    text: "I looked at materials not just for appearance but for behavior. A TPU anti-slip mat on the bottom improves grip, while a light-diffusing polycarbonate underside supports the underglow effect. The broader aim was to make the object feel deliberate, durable, and good in hand.",
  },
  {
    title: "Custom keycaps for the device proportions",
    image: "/quadio/quad5.png",
    alt: "Custom QUAD·IO keycap design render",
    text: "The keycaps were also designed specifically for the project. Matching them to the enclosure proportions helped the device feel like one coherent object instead of a generic electronics box with standard off-the-shelf parts dropped into it.",
  },
  {
    title: "Power system and component selection",
    image: "/quadio/quad6.png",
    alt: "QUAD·IO render focused on internal electronics layout",
    text: "A large part of the research phase was choosing components and defining the power system. The concept uses a 3.7 V lithium battery with a boost converter to step up to 5 V, which keeps the device portable while still supporting the electronics stack I had in mind.",
  },
  {
    title: "Charging integration inside a compact shell",
    image: "/quadio/quad7.png",
    alt: "QUAD·IO render showing charging module placement",
    text: "I integrated a TP4056 charging module into the layout and checked that charging access, spacing, and overall packaging still made sense. Keeping everything compact without making charging awkward or unsafe was one of the recurring layout constraints.",
  },
  {
    title: "A solid concept foundation after the sprint",
    image: "/quadio/quad8.png",
    alt: "Refined QUAD·IO concept render after the first sprint",
    text: "By the end of those five days, the project had a clear enclosure direction, a believable internal architecture, stronger visualizations, and a practical plan for materials and power. That made the next phases feel much less speculative.",
  },
  {
    title: "Learning the full hardware pipeline from zero",
    image: "/quadio/quad10.png",
    alt: "High fidelity render of the final QUAD·IO concept",
    text: "After the concept phase, I had to learn the rest from scratch: circuits, Arduino, 3D printing, CAD workflows, and basic PCB work. I also used Blender Cycles to study underglow diffusion and OLED emission more realistically, including a shader setup that isolates luminance values and drives the display through a strong emission pass for a more believable screen effect.",
  },
  {
    title: "Designing the OLED software interface",
    image: "/quadio/quad9.png",
    alt: "OLED UI concept shown on the QUAD·IO display",
    text: "The final step was designing the software layer that would actually appear on the OLED display. I worked on a compact interface language for menus, status views, and game screens that fits the small resolution while still feeling clear and playful. That UI concept helped connect the hardware shell to the actual on-device experience, turning the project from a physical object into a more complete interactive system.",
  },
]

export default function Page() {
  return (
    <main className="min-h-screen px-6 pb-20 pt-24 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div className="rounded-4xl bg-woodsmoke-light h-full light:bg-athensgray-light p-8 shadow-(--inset_shadow) md:p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-white/40 light:text-black/40">Hardware Prototype</p>
            <h1 className="mt-5 text-4xl font-clash font-medium tracking-tight md:text-6xl">QUAD·IO</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/72 light:text-black/72 md:text-lg">
              A compact experimental handheld built around an ESP32-C3, four Cherry MX switches, integrated LEDs, battery power, and a small OLED interface. The idea is to turn a minimal physical control surface into a flexible input-output system for tiny games, reactive
              prompts, and embedded logic experiments.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/65 light:text-black/65">
              {["Made in Plasticity", "ESP32-C3", "OLED UI", "Battery powered", "Wireless pairing", "Mechanical switches", "Diffuse underglow"].map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 light:border-black/10 light:bg-black/4">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-4xl bg-woodsmoke-light p-5 shadow-(--inset_shadow) light:bg-athensgray-light md:p-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-black/20 light:border-black/8 light:bg-black/4">
              <Image src="/quadio/quad0.png" alt="Hero render of the QUAD·IO concept" width={1000} height={100} priority className="" />
              <Image src="/quadio/quad1.png" alt="Hero render of the QUAD·IO concept" width={1000} height={200} priority className="" />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-[1.75rem] bg-woodsmoke-light p-6 shadow-(--inset_shadow) light:bg-athensgray-light">
              <p className="text-xs uppercase tracking-[0.24em] text-white/40 light:text-black/40">{stat.label}</p>
              <p className="mt-4 text-3xl font-clash font-medium leading-none">{stat.value}</p>
              <p className="mt-4 text-sm leading-6 text-white/70 light:text-black/70">{stat.description}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="rounded-[1.75rem] shadow-(--inset_shadow) bg-woodsmoke-light p-6 light:bg-athensgray-light">
              <h2 className="text-xl font-clash font-medium md:text-2xl">{pillar.title}</h2>
              <p className="mt-4 text-sm leading-6 text-white/70 light:text-black/70">{pillar.text}</p>
            </article>
          ))}
        </section>

        <section className="rounded-4xl bg-woodsmoke-light p-6 shadow-(--inset_shadow) light:bg-athensgray-light md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-white/40 light:text-black/40">Devlog</p>
            <h2 className="mt-3 text-3xl font-clash font-medium md:text-4xl">How the concept came together</h2>
            <p className="mt-4 text-base leading-7 text-white/70 light:text-black/70">
              The first stretch of work was less about coding and more about compressing a lot of product design, hardware planning, and rendering research into a short intense sprint. Instead of treating the enclosure, electronics, and look as separate problems, I tried to
              design them together from the start.
            </p>
          </div>

          <div className="mt-8 grid gap-5">
            {buildLog.map((entry, index) => (
              <article key={entry.title} className="grid gap-5 rounded-[1.75rem] border border-white/8 bg-white/4 p-4 light:border-black/8 light:bg-black/3 md:grid-cols-[0.92fr_1.08fr] md:p-5">
                <div className={index % 2 === 1 ? "md:order-2" : undefined}>
                  <div className="relative overflow-hidden rounded-[1.35rem] border border-white/8 bg-black/15 light:border-black/8 light:bg-black/4">
                    <Image src={entry.image} alt={entry.alt} width={1400} height={1000} className="aspect-4/3 h-auto w-full object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
                  </div>
                </div>
                <div className="flex flex-col justify-center p-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/38 light:text-black/38">Step {index + 1}</p>
                  <h3 className="mt-3 text-2xl font-clash font-medium md:text-3xl">{entry.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/72 light:text-black/72 md:text-base">{entry.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
