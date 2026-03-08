"use client"

import HoverButton from "@/lib/components/hoverButton"
import {useEffect, useRef, useState} from "react"

type AlgorithmKey = "bubble" | "selection" | "insertion" | "radix"

type SortStep = {type: "compare"; indices: number[]} | {type: "swap"; indices: [number, number]} | {type: "overwrite"; index: number; value: number; activeIndices: number[]}

const MAX_VALUE = 180

const algorithmLabels: Record<AlgorithmKey, string> = {
  bubble: "Bubble Sort",
  selection: "Selection Sort",
  insertion: "Insertion Sort",
  radix: "Radix Sort",
}

function createRandomArray(length: number, maxValue: number) {
  return Array.from({length}, () => Math.floor(Math.random() * maxValue) + 1)
}

function mergeIndices(current: number[], next: number[]) {
  return Array.from(new Set([...current, ...next])).sort((left, right) => left - right)
}

function buildBubbleSteps(input: number[]) {
  const values = [...input]
  const steps: SortStep[] = []

  for (let outer = 0; outer < values.length; outer++) {
    for (let inner = 0; inner < values.length - outer - 1; inner++) {
      steps.push({type: "compare", indices: [inner, inner + 1]})
      if (values[inner] > values[inner + 1]) {
        ;[values[inner], values[inner + 1]] = [values[inner + 1], values[inner]]
        steps.push({type: "swap", indices: [inner, inner + 1]})
      }
    }
  }

  return steps
}

function buildSelectionSteps(input: number[]) {
  const values = [...input]
  const steps: SortStep[] = []

  for (let start = 0; start < values.length; start++) {
    let minIndex = start

    for (let cursor = start + 1; cursor < values.length; cursor++) {
      steps.push({type: "compare", indices: [minIndex, cursor]})
      if (values[cursor] < values[minIndex]) {
        minIndex = cursor
      }
    }

    if (minIndex !== start) {
      ;[values[start], values[minIndex]] = [values[minIndex], values[start]]
      steps.push({type: "swap", indices: [start, minIndex]})
    }
  }

  return steps
}

function buildInsertionSteps(input: number[]) {
  const values = [...input]
  const steps: SortStep[] = []

  for (let index = 1; index < values.length; index++) {
    let cursor = index

    while (cursor > 0) {
      steps.push({type: "compare", indices: [cursor - 1, cursor]})
      if (values[cursor - 1] <= values[cursor]) {
        break
      }

      ;[values[cursor - 1], values[cursor]] = [values[cursor], values[cursor - 1]]
      steps.push({type: "swap", indices: [cursor - 1, cursor]})
      cursor -= 1
    }
  }

  return steps
}

function buildRadixSteps(input: number[]) {
  const values = [...input]
  const steps: SortStep[] = []
  const highestValue = Math.max(...values, 0)
  let place = 1

  while (Math.floor(highestValue / place) > 0) {
    const buckets = Array.from({length: 10}, () => [] as number[])

    for (let index = 0; index < values.length; index++) {
      const digit = Math.floor(values[index] / place) % 10
      buckets[digit].push(values[index])
      steps.push({type: "compare", indices: [index]})
    }

    const nextValues: number[] = []
    for (const bucket of buckets) {
      for (const value of bucket) {
        nextValues.push(value)
      }
    }

    for (let index = 0; index < nextValues.length; index++) {
      values[index] = nextValues[index]
      steps.push({type: "overwrite", index, value: nextValues[index], activeIndices: [index]})
    }

    place *= 10
  }

  return steps
}

const builders: Record<AlgorithmKey, (input: number[]) => SortStep[]> = {
  bubble: buildBubbleSteps,
  selection: buildSelectionSteps,
  insertion: buildInsertionSteps,
  radix: buildRadixSteps,
}

