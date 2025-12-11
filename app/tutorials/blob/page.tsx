import Indicator from "@/app/indicator"
import React from "react"
import {Prism} from "react-syntax-highlighter"
import {atomDark} from "react-syntax-highlighter/dist/esm/styles/prism"

export default function Page() {
  return (
    <main className="min-h-screen w-full max-w-5xl mx-auto flex flex-col pt-50">
      <h1 className="text-5xl font-bold">Horizontal Scroll Tutorial</h1>
      <p className="text-xl max-w-2xl py-10">I&apos;m Lenny Muffler, and this is the exact pattern I use to build cinematic horizontal scroll moments with GSAP and ScrollTrigger in React. First we need to import GSAP and ScrollTrigger and register it.</p>
      <Prism language="jsx" style={atomDark} customStyle={{borderRadius: "0.75rem", fontSize: "0.9rem"}} showLineNumbers>
        {`import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)`}
      </Prism>
      <p className="text-xl max-w-2xl py-10">
        Next we need to create the panels we want to scroll through horizontally. We need to give the main section an id like "horizontal-scroll" and the panels classnames like "panel" so we can target them with GSAP, make them fullscreen with the classes "w-full h-full" and
        cover them in another div with the class flex flex so they dont appear stacked vertically but instead horizontally.
      </p>
      <Prism language="jsx" style={atomDark} customStyle={{borderRadius: "0.75rem", fontSize: "0.9rem"}} showLineNumbers>
        {`<section id="horizontal-scroll">
    <div className="h-screen flex">
        <article className="panel w-full h-full">Panel 1</article>
        <article className="panel w-full h-full">Panel 2</article>
        <article className="panel w-full h-full">Panel 3</article>
    </div>
</section>`}
      </Prism>
      <p className="text-xl max-w-2xl py-10">
        Now all thats left is to set up the GSAP ScrollTrigger. First we need to make use of the useGSAP hook that works very similar to the useEffect. Then we just need to put all of our sections in an array, we can select them with our main element with the id
        "horizontal-scroll" and its children with the class "panel", set up our scrollTrigger to begin at the element with the id "horizontal-scroll". We also need to activate the options scrub and pin to make the scroll smooth and pin the element while scrolling.
      </p>
      <Prism language="javascript" style={atomDark} customStyle={{borderRadius: "0.75rem", fontSize: "0.9rem"}} showLineNumbers>
        {`useGSAP(() => {
    const panels = gsap.utils.toArray<HTMLElement>("#horizontal-scroll .panel")
    if (!panels.length) return

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#horizontal-scroll",
        pin: true,
        scrub: 0.5,
        end: window.innerWidth * (panels.length - 1),
      },
    })
  })`}
      </Prism>
    </main>
  )
}
