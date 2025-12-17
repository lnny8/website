"use client"

import {useEffect, useState} from "react"

export default function Loader() {
  const [state, setState] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prevState) => {
        switch (prevState) {
          case 1:
            return 2
          case 2:
            return 3
          case 3:
            return 6
          case 6:
            return 9
          case 9:
            return 8
          case 8:
            return 7
          case 7:
            return 4
          case 4:
            return 1
          default:
            return 0
        }
      })
    }, 40)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute bg-red-500f w-10 h-10 grid grid-cols-3 grid-rows-3 gap-1">
      {Array.from({length: 9}).map((_, index) => (
        <div className={`w-2 h-2 ${index + 1 === state ? "bg-white" : ""}`} key={index} />
      ))}
    </div>
  )
}