export default function Page() {
  const [values, setValues] = useState<number[]>([])
  const [activeIndices, setActiveIndices] = useState<number[]>([])
  const [sortedIndices, setSortedIndices] = useState<number[]>([])
  const [speed, setSpeed] = useState(72)
  const [arraySize, setArraySize] = useState(72)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmKey>("bubble")
  const [isRunning, setIsRunning] = useState(false)
  const [stepCount, setStepCount] = useState(0)
  const [totalSteps, setTotalSteps] = useState(0)

  const runIdRef = useRef(0)
  const delayRef = useRef(81 - speed)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const lastBeepRef = useRef(0)

  useEffect(() => {
    delayRef.current = 81 - speed
  }, [speed])

  useEffect(() => {
    setValues(createRandomArray(arraySize, MAX_VALUE))

    return () => {
      runIdRef.current += 1
      const audioContext = audioCtxRef.current
      audioCtxRef.current = null
      if (audioContext) {
        void audioContext.close()
      }
    }
  }, [])

  function wait(ms = delayRef.current) {
    if (ms <= 0) {
      return Promise.resolve()
    }

    return new Promise<void>((resolve) => {
      window.setTimeout(resolve, ms)
    })
  }

  function beep(value: number) {
    const AudioContextClass = window.AudioContext || (window as typeof window & {webkitAudioContext?: typeof AudioContext}).webkitAudioContext
    if (!AudioContextClass) {
      return
    }

    const ctx = audioCtxRef.current ?? new AudioContextClass()
    audioCtxRef.current = ctx

    if (ctx.state === "suspended") {
      void ctx.resume()
    }

    const now = ctx.currentTime
    if (now - lastBeepRef.current < 0.015) {
      return
    }
    lastBeepRef.current = now

    const normalized = Math.max(0.05, value / MAX_VALUE)
    const frequency = Math.min(1200, 180 + normalized * 900)
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()

    oscillator.type = "triangle"
    oscillator.frequency.value = frequency
    oscillator.connect(gain)
    gain.connect(ctx.destination)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.14, now + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11)
    oscillator.start(now)
    oscillator.stop(now + 0.12)
    oscillator.onended = () => {
      oscillator.disconnect()
      gain.disconnect()
    }
  }

  function resetWithRandomValues(nextSize: number) {
    runIdRef.current += 1
    setIsRunning(false)
    setActiveIndices([])
    setSortedIndices([])
    setStepCount(0)
    setTotalSteps(0)
    setValues(createRandomArray(nextSize, MAX_VALUE))
  }

  function stopRun() {
    runIdRef.current += 1
    setIsRunning(false)
    setActiveIndices([])
    setSortedIndices([])
  }

  async function animateCompletion(runId: number, finalValues: number[]) {
    for (let index = 0; index < finalValues.length; index++) {
      if (runId !== runIdRef.current) {
        return
      }

      setActiveIndices([index])
      setSortedIndices((current) => mergeIndices(current, [index]))
      beep(finalValues[index])
      await wait(Math.min(20, Math.max(6, delayRef.current / 2)))
    }

    if (runId !== runIdRef.current) {
      return
    }

    setActiveIndices([])
    setIsRunning(false)
  }

  async function playAlgorithm(algorithm: AlgorithmKey) {
    if (isRunning || values.length === 0) {
      return
    }

    const initialValues = [...values]
    const steps = builders[algorithm](initialValues)
    const workingValues = [...initialValues]
    const runId = runIdRef.current + 1

    runIdRef.current = runId
    setIsRunning(true)
    setActiveIndices([])
    setSortedIndices([])
    setStepCount(0)
    setTotalSteps(steps.length)

    for (let index = 0; index < steps.length; index++) {
      if (runId !== runIdRef.current) {
        return
      }

      const step = steps[index]
      setStepCount(index + 1)

      if (step.type === "compare") {
        setActiveIndices(step.indices)
        for (const activeIndex of step.indices) {
          beep(workingValues[activeIndex])
        }
      }

      if (step.type === "swap") {
        const [leftIndex, rightIndex] = step.indices
        ;[workingValues[leftIndex], workingValues[rightIndex]] = [workingValues[rightIndex], workingValues[leftIndex]]
        setValues([...workingValues])
        setActiveIndices(step.indices)
        beep(workingValues[leftIndex])
        beep(workingValues[rightIndex])
      }

      if (step.type === "overwrite") {
        workingValues[step.index] = step.value
        setValues([...workingValues])
        setActiveIndices(step.activeIndices)
        beep(step.value)
      }

      await wait()
    }

    await animateCompletion(runId, workingValues)
  }

  const progress = totalSteps === 0 ? 0 : Math.round((stepCount / totalSteps) * 100)

  return (
    <main className="relative min-h-screen overflow-hidden bg-woodsmoke text-athensgray light:bg-athensgray light:text-woodsmoke">
      <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-16 pt-28 md:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <h1 className="font-clash font-semibold text-5xl leading-none">Sorting algorithm visualizer</h1>
            <p className="max-w-2xl text-base leading-7 text-white/70 light:text-black/65 sm:text-lg">Rebuilt from scratch with deterministic sort steps, clean stop behavior, and consistent playback. Pick an algorithm, tune the speed and dataset, and inspect every comparison.</p>
          </div>

          <div className="grid gap-3 rounded-4xl p-4 shadow-(--inset_shadow) backdrop-blur-xl bg-woodsmoke-light light:bg-athensgray-light sm:grid-cols-3">
            <div className="rounded-[1.4rem] border border-white/8 bg-black/20 px-4 py-3 light:border-black/8 light:bg-white/55">
              <p className="text-xs uppercase tracking-[0.25em] text-white/45 light:text-black/45">Algorithm</p>
              <p className="mt-2 text-lg font-medium">{algorithmLabels[selectedAlgorithm]}</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/8 bg-black/20 px-4 py-3 light:border-black/8 light:bg-white/55">
              <p className="text-xs uppercase tracking-[0.25em] text-white/45 light:text-black/45">Status</p>
              <p className="mt-2 text-lg font-medium">{isRunning ? "Sorting" : sortedIndices.length === values.length && values.length > 0 ? "Sorted" : "Ready"}</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/8 bg-black/20 px-4 py-3 light:border-black/8 light:bg-white/55">
              <p className="text-xs uppercase tracking-[0.25em] text-white/45 light:text-black/45">Progress</p>
              <p className="mt-2 text-lg font-medium">{progress}%</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2.2rem] bg-woodsmoke-light light:bg-athensgray-light p-4 shadow-(--inset_shadow) md:p-6">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/45 light:text-black/45">Dataset</p>
              <p className="mt-2 text-sm text-white/65 light:text-black/65">{values.length} values</p>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/8 light:bg-black/8 md:max-w-xs">
              <div className="h-full rounded-full bg-lime transition-[width] duration-150" style={{width: `${progress}%`}} />
            </div>
          </div>

          <div className="flex h-88 items-end gap-0.75 overflow-hidden rounded-3xl p-4 md:h-120">
            {values.map((value, index) => {
              const isActive = activeIndices.includes(index)
              const isSorted = sortedIndices.includes(index)
              const height = `${Math.max(4, (value / MAX_VALUE) * 100)}%`
              const background = isSorted ? "#0f0" : isActive ? "#f772c2" : "#fff"

              return (
                <div
                  key={`${index}-${value}`}
                  className="min-w-0 flex-1 rounded-t-[0.2rem] transition-[height,transform,opacity] duration-150"
                  style={{
                    height,
                    background,
                    opacity: isActive || isSorted ? 1 : 0.84,
                    transform: isActive ? "translateY(-6px)" : "translateY(0px)",
                  }}
                />
              )
            })}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-4xl bg-woodsmoke-light light:bg-athensgray-light p-5 shadow-(--inset_shadow)">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/45 light:text-black/45">Algorithms</p>
                <p className="mt-2 text-sm text-white/65 light:text-black/65">Each run is precomputed as explicit steps so playback and cancellation stay stable.</p>
              </div>
              <div className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/60 light:border-black/10 light:text-black/60">
                {stepCount} / {totalSteps || 0}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(Object.keys(algorithmLabels) as AlgorithmKey[]).map((algorithm) => {
                const isSelected = selectedAlgorithm === algorithm

                return (
                  <button
                    key={algorithm}
                    type="button"
                    disabled={isRunning}
                    onClick={() => setSelectedAlgorithm(algorithm)}
                    className={`rounded-[1.4rem] border px-4 py-4 text-left transition disabled:cursor-not-allowed disabled:opacity-55 ${
                      isSelected ? "border-lime bg-lime/14 text-white light:text-woodsmoke" : "border-white/10 bg-black/20 text-white/72 hover:border-white/18 hover:bg-black/28 light:border-black/10 light:bg-white/55 light:text-black/70 light:hover:border-black/18"
                    }`}>
                    <p className="text-base font-medium">{algorithmLabels[algorithm]}</p>
                    <p className="mt-1 text-sm opacity-70">{algorithm === "radix" ? "Non-comparative digit passes" : "Comparison-based animation"}</p>
                  </button>
                )
              })}
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <button type="button" onClick={() => playAlgorithm(selectedAlgorithm)} disabled={isRunning} className="h-13 disabled:opacity-60">
                <HoverButton disabled={isRunning} text1="run sort" text2="run sort" />
              </button>
              <button type="button" onClick={() => resetWithRandomValues(arraySize)} disabled={isRunning} className="h-13 disabled:opacity-60">
                <HoverButton disabled={isRunning} text1="shuffle data" text2="shuffle data" />
              </button>
              <button type="button" onClick={stopRun} disabled={!isRunning} className="h-13 disabled:opacity-60">
                <HoverButton disabled={!isRunning} text1="stop" text2="stop" />
              </button>
            </div>
          </div>

          <div className="rounded-4xl bg-woodsmoke-light light:bg-athensgray-light p-5 shadow-(--inset_shadow)">
            <div className="space-y-6">
              <div>
                <div className="mb-3 flex items-center justify-between text-sm">
                  <label htmlFor="speed" className="uppercase tracking-[0.28em] text-white/45 light:text-black/45">
                    Speed
                  </label>
                  <span>{speed}</span>
                </div>
                <input id="speed" type="range" min="1" max="80" value={speed} onChange={(event) => setSpeed(Number(event.target.value))} className="ui-range" />
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between text-sm">
                  <label htmlFor="arraySize" className="uppercase tracking-[0.28em] text-white/45 light:text-black/45">
                    Array size
                  </label>
                  <span>{arraySize}</span>
                </div>
                <input
                  id="arraySize"
                  type="range"
                  min="12"
                  max="96"
                  value={arraySize}
                  disabled={isRunning}
                  onChange={(event) => {
                    const nextSize = Number(event.target.value)
                    setArraySize(nextSize)
                    resetWithRandomValues(nextSize)
                  }}
                  className="ui-range disabled:opacity-60"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
