"use client"

import HoverButton from "@/lib/components/hoverButton"
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react"

type Waveform = "sine" | "square" | "sawtooth" | "triangle" | "noise"

type SoundParams = {
  waveform: Waveform
  baseFrequency: number
  frequencySlide: number
  attack: number
  decay: number
  sustainLevel: number
  sustainTime: number
  release: number
  volume: number
  vibratoDepth: number
  vibratoSpeed: number
  noise: number
  filterCutoff: number
  filterResonance: number
}

type NumericParamKey = Exclude<keyof SoundParams, "waveform">

type SliderConfig = {
  key: NumericParamKey
  label: string
  min: number
  max: number
  step: number
  format?: (value: number) => string
}

const defaultParams: SoundParams = {
  waveform: "square",
  baseFrequency: 620,
  frequencySlide: -4,
  attack: 0.02,
  decay: 0.28,
  sustainLevel: 0.45,
  sustainTime: 0.18,
  release: 0.35,
  volume: 0.65,
  vibratoDepth: 0.6,
  vibratoSpeed: 7,
  noise: 0.2,
  filterCutoff: 4800,
  filterResonance: 0.8,
}

const sliderConfigs: SliderConfig[] = [
  {
    key: "baseFrequency",
    label: "Base Pitch",
    min: 60,
    max: 1800,
    step: 1,
    format: (value) => `${Math.round(value)} Hz`,
  },
  {
    key: "frequencySlide",
    label: "Pitch Slide",
    min: -24,
    max: 24,
    step: 0.1,
    format: (value) => `${value.toFixed(1)} st`,
  },
  {
    key: "attack",
    label: "Attack",
    min: 0,
    max: 1,
    step: 0.01,
    format: (value) => `${Math.round(value * 1000)} ms`,
  },
  {
    key: "decay",
    label: "Decay",
    min: 0.02,
    max: 1.5,
    step: 0.01,
    format: (value) => `${Math.round(value * 1000)} ms`,
  },
  {
    key: "sustainLevel",
    label: "Sustain Level",
    min: 0,
    max: 1,
    step: 0.01,
    format: (value) => `${Math.round(value * 100)}%`,
  },
  {
    key: "sustainTime",
    label: "Sustain Time",
    min: 0,
    max: 2,
    step: 0.01,
    format: (value) => `${value.toFixed(2)} s`,
  },
  {
    key: "release",
    label: "Release",
    min: 0.02,
    max: 2.5,
    step: 0.01,
    format: (value) => `${Math.round(value * 1000)} ms`,
  },
  {
    key: "volume",
    label: "Volume",
    min: 0,
    max: 1,
    step: 0.01,
    format: (value) => `${Math.round(value * 100)}%`,
  },
  {
    key: "vibratoDepth",
    label: "Vibrato Depth",
    min: 0,
    max: 12,
    step: 0.1,
    format: (value) => `${value.toFixed(1)} st`,
  },
  {
    key: "vibratoSpeed",
    label: "Vibrato Speed",
    min: 0.5,
    max: 30,
    step: 0.1,
    format: (value) => `${value.toFixed(1)} Hz`,
  },
  {
    key: "noise",
    label: "Noise",
    min: 0,
    max: 1,
    step: 0.01,
    format: (value) => `${Math.round(value * 100)}%`,
  },
  {
    key: "filterCutoff",
    label: "Low-pass",
    min: 200,
    max: 14000,
    step: 10,
    format: (value) => `${Math.round(value)} Hz`,
  },
  {
    key: "filterResonance",
    label: "Resonance",
    min: 0,
    max: 20,
    step: 0.1,
    format: (value) => value.toFixed(1),
  },
]

const sliderBounds = sliderConfigs.reduce(
  (acc, config) => {
    acc[config.key] = {min: config.min, max: config.max}
    return acc
  },
  {} as Record<NumericParamKey, {min: number; max: number}>,
)

const waveforms: Waveform[] = ["square", "sawtooth", "triangle", "sine", "noise"]

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)]

