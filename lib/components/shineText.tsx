import React from "react"
import gsap from "gsap"
import {SplitText} from "gsap/all"
import {Sparkle} from "lucide-react"

export default function ShineText({text}: {text: string}) {
  return (
    <span className="font-clash relative">
      <span
        className="bg-clip-text text-transparent absolute z-1 opacity-80 animate-[shine_3s_linear_infinite]"
        style={{
          backgroundImage: "linear-gradient(120deg, rgba(0,0,0,0) 45%, #ffffff 50%, rgba(0,0,0,0) 55%)",
          backgroundSize: "400% 100%",
          backgroundPositionX: "400%",
        }}>
        {text}
      </span>
      <span className="text-lime -z-1">{text}</span>
    </span>
  )
}
