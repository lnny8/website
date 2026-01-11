"use client"
import React, {useRef, useState} from "react"
import {AnimatePresence, motion} from "motion/react"
import {ChevronDown} from "lucide-react"
import gsap from "gsap"

interface AccordionItem {
  title: string
  icon: React.ReactNode
  content: string
  imageUrl: string
}

export default function Accordion({items = []}: {items: AccordionItem[]}) {
  const [openedIndex, setOpenedIndex] = useState<number | null>(null)

  const activeIndex = openedIndex ?? 0

  function handleImageEnter(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    gsap.to(e.currentTarget, {scale: 1.05, duration: 0.3, ease: "power2.out"})
  }
  function handleImageMove(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    const rotateX = (deltaY / (rect.height / 2)) * 10
    const rotateY = (deltaX / (rect.width / 2)) * -10

    gsap.to(e.currentTarget, {rotateX: rotateX, rotateY: rotateY, duration: 0.3, ease: "power2.out", transformPerspective: 500, transformOrigin: "center"})
  }
  function handleImageLeave(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    gsap.to(e.currentTarget, {scale: 1, rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out"})
  }

  return (
    <div className="grid md:grid-cols-2 mt-20 gap-10">
      <div className="">
        <div className="flex flex-col gap-4">
          {items.map((item, index) => (
            <motion.div animate={{height: "auto"}} key={index} className="bg-woodsmoke-light light:bg-white border border-white/5 light:border-black/5 rounded-xl relative">
              <button onClick={() => setOpenedIndex(openedIndex === index ? null : index)} className="w-full h-full flex cursor-pointer font-medium items-center px-6 py-4">
                <span className="flex gap-2">
                  {item.icon}
                  {item.title}
                </span>
                <ChevronDown className={`size-5 ml-auto transition-transform duration-300 ${openedIndex === index ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence initial={false}>
                {openedIndex === index && (
                  <motion.div key={"content" + index} initial={{height: 0}} animate={{height: "auto"}} exit={{height: 0}} transition={{duration: 0.25}} style={{overflow: "hidden"}}>
                    <p className="pb-4 px-6">{item.content}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="relative rounded-3xl group overflow-hidden w-full h-full aspect-3/2 bg-linear-to-br from-lime to-blue-400 flex items-center justify-center">
        <AnimatePresence initial={false}>
          <motion.img
            key={activeIndex}
            src={items[activeIndex].imageUrl}
            alt={"image of" + items[activeIndex].title}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.45}}
            className="absolute group-hover:scale-105 transition-transform duration-300"
            width={900}
            height={600}
            onMouseMove={(e) => handleImageMove(e)}
            onMouseEnter={(e) => handleImageEnter(e)}
            onMouseLeave={(e) => handleImageLeave(e)}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}