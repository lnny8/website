"use client"

import { useState } from "react"

export default function Home() {
  const [array, setArray] = useState(Array(100).fill(50))
  const [currentIndex, setCurrentIndex] = useState<number>(-1)
  const [sleepTime, setSleepTime] = useState(0.1)
  
  async function randomize() {
    for (let i in array) {
      setCurrentIndex(Number(i))
      array[i] = Math.ceil(Math.random() * 100)
      await sleep()
      setArray([...array])
    }
    setCurrentIndex(-1)
  }

  async function sleep() {
    return new Promise(resolve => setTimeout(resolve, sleepTime))
  }

  async function bubbleSort() {
    for(let i=0; i < array.length; i++) {
      for(let j=0; j < array.length - i - 1; j++) {
        setCurrentIndex(j)
        if(array[j] > array[j + 1]) {
          let temp = array[j]
          array[j] = array[j + 1]
          array[j + 1] = temp
          setArray([...array])
          await sleep()
        }
      }
    }
  }

  async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
      let minIndex = i
      for (let j = i + 1; j < array.length; j++) {
        setCurrentIndex(j)
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
  }

  async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
      let key = array[i]
      let j = i - 1
      while (j >= 0 && array[j] > key) {
        setCurrentIndex(j)
        array[j + 1] = array[j]
        j--
        setArray([...array])
        await sleep()
      }
      array[j + 1] = key
      setArray([...array])
    }
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
  }

  async function mergeSort() {
    if (array.length <= 1) return
    const mid = Math.floor(array.length / 2)
    const left = array.slice(0, mid)
    const right = array.slice(mid)
    await mergeSortHelper(left, right)
  }

  
  async function mergeSortHelper(left: number[], right: number[]) {
    let i = 0
    let j = 0
    const merged = []
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        merged.push(left[i])
        i++
      } else {
        merged.push(right[j])
        j++
      }
      setArray([...merged, ...left.slice(i), ...right.slice(j)])
      await sleep()
    }
    setArray([...merged, ...left.slice(i), ...right.slice(j)])
  }

  async function bogoSort() {
    function isSorted(arr: number[]) {
      for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) return false
      }
      return true
    }
    while (!isSorted(array)) {
      for (let i = 0; i < array.length; i++) {
        setCurrentIndex(i)
        array[i] = Math.ceil(Math.random() * 100)
      }
      setArray([...array])
      await sleep()
    }
  }

  return (
    <main className="relative min-h-screen bg-black text-white">
      <h1 className="text-4xl text-center h-[10vh] pt-10 font-semibold">Sorting algorythms by lenny</h1>
      <section className="w-full h-[90vh] flex pb-40 pt-40 items-end justify-center">
        {array.map((value, index) => (
          <div key={index} style={{background: currentIndex === index ? "red" : "white", height: `${value * 5}px`, width: "5px", marginLeft: "10px"}} />
        ))}
      </section>
      <div className="absolute w-2/3 bottom-12 left-1/2 -translate-x-1/2">
      {[{ name: "randomize", func: randomize }, { name: "bubbleSort", func: bubbleSort }, { name: "selectionSort", func: selectionSort },
      { name: "insertionSort", func: insertionSort }, { name: "mergeSort", func: mergeSort }, { name: "bogoSort", func: bogoSort },
      { name: "radixSort", func: radixSort }]
      .map(({ name, func }) => (
          <button key={name} onClick={func} className="mx-5 cursor-pointer bottom-10 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition">{name}</button>
        ))}
      </div>

    </main>
  )
}
