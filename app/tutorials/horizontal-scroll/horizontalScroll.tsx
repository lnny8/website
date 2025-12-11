"use client"

import React, {useRef} from "react"
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import {useGSAP} from "@gsap/react"

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      const container = containerRef.current
      const track = trackRef.current
      if (!container || !track) return

      const sections = gsap.utils.toArray<HTMLElement>(".tutorial-horizontal-scroll-section", track)
      if (!sections.length) return

      const handleWheel = (event: WheelEvent) => {
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
          event.preventDefault()
          event.stopPropagation()
          container.scrollLeft += event.deltaY
        }
      }

      container.addEventListener("wheel", handleWheel, {passive: false})

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - container.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: track,
          scroller: container,
          horizontal: true,
          start: "left left",
          end: () => track.scrollWidth - container.clientWidth,
          scrub: 0.6,
        },
      })

      return () => {
        container.removeEventListener("wheel", handleWheel)
        tween?.scrollTrigger?.kill()
        tween?.kill()
      }
    },
    {scope: containerRef}
  )

  return (
    <>
      <div ref={containerRef} className="tutorial-horizontal-scroll-main relative w-full h-96 overflow-x-auto overflow-y-hidden overscroll-contain">
        <div ref={trackRef} className="tutorial-horizontal-scroll-track flex h-full items-center gap-4 px-6">
          {[...Array(18)].map((_, i) => (
            <div key={i} className="tutorial-horizontal-scroll-section min-w-60 min-h-170 bg-blue-500 rounded-xl flex items-center justify-center text-xl">
              {i}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .tutorial-horizontal-scroll-main {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .tutorial-horizontal-scroll-main::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}
