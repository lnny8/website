"use client"
import React, {useRef, useState, useEffect, Suspense} from "react"
import {Canvas, useFrame} from "@react-three/fiber"
import * as THREE from "three"
import gsap from "gsap"
import {Body} from "../robot/body"
import {Eyes} from "../robot/eyes"
import { smoothNoise } from "@/lib/data/smoothNoise"
import { Environment } from "@react-three/drei"
import { Loader2 } from "lucide-react"

type MousePos = {x: number; y: number}


export default function Robot() {
  const [mousePos, setMousePos] = useState<MousePos>({x: 0, y: 0})

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    const handleResize = () => {}

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="-inset-30 md:absolute md:h-auto h-84 w-full md:w-auto bg-red-500/0">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
        <directionalLight position={[0, 3, 10]} intensity={4} color="#ffffff" />
        <RobotModel mousePos={mousePos} />
      </Canvas>
    </div>
  )
}


function RobotModel({mousePos}: {mousePos: MousePos}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, smoothNoise(performance.now() * 0.001) * 1, 0.1)

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mousePos.x * 0.4 - Math.PI / 2, 0.1)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, mousePos.y * 0.1, 0.1)
  })
  return (
    <Suspense fallback={null}>
    <group
      ref={groupRef}
      scale={1}
      position={[0, -2.4, 0]}>
      <Body />
      <Eyes mousePos={mousePos} />
    </group>
    </Suspense>
  )
}
