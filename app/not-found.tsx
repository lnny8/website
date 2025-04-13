import React from "react"
import Image from "next/image"
import Link from "next/link"


const notfound = () => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Link href={"/"} className="absolute bottom-[30vh] left-0 translate-x-[calc(50vw-42px*2)] z-10 w-42 h-12 bg-[#180c6c] text-white flex items-center justify-center rounded-xl">Zurück zu Home</Link>
      <div className="w-full h-[50vh] absolute top-[10vh]"><Image src={"/cbnf.png"} fill alt="not-found image" objectFit="contain"/></div>
    </div>
  )
}

export default notfound
