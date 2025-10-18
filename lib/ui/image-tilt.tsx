"use client"
import React from "react"
import Image from "next/image"
import gsap from "gsap"

export default function ImageTilt({picture, name}: {name: string; picture: string}) {
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

  return <Image src={picture} alt={name} width={500} height={500} className="rounded-xl"
  onMouseMove={(e) => handleImageMove(e)} onMouseEnter={(e) => handleImageEnter(e)} onMouseLeave={(e) => handleImageLeave(e)} />
}
