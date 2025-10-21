import React from "react"
import Link from "next/link"
import Card from "@/lib/ui/magic-card"
import {ArrowLeft} from "lucide-react"

const topicGroups = [
  {
    title: "Learning Paradigms",
    skillList: ["Reinforcement Learning", "Policy Gradients", "Exploration vs Exploitation"],
    color: "#22c55e",
  },
  {
    title: "Decision Frameworks",
    skillList: ["Markov Decision Processes", "State Value Estimation", "Monte Carlo Forecasting"],
    color: "#38bdf8",
  },
  {
    title: "Simulation & Tooling",
    skillList: ["MuJoCo", "Environment Instrumentation", "Trajectory Analysis"],
    color: "#f97316",
  },
]

const deepDiveTopics = [
  {
    title: "Reinforcement Learning",
    description: "Training an agent through rewards and penalties to uncover strategies that maximise long-term return.",
    highlight: "Reward-driven behaviour",
  },
  {
    title: "Markov Decision Processes",
    description: "Structuring environments as states, actions, and transitions so policies can reason about future rewards.",
    highlight: "Stateful modelling",
  },
  {
    title: "MuJoCo",
    description: "Fast, differentiable physics that lets complex control policies be stress-tested in high-fidelity worlds.",
    highlight: "Realistic simulation",
  },
  {
    title: "Exploration vs Exploitation",
    description: "Designing schedulers and bonuses that balance curiosity for new data with refining known winning moves.",
    highlight: "Adaptive curiosity",
  },
  {
    title: "Policy Gradient Methods",
    description: "Optimising policies directly and stably via variance reduction, baselines, and trust-region style updates.",
    highlight: "Direct optimisation",
  },
  {
    title: "Monte Carlo Methods",
    description: "Leveraging random rollouts to estimate return distributions when analytical solutions are out of reach.",
    highlight: "Probabilistic insight",
  },
]

const processSteps = [
  {
    title: "Model the Environment",
    description: "Translate the system into an MDP with meaningful state features and reward signals.",
    accent: "1",
  },
  {
    title: "Simulate & Explore",
    description: "Prototype policies inside MuJoCo, tuning exploration schedules to surface surprising behaviours.",
    accent: "2",
  },
  {
    title: "Optimise & Evaluate",
    description: "Apply policy gradients and Monte Carlo rollouts, then benchmark against baselines for steady gains.",
    accent: "3",
  },
]

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_55%)]" />

      <section className="relative px-6 pb-24 pt-32 sm:pt-40">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <Link href="/" className="group inline-flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-white">
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
            Back to home
          </Link>
          <span className="mt-10 text-xs uppercase tracking-[0.5em] text-white/40">AI Knowledge Base</span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">Bringing intelligent behaviour to life</h1>
          <p className="mt-6 max-w-3xl text-white/70">I combine formal decision theory with hands-on simulation work to build agents that learn reliably. Here is how those pieces connect and the principles I lean on when shaping new environments or policies.</p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Focus Areas</h2>
            <p className="mt-4 text-white/60">A snapshot of the pillars that guide my reinforcement learning work.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topicGroups.map((topic, index) => (
              <Card key={topic.title} color={topic.color} id={`ai-skillblock-${index}`} scrambleList={false} skillList={topic.skillList} title={topic.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.6fr_1fr] lg:items-start">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <h3 className="text-2xl font-semibold tracking-tight">From theory into practice</h3>
              <p className="mt-4 text-white/70">
                Building capable agents means pairing rigorous models with fast feedback. I sketch the MDP, simulate it in MuJoCo, and then iterate on rewards, exploration schedules, and policy updates until learning curves stay smooth and reliable.
              </p>
              <p className="mt-4 text-white/50">The cards on the right break down the tools and mental models I return to when tackling a fresh control problem.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {deepDiveTopics.map((topic) => (
                <article key={topic.title} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:border-white/30 hover:bg-white/10">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">{topic.highlight}</span>
                  <h4 className="mt-4 text-xl font-semibold tracking-tight">{topic.title}</h4>
                  <p className="mt-3 text-sm text-white/70">{topic.description}</p>
                  <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_65%)] opacity-0 transition duration-300 hover:opacity-100" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How I approach new agents</h2>
            <p className="mt-4 text-white/60">A lightweight loop that keeps experimentation purposeful and measurable.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {processSteps.map((step) => (
              <div key={step.title} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-lg font-semibold text-white/70">{step.accent}</div>
                <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm text-white/70">{step.description}</p>
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.1),_transparent_65%)]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
