"use client"
import Robot from "@/lib/robot/robot"
import React from "react"

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden px-6 pb-20 pt-24 md:px-0">
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <div className="relative flex h-88 w-full max-w-88 items-center justify-center md:h-120 md:max-w-120">
          <Robot />
        </div>

        <section className="mt-8 w-full">
          <div className="mb-6">
            <h1 className="text-4xl font-clash font-medium md:text-5xl">Animated Robot</h1>
            <p className="mt-3 max-w-2xl text-white/70 light:text-black/70">Key parts pulled out of the devlog instead of showing the full write-up.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
            <article className="rounded-4xl bg-woodsmoke-light p-6 shadow-(--inset_shadow) light:bg-athensgray-light md:col-span-3 md:row-span-1 md:p-8">
              <span className="text-sm uppercase tracking-[0.2em] text-white/40 light:text-black/40">Total Build Time</span>
              <div className="mt-4 flex items-end gap-3">
                <span className="text-6xl font-clash font-medium leading-none md:text-7xl">8.5h</span>
                <span className="pb-2 text-white/50 light:text-black/50">from model to interaction</span>
              </div>
              <p className="mt-6 max-w-md text-white/70 light:text-black/70">Most of the time went into the 3D pipeline and the interaction layer rather than the final page layout.</p>
            </article>

            <article className="rounded-4xl bg-woodsmoke-light p-6 shadow-(--inset_shadow) light:bg-athensgray-light md:col-span-3 md:row-span-1 md:p-8">
              <span className="text-sm uppercase tracking-[0.2em] text-white/40 light:text-black/40">Pipeline</span>
              <p className="mt-4 text-2xl font-clash font-medium md:text-3xl">Blender to pmndrs to React Three Fiber</p>
              <p className="mt-3 max-w-lg text-white/70 light:text-black/70">Modeling, bones, weight painting, animation setup, GLTF conversion, and final browser integration.</p>
            </article>

            <article className="rounded-4xl bg-woodsmoke-light p-6 shadow-(--inset_shadow) light:bg-athensgray-light md:col-span-2 md:row-span-1 md:p-8">
              <span className="text-sm uppercase tracking-[0.2em] text-white/40 light:text-black/40">3D Work</span>
              <p className="mt-4 text-3xl font-clash font-medium">3h</p>
              <p className="mt-3 text-white/70 light:text-black/70">2h modeling, 30m rigging and weight paint, 30m animation pass.</p>
            </article>

            <article className="rounded-4xl bg-woodsmoke-light p-6 shadow-(--inset_shadow) light:bg-athensgray-light md:col-span-2 md:row-span-1 md:p-8">
              <span className="text-sm uppercase tracking-[0.2em] text-white/40 light:text-black/40">Frontend Work</span>
              <p className="mt-4 text-3xl font-clash font-medium">4h</p>
              <p className="mt-3 text-white/70 light:text-black/70">1h conversion, 1h material rebuild, 2h mouse interaction and scene behavior.</p>
            </article>

            <article className="rounded-4xl bg-woodsmoke-light p-6 shadow-(--inset_shadow) light:bg-athensgray-light md:col-span-2 md:row-span-1 md:p-8">
              <span className="text-sm uppercase tracking-[0.2em] text-white/40 light:text-black/40">Polish</span>
              <p className="mt-4 text-3xl font-clash font-medium">1.5h</p>
              <p className="mt-3 text-white/70 light:text-black/70">Blink animation, dark/light mode color changes, plus a short expertise page cleanup afterwards.</p>
            </article>

            <article className="rounded-4xl bg-woodsmoke-light p-6 shadow-(--inset_shadow) light:bg-athensgray-light md:col-span-6 md:row-span-1 md:p-8">
              <span className="text-sm uppercase tracking-[0.2em] text-white/40 light:text-black/40">Highlights</span>
              <p className="mt-4 text-2xl font-clash font-medium md:text-3xl">Features</p>
              <p className="mt-3 max-w-4xl text-white/70 light:text-black/70">The final result combines cursor tracking, blink behavior, theme-aware materials, rebuilt shaders, homepage integration, and a follow-up refinement pass for the expertise page.</p>
            </article>
          </div>
        </section>
      </div>
    </main>
  )
}
