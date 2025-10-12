"use client"
import React from 'react'

export default function page() {

    const [value, setValue] = React.useState("")

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
        <input type="text" placeholder="Type here" className="input input-bordered focus:outline-none  w-full max-w-xs" value={value} onChange={(e) => setValue(e.target.value)} />
        <p className="mt-4 text-xl">arctan: {Math.atan(Number(value)) * (180 / Math.PI)} or {Math.atan(Number(value)).toFixed(4)} Radian</p>
    </main>
  )
}
