"use client"
import React, {useRef, useState, useEffect} from "react"
import {Canvas, useLoader, useFrame} from "@react-three/fiber"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js"
import {OrbitControls} from "@react-three/drei"
import * as THREE from "three"

export default function Robot() {
  const [mousePos, setMousePos] = useState({x: 0, y: 0})

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    const handleResize = () => {
      
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="-inset-30 md:absolute md:h-auto h-84 w-full md:w-auto" >
      <Canvas>
        {/* <OrbitControls /> */}
        <RobotContainer mousePos={mousePos} />
        <directionalLight position={[0.5, -0.5, 1]} color="white" />
      </Canvas>
    </div>
  )

  function RobotContainer({mousePos}: {mousePos: {x: number; y: number}}) {
    const groupRef = useRef<THREE.Group>(null)

    useFrame(() => {
      if (!groupRef.current) return
      groupRef.current.rotation.y = mousePos.x * 0.1 - Math.PI / 2
      groupRef.current.rotation.z = mousePos.y * 0.1
    })

    return (
      <group ref={groupRef} position={[0, -2.5, 2]}>
        <Robot />
      </group>
    )
  }

  function Robot() {
    return (
      <mesh>
        <Body />
        <Eyes mousePos={mousePos} />
      </mesh>
    )
  }

  function Body() {
    const result = useLoader(GLTFLoader, "/models/robot.glb")
    return <primitive object={result.scene} />
  }
  function Eyes({mousePos}: {mousePos: {x: number; y: number}}) {
    const result = useLoader(GLTFLoader, "/models/eyes.glb")
    const eyesRef = useRef<THREE.Group>(null)

    useFrame(() => {
      if (!eyesRef.current) return
      eyesRef.current.position.z = THREE.MathUtils.lerp(eyesRef.current.position.z, 5 * -1 * mousePos.x * 0.1, 0.1)
      eyesRef.current.position.y = THREE.MathUtils.lerp(eyesRef.current.position.y, 3 * mousePos.y * 0.1, 0.1)
    })

    return <primitive ref={eyesRef} object={result.scene} />
  }
}
