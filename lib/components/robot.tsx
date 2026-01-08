"use client"
import React, {useRef, useState, useEffect} from "react"
import {Canvas, useLoader, useFrame} from "@react-three/fiber"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js"
import {OrbitControls} from "@react-three/drei"
import * as THREE from "three"

export default function Robot() {
  const [mousePos, setMousePos] = useState({x: 0, y: 0})
  const [isShaking, setIsShaking] = useState(false)
  const [showPermissionButton, setShowPermissionButton] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const lastAcceleration = useRef({x: 0, y: 0, z: 0})

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Prüfe ob iOS Permission nötig ist
    if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
      setShowPermissionButton(true)
    } else {
      // Nicht-iOS: direkt aktivieren
      startMotionDetection()
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      stopMotionDetection()
    }
  }, [])

  const handleDeviceMotion = (e: DeviceMotionEvent) => {
    if (!e.accelerationIncludingGravity) return

    const current = {
      x: e.accelerationIncludingGravity.x || 0,
      y: e.accelerationIncludingGravity.y || 0,
      z: e.accelerationIncludingGravity.z || 0,
    }

    const deltaX = Math.abs(current.x - lastAcceleration.current.x)
    const deltaY = Math.abs(current.y - lastAcceleration.current.y)
    const deltaZ = Math.abs(current.z - lastAcceleration.current.z)

    if (deltaX + deltaY + deltaZ > 30) {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
    }

    lastAcceleration.current = current
  }

  const startMotionDetection = () => {
    window.addEventListener("devicemotion", handleDeviceMotion)
  }

  const stopMotionDetection = () => {
    window.removeEventListener("devicemotion", handleDeviceMotion)
  }

  const requestMotionPermission = async () => {
    try {
      const permission = await (DeviceMotionEvent as any).requestPermission()
      if (permission === "granted") {
        setPermissionGranted(true)
        setShowPermissionButton(false)
        startMotionDetection()
      }
    } catch (error) {
      console.error("Permission error:", error)
      // Bei Fehler Button wieder anzeigen
      setShowPermissionButton(true)
    }
  }

  return (
    <div className="-inset-30 md:absolute md:h-auto h-84 w-full md:w-auto">
      {showPermissionButton && (
        <button
          onClick={requestMotionPermission}
          className="absolute top-4 right-4 z-50 bg-lime text-black px-4 py-2 rounded-lg font-medium hover:bg-lime/80 transition-colors"
        >
          Enable Shake
        </button>
      )}
      <Canvas>
        {/* <OrbitControls /> */}
        <RobotContainer mousePos={mousePos} isShaking={isShaking} />
        <directionalLight position={[0.5, -0.5, 1]} color="white" />
      </Canvas>
    </div>
  )

  function RobotContainer({mousePos, isShaking}: {mousePos: {x: number; y: number}; isShaking: boolean}) {
    const groupRef = useRef<THREE.Group>(null)
    const shakeTime = useRef(0)

    useFrame((state, delta) => {
      if (!groupRef.current) return

      if (isShaking) {
        shakeTime.current += delta * 20
        groupRef.current.rotation.x = Math.sin(shakeTime.current) * 0.2 + mousePos.y * 0.1
        groupRef.current.rotation.z = Math.cos(shakeTime.current) * 0.2
        groupRef.current.position.x = Math.sin(shakeTime.current * 2) * 0.1
      } else {
        shakeTime.current = 0
        groupRef.current.rotation.x = mousePos.y * 0.1
        groupRef.current.rotation.z = 0
        groupRef.current.position.x = 0
      }

      groupRef.current.rotation.y = mousePos.x * 0.1 - Math.PI / 2
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
