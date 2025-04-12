import React from "react"
import MobileMenu from "./MobileMenu"
import Image from "next/image"

const page = () => {
  return (
    <main className="max-h-screen overflow-hidden bg-[#180c6c]">
    <div className="absolute w-full h-[10vh] bg-white" />
      <MobileMenu />
      <div className="w-[30vw] h-[10vw] top-5 left-5 z-1000 absolute">
      <Image src="/crossbaseLogo.png" alt="Crossbase Logo" fill objectFit="contain" />
      </div>
      <div className="text-white text-4xl italic text-center w-[80vw] z-100 pt-[16vh]">
        <h1 className="font-extralight">Erleben sie<br /></h1>
        <h2 className="font-bold">Höchstleistung:<br />Unsere PIM-Lösung für die Industrie</h2>
        <h3 className="not-italic text-2xl text-center w-[90vw] pt-13 pb-8">Alle Funktionen. Alle Kanäle. Alle Plattformen. All unser Know-how</h3>
      </div>
      <div className="relative w-full pt-[70vh] h-[40vh] bg-[#6a81bc]">
        <span className="text-white absolute z-10 top-[3vh]">
          <h1 className="font-extralight pl-10 pt-50 text-5xl">KI-Module</h1>
          <h2 className="text-2xl pl-10 pt-5">KI-basierte Texterstellung, Bilderstellung, Übersetzung und vieles mehr</h2>
          <h3 className="text-1xl pl-10 pt-5">Mehr erfahren...</h3>
        </span>
        <Image src={"/crossbaseAI.png"} alt="Crossbase AI Picture" fill objectFit="cover" />
      </div>
    </main>
  )
}

export default page
