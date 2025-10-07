"use client"

import {useState, useRef, useEffect} from "react"

export default function Home() {
  // Deterministic initial array to avoid SSR/client hydration mismatch (was using Math.random())
  const [array, setArray] = useState<number[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(-1)
  const [finishIndex, setFinishIndex] = useState<number>(-1)
  const [sleepTime, setSleepTime] = useState(10)
  const [arraySize, setArraySize] = useState(100)
  const [maxValue, setMaxValue] = useState(99)
  const runningRef = useRef(false)

  useEffect(() => {
    let newArray = []
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.ceil(Math.random() * maxValue))
    }
    setArray(newArray)
  }, [])

  async function randomize() {
    for (let i in array) {
      if (!runningRef.current) return
      setCurrentIndex(Number(i))
      let randomIndex = Math.floor(Math.random() * array.length)
      let temp = array[i]
      array[i] = array[randomIndex]
      array[randomIndex] = temp
      beep(200 + (array[i] ?? 0) * 10)
      await sleep()
      setArray([...array])
    }
    setCurrentIndex(-1)
    runningRef.current = false
  }

  async function sleep(ms: number = sleepTime) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async function finish() {
    for (let i = 0; i < array.length; i++) {
      if (!runningRef.current) return
      setFinishIndex(i)
      beep(200 + (array[i] ?? 0) * 10)
      await sleep()
    }
    await sleep(500)
    setFinishIndex(-1)
  }

  async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (!runningRef.current) return
        beep(200 + (array[j] ?? 0) * 10)
        setCurrentIndex(j)
        if (array[j] > array[j + 1]) {
          let temp = array[j]
          array[j] = array[j + 1]
          array[j + 1] = temp
          setArray([...array])
          await sleep()
        }
      }
    }
    runningRef.current = false
    setCurrentIndex(-1)
  }

  async function stop() {
    runningRef.current = false
    setCurrentIndex(-1)
  }

  async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
      if (!runningRef.current) return
      let minIndex = i
      for (let j = i + 1; j < array.length; j++) {
        setCurrentIndex(j)
        beep(200 + (array[j] ?? 0) * 10)
        if (array[j] < array[minIndex]) {
          minIndex = j
        }
        await sleep()
      }
      if (minIndex !== i) {
        let temp = array[i]
        array[i] = array[minIndex]
        array[minIndex] = temp
        setArray([...array])
      }
    }
    runningRef.current = false
    setCurrentIndex(-1)
  }

  async function radixSort() {
    const getMax = (arr: number[]) => Math.max(...arr)
    const countingSort = async (exp: number) => {
      const output = Array(array.length).fill(0)
      const count = Array(10).fill(0)
      for (let i = 0; i < array.length; i++) {
        count[Math.floor(array[i] / exp) % 10]++
      }
      for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1]
      }
      for (let i = array.length - 1; i >= 0; i--) {
        if (!runningRef.current) return
        setCurrentIndex(i)
        beep(200 + (array[i] ?? 0) * 10)
        output[count[Math.floor(array[i] / exp) % 10] - 1] = array[i]
        count[Math.floor(array[i] / exp) % 10]--
        setArray([...output])
        await sleep()
      }
      for (let i = 0; i < array.length; i++) {
        array[i] = output[i]
      }
    }
    const max = getMax(array)
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      await countingSort(exp)
    }
    setArray([...array])
    setCurrentIndex(-1)
    await finish()
    runningRef.current = false
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
    <main className="relative min-h-screen bg-black text-white">
      <h1 className="text-4xl text-center h-[10vh] pt-10 font-semibold">Sorting algorythms by lenny</h1>
      <section className="w-full h-[90vh] flex pb-40 pt-40 items-end justify-center">
        <div className="absolute w-2/3 flex items-center justify-center top-28 left-1/2 -translate-x-1/2">
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
                setArray(Array.from({length: newSize}, () => Math.ceil(Math.random() * maxValue)))
              }}
              className="ml-5 cursor-pointer"
            />
          </div>
          <div className="mr-10 flex flex-col items-center justify-center">
            <label>max value: {maxValue}</label>
            <input
              type="range"
              min="9"
              max="120"
              value={maxValue}
              onChange={(e) => {
                if (runningRef.current) return
                const newMax = Number(e.target.value)
                setMaxValue(newMax)
                setArray(array.map(() => Math.ceil(Math.random() * newMax)))
              }}
              className="ml-5 cursor-pointer"
            />
          </div>
        </div>
        {array.map((value, index) => (
          <div key={index} style={{background: finishIndex >= value ? "#00ff00" : currentIndex === index ? "red" : "white", height: `${value * 5}px`, width: "5px", marginLeft: "10px"}} />
        ))}
      </section>
      <div className="absolute w-2/3 flex items-center justify-center bottom-12 left-1/2 -translate-x-1/2">
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
            className="disabled:opacity-50 mx-5 cursor-pointer bottom-10 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition">
            {name}
          </button>
        ))}
        <button onClick={stop} disabled={!runningRef.current} className="disabled:opacity-50 mx-5 cursor-pointer bottom-10 bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 transition">
          stop
        </button>
      </div>
    </main>
  )
}