const presets = {
  explosion: (): Partial<SoundParams> => ({
    waveform: "noise",
    baseFrequency: randomRange(80, 180),
    frequencySlide: randomRange(-16, -6),
    attack: randomRange(0, 0.08),
    decay: randomRange(0.4, 0.8),
    sustainLevel: randomRange(0.15, 0.4),
    sustainTime: randomRange(0.1, 0.3),
    release: randomRange(0.4, 0.9),
    volume: randomRange(0.7, 1),
    vibratoDepth: randomRange(0, 0.4),
    vibratoSpeed: randomRange(2, 5),
    noise: randomRange(0.6, 1),
    filterCutoff: randomRange(1400, 3200),
    filterResonance: randomRange(0.2, 1.6),
  }),
  laser: (): Partial<SoundParams> => ({
    waveform: pick(["square", "sawtooth", "triangle"]),
    baseFrequency: randomRange(420, 1200),
    frequencySlide: randomRange(-18, 12),
    attack: randomRange(0.0, 0.04),
    decay: randomRange(0.05, 0.35),
    sustainLevel: randomRange(0.2, 0.6),
    sustainTime: randomRange(0.05, 0.18),
    release: randomRange(0.1, 0.4),
    volume: randomRange(0.4, 0.8),
    vibratoDepth: randomRange(0.4, 4),
    vibratoSpeed: randomRange(6, 18),
    noise: randomRange(0, 0.25),
    filterCutoff: randomRange(2800, 8200),
    filterResonance: randomRange(0, 4),
  }),
  powerup: (): Partial<SoundParams> => ({
    waveform: pick(["sine", "square", "triangle"]),
    baseFrequency: randomRange(300, 1100),
    frequencySlide: randomRange(6, 18),
    attack: randomRange(0.0, 0.05),
    decay: randomRange(0.12, 0.4),
    sustainLevel: randomRange(0.4, 0.8),
    sustainTime: randomRange(0.1, 0.35),
    release: randomRange(0.2, 0.5),
    volume: randomRange(0.5, 0.8),
    vibratoDepth: randomRange(0.3, 2),
    vibratoSpeed: randomRange(4, 11),
    noise: randomRange(0, 0.2),
    filterCutoff: randomRange(3800, 9600),
    filterResonance: randomRange(0.1, 2.5),
  }),
  pickup: (): Partial<SoundParams> => ({
    waveform: pick(["sine", "square"]),
    baseFrequency: randomRange(650, 1400),
    frequencySlide: randomRange(2, 10),
    attack: randomRange(0, 0.02),
    decay: randomRange(0.08, 0.22),
    sustainLevel: randomRange(0.2, 0.5),
    sustainTime: randomRange(0.02, 0.08),
    release: randomRange(0.12, 0.28),
    volume: randomRange(0.4, 0.75),
    vibratoDepth: randomRange(0, 1.6),
    vibratoSpeed: randomRange(6, 14),
    noise: randomRange(0, 0.1),
    filterCutoff: randomRange(2800, 7800),
    filterResonance: randomRange(0, 3),
  }),
  blip: (): Partial<SoundParams> => ({
    waveform: pick(["square", "triangle", "sine"]),
    baseFrequency: randomRange(300, 900),
    frequencySlide: randomRange(-4, 6),
    attack: randomRange(0, 0.02),
    decay: randomRange(0.04, 0.18),
    sustainLevel: randomRange(0.1, 0.4),
    sustainTime: randomRange(0.01, 0.06),
    release: randomRange(0.08, 0.22),
    volume: randomRange(0.3, 0.7),
    vibratoDepth: randomRange(0, 1.2),
    vibratoSpeed: randomRange(5, 14),
    noise: randomRange(0, 0.2),
    filterCutoff: randomRange(2600, 10000),
    filterResonance: randomRange(0, 2.2),
  }),
}

type BrowserWindow = Window & {
  webkitAudioContext?: typeof AudioContext
}

