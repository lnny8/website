import React from "react"
import HoverButton from "@/lib/components/hoverButton"
import {Prism} from "react-syntax-highlighter"
import {atomDark} from "react-syntax-highlighter/dist/esm/styles/prism"

const importsCode = `"use client"
import React, { useEffect, useId } from "react"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import { useGSAP } from "@gsap/react"
import { Loader2 } from "lucide-react"

gsap.registerPlugin(SplitText)`

const structureCode = `return (
  <div
    id={id}
    onMouseEnter={() => !disabled && !loading && handleEnter()}
    onMouseLeave={() => handleLeave()}
    className="relative flex items-center justify-center w-full overflow-hidden px-4 py-2 rounded-full"
  >
    <svg className="svg absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <rect width="300" x="-100" y={200} height="100" />
      <path d={initialPath} />
    </svg>

    <span className="text1 relative font-medium">{text1}</span>
    <span className="text2 absolute font-medium">{text2}</span>

    <div className={\`loader-cover absolute inset-0 \${showLoading ? "flex" : "hidden"}\`}>
      <div className="loader-wrapper">
        <Loader2 className="animate-spin" />
      </div>
    </div>
  </div>
)`

const animationCode = `function handleEnter() {
  killAllTweensAndResetSplits()
  text1Ref.current = new SplitText(\`#\${id} .text1\`, { type: "lines", mask: "lines" })
  text2Ref.current = new SplitText(\`#\${id} .text2\`, { type: "lines", mask: "lines" })

  gsap.set(\`#\${id} .text2\`, { display: "block", yPercent: 0 })
  gsap.set(text2Ref.current.lines, { yPercent: 100 })

  gsap.to(\`#\${id}\`, { scale: 1.06, duration: 0.3, ease: "power2.out" })
  gsap.to(\`#\${id} .svg path\`, { duration: 0.3, ease: "circ.out", attr: { d: hoverPath } })
  gsap.to(\`#\${id} .svg rect\`, { duration: 0.3, ease: "circ.out", attr: { y: "0" } })

  gsap.to(text1Ref.current.lines, { yPercent: -100, duration: 0.5, ease: "power2.out", stagger: 0.05 })
  gsap.to(text2Ref.current.lines, { yPercent: 0, duration: 0.5, ease: "power2.out", stagger: 0.05 })
}

function handleLeave() {
  killAllTweensAndResetSplits()

  text1Ref.current = new SplitText(\`#\${id} .text1\`, { type: "lines", mask: "lines" })
  text2Ref.current = new SplitText(\`#\${id} .text2\`, { type: "lines", mask: "lines" })

  gsap.to(\`#\${id}\`, { scale: 1, duration: 0.3, ease: "power2.out" })
  gsap.to(\`#\${id} .svg path\`, { duration: 0.5, ease: "circ.out", attr: { d: initialPath } })
  gsap.to(\`#\${id} .svg rect\`, { duration: 0.5, ease: "circ.out", attr: { y: "200" } })

  gsap.to(text1Ref.current.lines, { yPercent: 0, duration: 0.5, ease: "power2.out" })
  gsap.to(text2Ref.current.lines, { yPercent: 100, duration: 0.3, ease: "power4.out" })
}`

const usageCode = `import HoverButton from "@/lib/components/hoverButton"

<HoverButton
  text1="Get Started"
  text2="Let\'s go"
  className="max-w-56 h-14"
/>`

export default function Page() {
  return (
    <main className="min-h-screen w-full max-w-5xl mx-auto flex flex-col pt-50 pb-20 px-4">
      <h1 className="text-5xl font-bold">Hover Button Tutorial</h1>
      <p className="text-xl max-w-3xl py-8">In this tutorial, you will build an animated button with GSAP, SplitText, and an optional loading overlay. The final result matches the effect used in your "HoverButton" component.</p>

      <h2 className="text-3xl font-semibold pt-4">1) Setup &amp; Imports</h2>
      <p className="text-xl max-w-3xl py-6">First, install GSAP, the React plugin, and Lucide icons. Then register "SplitText" so you can animate both text lines cleanly against each other.</p>
      <Prism language="tsx" style={atomDark} customStyle={{borderRadius: "0.75rem", fontSize: "0.9rem"}} showLineNumbers>
        {importsCode}
      </Prism>

      <h2 className="text-3xl font-semibold pt-12">2) Button Structure</h2>
      <p className="text-xl max-w-3xl py-6">The button consists of a wrapper, an SVG layer for the morph effect, two text spans, and a loader layer. "text1" is the default label, while "text2" slides in from below on hover.</p>
      <Prism language="tsx" style={atomDark} customStyle={{borderRadius: "0.75rem", fontSize: "0.9rem"}} showLineNumbers>
        {structureCode}
      </Prism>

      <h2 className="text-3xl font-semibold pt-12">3) Hover Animation with SplitText</h2>
      <p className="text-xl max-w-3xl py-6">On enter, create "SplitText" instances for both lines, scale the button up slightly, and morph the SVG shape. On leave, reset everything cleanly and run the animation in reverse.</p>
      <Prism language="tsx" style={atomDark} customStyle={{borderRadius: "0.75rem", fontSize: "0.9rem"}} showLineNumbers>
        {animationCode}
      </Prism>

      <h2 className="text-3xl font-semibold pt-12">4) Usage</h2>
      <p className="text-xl max-w-3xl py-6">Import the component and use "text1", "text2", and optionally "loading", "disabled", and "className".</p>
      <Prism language="tsx" style={atomDark} customStyle={{borderRadius: "0.75rem", fontSize: "0.9rem"}} showLineNumbers>
        {usageCode}
      </Prism>

      <h2 className="text-3xl font-semibold pt-12">Live Demo</h2>
      <div className="w-42 h-12 mt-6">
        <HoverButton text1="Get Started" text2="Let's go" className="h-full max-w-sm" />
      </div>
    </main>
  )
}
