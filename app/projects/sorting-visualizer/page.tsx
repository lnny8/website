"use client"

import HoverButton from "@/lib/components/hoverButton"
import {useState, useRef, useEffect} from "react"

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState<number>(-1)
  const [finishIndex, setFinishIndex] = useState<number>(-1)
  const [sleepTime, setSleepTime] = useState(10)
  const [arraySize, setArraySize] = useState(100)
  const [maxValue, setMaxValue] = useState(99)
  const runningRef = useRef(false)
  const arrayRef = useRef<number[]>([-1])
  const [prevChangeState, changeState] = useState(false)

  useEffect(() => {
    let newArray = []
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.ceil(Math.random() * maxValue))
    }
    arrayRef.current = newArray
    changeState(!prevChangeState)
  }, [])

  async function randomize() {
    for (let i in arrayRef.current) {
      if (!runningRef.current) return
      setCurrentIndex(Number(i))
      let randomIndex = Math.floor(Math.random() * arrayRef.current.length)
      let temp = arrayRef.current[i]
      arrayRef.current[i] = arrayRef.current[randomIndex]
      arrayRef.current[randomIndex] = temp
      beep(200 + (arrayRef.current[i] ?? 0) * 10)
      await sleep()
      arrayRef.current = [...arrayRef.current]
    }
    setCurrentIndex(-1)
    runningRef.current = false
  }

  async function sleep(ms: number = sleepTime) {
    if (ms === 0) return
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async function finish() {
    setCurrentIndex(-1)
    for (let i = 0; i < arrayRef.current.length; i++) {
      if (!runningRef.current) return
      setFinishIndex(i)
      beep(200 + (arrayRef.current[i] ?? 0) * 10)
      await sleep()
    }
    await sleep(500)
    setFinishIndex(-1)
    runningRef.current = false
  }

  async function bubbleSort() {
    for (let i = 0; i < arrayRef.current.length; i++) {
      for (let j = 0; j < arrayRef.current.length - i - 1; j++) {
        if (!runningRef.current) return
        beep(200 + (arrayRef.current[j] ?? 0) * 10)
        setCurrentIndex(j)
        if (arrayRef.current[j] > arrayRef.current[j + 1]) {
          let temp = arrayRef.current[j]
          arrayRef.current[j] = arrayRef.current[j + 1]
          arrayRef.current[j + 1] = temp
          arrayRef.current = [...arrayRef.current]
          await sleep()
        }
      }
    }
    await finish()
  }

  async function stop() {
    runningRef.current = false
    setCurrentIndex(-1)
  }

  async function selectionSort() {
    for (let i = 0; i < arrayRef.current.length; i++) {
      if (!runningRef.current) return
      let minIndex = i
      for (let j = i + 1; j < arrayRef.current.length; j++) {
        setCurrentIndex(j)
        beep(200 + (arrayRef.current[j] ?? 0) * 10)
        if (arrayRef.current[j] < arrayRef.current[minIndex]) {
          minIndex = j
        }
        await sleep()
      }
      if (minIndex !== i) {
        let temp = arrayRef.current[i]
        arrayRef.current[i] = arrayRef.current[minIndex]
        arrayRef.current[minIndex] = temp
        arrayRef.current = [...arrayRef.current]
        await sleep()
      }
    }
    await finish()
  }

  async function radixSort() {
    let max = 0
    let place = 1
    for (let i = 0; i < arrayRef.current.length; i++) {
      if (arrayRef.current[i] > max) max = arrayRef.current[i]
    }
    while (Math.floor(max / place) >= 1) {
      arrayRef.current = await countingSort(arrayRef.current, place)
      place *= 10
    }
    await finish()
  }

  async function countingSort(arr: number[], digitPlace: number) {
    const output = Array(arr.length).fill(0)
    const count = Array(10).fill(0)

    for (let i = 0; i < arr.length; i++) {
      const digit = Math.floor((arr[i] / digitPlace) % 10)
      count[digit]++
      await sleep()
      beep(200 + (arr[i] ?? 0) * 10)
      setCurrentIndex(i)
    }
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1]
    }
    for (let i = arr.length - 1; i >= 0; i--) {
      const digit = Math.floor((arr[i] / digitPlace) % 10)
      output[count[digit] - 1] = arr[i]
      count[digit]--
    }
    return output
  }

  // Kürzere Variante: wiederverwendeter AudioContext + Throttle + kurzer Envelope
  const audioCtxRef = useRef<AudioContext | null>(null)
  const lastRef = useRef(0)
  function beep(f = 440) {
    const AC: any = window.AudioContext || (window as any).webkitAudioContext
    const ctx = (audioCtxRef.current ??= new AC())
    if (ctx.state === "suspended") ctx.resume()
    const t = ctx.currentTime
    if (t - lastRef.current < 0.01) return // 10ms throttle
    lastRef.current = t
    const o = ctx.createOscillator(),
      g = ctx.createGain()
    o.frequency.value = f
    o.connect(g).connect(ctx.destination)
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.3, t + 0.005)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.15)
    o.start(t)
    o.stop(t + 0.16)
    o.onended = () => {
      try {
        o.disconnect()
        g.disconnect()
      } catch {}
    }
  }

  return (
    <main className="relative min-h-screen text-white flex flex-col items-center justify-start">
      <h1 className="text-5xl text-center pt-30 font-medium font-clash">Sorting algorythm visualizer</h1>
      <div className="w-full mt-10 relative flex justify-center items-end">
        {arrayRef.current.map((value, index) => (
          <div key={index} style={{background: finishIndex >= value ? "#00ff00" : currentIndex === index ? "red" : "white", height: `${value * 5}px`, width: "5px", marginLeft: "10px"}} />
        ))}
      </div>
      <div>
        <div className="flex items-center justify-center mt-10">
          <div className="mr-10 flex flex-col items-center justify-center">
            <label>wait time: {sleepTime}ms</label>
            <input type="range" min="0" max="100" value={sleepTime} onChange={(e) => setSleepTime(Number(e.target.value))} className="ml-5 cursor-pointer" />
          </div>
          <div className="mr-10 flex flex-col items-center justify-center">
            <label>array size: {arraySize}</label>
            <input
              type="range"
              min="9"
              max="120"
              value={arraySize}
              onChange={(e) => {
                if (runningRef.current) return
                const newSize = Number(e.target.value)
                setArraySize(newSize)
                arrayRef.current = Array.from({length: newSize}, () => Math.ceil(Math.random() * maxValue))
              }}
              className="ml-5 cursor-pointer"
            />
          </div>
          <div className="mr-10 flex flex-col items-center justify-center">
            <label>max value: {maxValue}</label>
            <input
              type="range"
              min="9"
              max="99"
              value={maxValue}
              onChange={(e) => {
                if (runningRef.current) return
                const newMax = Number(e.target.value)
                setMaxValue(newMax)
                arrayRef.current = arrayRef.current.map(() => Math.ceil(Math.random() * newMax))
              }}
              className="ml-5 cursor-pointer slider-thumb-blue slider-track-blue"
            />
          </div>
        </div>
        <div className="flex items-center justify-center mt-10">
          {[
            {name: "randomize", func: randomize},
            {name: "bubbleSort", func: bubbleSort},
            {name: "selectionSort", func: selectionSort},
            {name: "radixSort", func: radixSort},
          ].map(({name, func}) => (
            <button
              key={name}
              disabled={runningRef.current}
              onClick={() => {
                runningRef.current = true
                func()
              }}
              className="mx-2 w-42 h-12 disabled:opacity-70">
              <HoverButton disabled={runningRef.current} text1={name} text2={name} />
            </button>
          ))}
          <button onClick={stop} disabled={!runningRef.current} className="w-42 h-12 mx-2 disabled:opacity-70">
            <HoverButton disabled={!runningRef.current} text1="stop" text2="stop" />
          </button>
        </div>
      </div>
    </main>
  )
}