export default function Page() {
  const [params, setParams] = useState<SoundParams>(defaultParams)
  const [status, setStatus] = useState<string | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const activeSourcesRef = useRef<AudioScheduledSourceNode[]>([])

  useEffect(() => {
    if (!status) return
    const timeout = window.setTimeout(() => setStatus(null), 1800)
    return () => window.clearTimeout(timeout)
  }, [status])

  useEffect(() => {
    return () => {
      activeSourcesRef.current.forEach((source) => {
        try {
          source.stop()
        } catch (error) {
          // no-op
        }
      })
      activeSourcesRef.current = []
      audioContextRef.current?.close()
    }
  }, [])

  const totalDuration = useMemo(() => {
    const duration = params.attack + params.decay + params.sustainTime + params.release
    return Math.max(0.05, duration)
  }, [params])

  const handleSliderChange = useCallback((key: NumericParamKey, value: number) => {
    setParams((prev) => ({
      ...prev,
      [key]: clamp(value, sliderBounds[key].min, sliderBounds[key].max),
    }))
  }, [])

  const applyPreset = useCallback((getPreset: () => Partial<SoundParams>) => {
    setParams((prev) => ({
      ...prev,
      ...getPreset(),
    }))
  }, [])

  const mutate = useCallback(() => {
    setParams((prev) => {
      const next: SoundParams = {...prev}
      sliderConfigs.forEach((config) => {
        const current = prev[config.key]
        const variance = (config.max - config.min) * 0.08
        next[config.key] = clamp(current + randomRange(-variance, variance), config.min, config.max)
      })
      if (Math.random() > 0.7) {
        next.waveform = pick(waveforms)
      }
      return next
    })
  }, [])

  const copyPreset = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setStatus("Clipboard unavailable")
      return
    }
    try {
      await navigator.clipboard.writeText(JSON.stringify(params, null, 2))
      setStatus("Preset copied")
    } catch (error) {
      setStatus("Copy failed")
    }
  }, [params])

  const stopActiveSources = useCallback(() => {
    activeSourcesRef.current.forEach((source) => {
      try {
        source.stop()
      } catch (error) {
        // ignore exhausted source
      }
    })
    activeSourcesRef.current = []
  }, [])

  const playSound = useCallback(async () => {
    if (typeof window === "undefined") return
    const browserWindow = window as BrowserWindow
    const AudioContextConstructor = browserWindow.AudioContext ?? browserWindow.webkitAudioContext
    if (!AudioContextConstructor) {
      setStatus("Web Audio not supported")
      return
    }

    stopActiveSources()

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextConstructor()
    }

    const context = audioContextRef.current
    if (!context) return

    if (context.state === "suspended") {
      await context.resume()
    }

    const now = context.currentTime + 0.01
    const attackEnd = now + params.attack
    const decayEnd = attackEnd + params.decay
    const sustainEnd = decayEnd + params.sustainTime
    const releaseEnd = sustainEnd + params.release

    const masterGain = context.createGain()
    masterGain.gain.setValueAtTime(params.volume, now)
    masterGain.connect(context.destination)

    const envelope = context.createGain()
    envelope.gain.setValueAtTime(0.0001, now)
    envelope.gain.linearRampToValueAtTime(1, attackEnd)
    envelope.gain.linearRampToValueAtTime(Math.max(params.sustainLevel, 0.0001), decayEnd)
    envelope.gain.setValueAtTime(Math.max(params.sustainLevel, 0.0001), sustainEnd)
    envelope.gain.linearRampToValueAtTime(0.0001, releaseEnd)

    const filter = context.createBiquadFilter()
    filter.type = "lowpass"
    filter.frequency.setValueAtTime(params.filterCutoff, now)
    filter.Q.setValueAtTime(params.filterResonance, now)
    filter.connect(envelope)
    envelope.connect(masterGain)

    const mix = context.createGain()
    mix.connect(filter)

    if (params.waveform !== "noise") {
      const osc = context.createOscillator()
      osc.type = params.waveform
      const oscGain = context.createGain()
      oscGain.gain.setValueAtTime(1 - params.noise, now)
      osc.connect(oscGain).connect(mix)

      const targetFrequency = params.baseFrequency * Math.pow(2, params.frequencySlide / 12)
      osc.frequency.setValueAtTime(params.baseFrequency, now)
      osc.frequency.linearRampToValueAtTime(targetFrequency, sustainEnd)

      if (params.vibratoDepth > 0.05) {
        const vibratoOsc = context.createOscillator()
        const vibratoGain = context.createGain()
        const depthHz = params.baseFrequency * (Math.pow(2, params.vibratoDepth / 12) - 1)
        vibratoGain.gain.setValueAtTime(depthHz, now)
        vibratoOsc.frequency.setValueAtTime(params.vibratoSpeed, now)
        vibratoOsc.connect(vibratoGain)
        vibratoGain.connect(osc.frequency)
        vibratoOsc.start(now)
        vibratoOsc.stop(releaseEnd)
        activeSourcesRef.current.push(vibratoOsc)
      }

      osc.start(now)
      osc.stop(releaseEnd)
      activeSourcesRef.current.push(osc)
    }

    if (params.noise > 0.001 || params.waveform === "noise") {
      const duration = Math.max(releaseEnd - now, 0.2)
      const buffer = context.createBuffer(1, Math.ceil(duration * context.sampleRate), context.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1
      }

      const noiseSource = context.createBufferSource()
      noiseSource.buffer = buffer
      const noiseGain = context.createGain()
      const noiseLevel = params.waveform === "noise" ? 1 : params.noise
      noiseGain.gain.setValueAtTime(noiseLevel, now)
      noiseSource.connect(noiseGain).connect(mix)
      noiseSource.start(now)
      noiseSource.stop(releaseEnd)
      activeSourcesRef.current.push(noiseSource)
    }
  }, [params, stopActiveSources])

  const parameterCards = useMemo(
    () => [
      {label: "Blend", value: `${params.waveform} + ${Math.round(params.noise * 100)}% noise`},
      {label: "Duration", value: `${totalDuration.toFixed(2)} s`},
      {label: "Vibrato", value: `${params.vibratoDepth.toFixed(1)} st @ ${params.vibratoSpeed.toFixed(1)} Hz`},
    ],
    [params.waveform, params.noise, params.vibratoDepth, params.vibratoSpeed, totalDuration],
  )

  const presetButtons = [
    {label: "Explosion", action: presets.explosion},
    {label: "Laser", action: presets.laser},
    {label: "Powerup", action: presets.powerup},
    {label: "Pickup", action: presets.pickup},
    {label: "Blip", action: presets.blip},
  ] as const

  return (
    <main className="relative min-h-screen max-w-6xl mx-auto md:px-0 px-6 pt-32 pb-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-112 opacity-80" style={{background: "radial-gradient(circle at top, rgba(34,197,94,0.12), transparent 55%)"}} />
        <div className="absolute inset-x-0 bottom-0 h-96 opacity-70" style={{background: "radial-gradient(circle at bottom, rgba(59,130,246,0.1), transparent 60%)"}} />
      </div>

      <div className="relative flex flex-col gap-8">
        <header className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.24em] text-white/45 light:text-black/45">Procedural Audio Lab</p>
          <h1 className="mt-4 text-6xl font-clash font-semibold leading-tight">Soundmaker</h1>
          <p className="mt-4 max-w-3xl text-lg font-light text-white/70 light:text-black/70">Shape retro game sounds with envelopes, pitch slides, vibrato, filters, and noise layers in the same visual language as the rest of the portfolio.</p>
        </header>

        <section className="rounded-3xl bg-woodsmoke-light shadow-(--inset_shadow) p-6 light:bg-athensgray-light border border-white/10 light:border-black/10">
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
            <div>
              <div className="text-sm uppercase tracking-[0.24em] text-white/45 light:text-black/45">Current patch</div>
              <div className="mt-2 text-4xl font-clash capitalize">{params.waveform}</div>
              <p className="mt-3 max-w-2xl text-sm text-white/65 light:text-black/65">Built for quick UI feedback sounds, pickups, hits, and laser accents. The controls stay technical, but the page now sits in the same card system as the rest of the site.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setParams(defaultParams)}
                className="h-12 px-5 rounded-full border border-white/10 light:border-black/10 text-sm font-medium text-white/80 light:text-black/80 bg-white/5 light:bg-black/5 hover:bg-white/10 light:hover:bg-black/8 transition-colors">
                Reset patch
              </button>
              <button type="button" onClick={playSound} className="w-44 h-12">
                <HoverButton text1="Play Sound" text2="Preview patch" />
              </button>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-white/10 light:border-black/10 bg-black/15 light:bg-white/45 p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-white/45 light:text-black/45">Blend</div>
              <div className="mt-2 text-xl font-clash">{Math.round(params.noise * 100)}% noise</div>
              <div className="mt-2 text-sm text-white/65 light:text-black/65">Oscillator plus noise mix for cleaner or dirtier hits.</div>
            </div>
            <div className="rounded-2xl border border-white/10 light:border-black/10 bg-black/15 light:bg-white/45 p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-white/45 light:text-black/45">Duration</div>
              <div className="mt-2 text-xl font-clash">{totalDuration.toFixed(2)} s</div>
              <div className="mt-2 text-sm text-white/65 light:text-black/65">Envelope time from attack through release.</div>
            </div>
            <div className="rounded-2xl border border-white/10 light:border-black/10 bg-black/15 light:bg-white/45 p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-white/45 light:text-black/45">Filter</div>
              <div className="mt-2 text-xl font-clash">{Math.round(params.filterCutoff)} Hz</div>
              <div className="mt-2 text-sm text-white/65 light:text-black/65">Low-pass shaping with resonance for sharper or softer tone.</div>
            </div>
            <div className="rounded-2xl border border-white/10 light:border-black/10 bg-black/15 light:bg-white/45 p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-white/45 light:text-black/45">Vibrato</div>
              <div className="mt-2 text-xl font-clash">{params.vibratoDepth.toFixed(1)} st</div>
              <div className="mt-2 text-sm text-white/65 light:text-black/65">Depth at {params.vibratoSpeed.toFixed(1)} Hz for movement and tension.</div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.8fr_0.95fr]">
          <section className="rounded-3xl bg-woodsmoke-light shadow-(--inset_shadow) p-6 light:bg-athensgray-light border border-white/10 light:border-black/10">
            <div>
              <div className="text-sm uppercase tracking-[0.24em] text-white/45 light:text-black/45">Synthesis controls</div>
              <p className="mt-2 text-sm text-white/65 light:text-black/65">Tune pitch, envelope, modulation, filter, and noise directly.</p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {sliderConfigs.map((config) => {
                const value = params[config.key]
                const formatted = config.format ? config.format(value) : value.toFixed(2)
                return (
                  <label key={config.key} className="group flex flex-col gap-3 rounded-2xl border border-white/8 light:border-black/8 bg-black/15 light:bg-white/45 p-4">
                    <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-white/50 light:text-black/50">
                      <span>{config.label}</span>
                      <span className="font-mono text-[0.72rem] text-white/70 light:text-black/70">{formatted}</span>
                    </div>
                    <input type="range" min={config.min} max={config.max} step={config.step} value={value} onChange={(event) => handleSliderChange(config.key, Number(event.target.value))} className="ui-range" />
                  </label>
                )
              })}
            </div>
          </section>

          <aside className="flex flex-col gap-6">
            <div className="rounded-3xl bg-woodsmoke-light shadow-(--inset_shadow) p-6 light:bg-athensgray-light border border-white/10 light:border-black/10">
              <span className="text-sm uppercase tracking-[0.24em] text-white/45 light:text-black/45">Waveform</span>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {waveforms.map((wave) => {
                  const selected = params.waveform === wave
                  return (
                    <button
                      key={wave}
                      type="button"
                      onClick={() => setParams((prev) => ({...prev, waveform: wave}))}
                      className={`rounded-2xl border px-3 py-2 text-sm capitalize transition ${
                        selected
                          ? "border-white/60 light:border-black/50 bg-white/10 light:bg-black/8 text-white light:text-black"
                          : "border-white/10 light:border-black/10 bg-black/15 light:bg-white/40 text-white/70 light:text-black/70 hover:border-white/30 light:hover:border-black/30 hover:text-white light:hover:text-black"
                      }`}>
                      {wave}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rounded-3xl bg-woodsmoke-light shadow-(--inset_shadow) p-6 light:bg-athensgray-light border border-white/10 light:border-black/10">
              <span className="text-sm uppercase tracking-[0.24em] text-white/45 light:text-black/45">Presets</span>
              <div className="mt-4 flex flex-wrap gap-2">
                {presetButtons.map(({label, action}) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => applyPreset(action)}
                    className="rounded-full border border-white/10 light:border-black/10 px-3 py-1.5 text-xs uppercase tracking-[0.25em] text-white/65 light:text-black/65 transition hover:border-white/35 light:hover:border-black/35 hover:text-white light:hover:text-black">
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={mutate}
                  className="rounded-full border border-white/10 light:border-black/10 px-3 py-1.5 text-xs uppercase tracking-[0.25em] text-white/75 light:text-black/75 transition hover:border-white/35 light:hover:border-black/35 hover:text-white light:hover:text-black">
                  Mutate
                </button>
                <button
                  type="button"
                  onClick={copyPreset}
                  className="rounded-full border border-white/10 light:border-black/10 px-3 py-1.5 text-xs uppercase tracking-[0.25em] text-white/75 light:text-black/75 transition hover:border-white/35 light:hover:border-black/35 hover:text-white light:hover:text-black">
                  Copy JSON
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-woodsmoke-light shadow-(--inset_shadow) p-6 light:bg-athensgray-light border border-white/10 light:border-black/10">
              <span className="text-sm uppercase tracking-[0.24em] text-white/45 light:text-black/45">Snapshot</span>
              <div className="mt-4 space-y-3">
                {parameterCards.map((card) => (
                  <div key={card.label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 light:border-black/10 bg-black/15 light:bg-white/45 px-4 py-3">
                    <span className="text-xs uppercase tracking-[0.25em] text-white/45 light:text-black/45">{card.label}</span>
                    <span className="font-mono text-sm text-white/80 light:text-black/80 text-right">{card.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {status ? <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-xs uppercase tracking-[0.25em] text-emerald-200 light:text-emerald-700">{status}</div> : null}
          </aside>
        </div>
      </div>
    </main>
  )
}
