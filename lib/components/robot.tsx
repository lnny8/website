"use client"
import React, {useRef, useState, useEffect} from "react"
import {Canvas, useLoader, useFrame} from "@react-three/fiber"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js"
import {Environment, OrbitControls, useAnimations, useGLTF, useHelper} from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap"
import {useTheme} from "next-themes"

type MousePos = {x: number; y: number}

function smoothNoise(x: number): number {
  const i = Math.floor(x)
  const f = x - i
  const fade = f * f * (3 - 2 * f)

  const a = Math.sin(i * 12.9898 + 78.233) * 43758.5453
  const b = Math.sin((i + 1) * 12.9898 + 78.233) * 43758.5453

  const result = (a - Math.floor(a)) * (1 - fade) + (b - Math.floor(b)) * fade
  return result - 0.5
}

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
        {/* <OrbitControls /> */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
        <directionalLight position={[0, 3, 10]} intensity={0.2} color="#ffffff" />
        <RobotContainer mousePos={mousePos} />
      </Canvas>
    </div>
  )
}

function RobotContainer({mousePos}: {mousePos: MousePos}) {
  const groupRef = useRef<THREE.Group>(null)
  const {theme} = useTheme()
  // let animating = true

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, smoothNoise(performance.now() * 0.001) * 1, 0.1)

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mousePos.x * 0.4 - Math.PI / 2, 0.1)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, mousePos.y * 0.1, 0.1)
  })

  return (
    <group
      onClick={() => {
        if (!groupRef.current) return
        gsap.to(groupRef.current.rotation, {
          z: "+=6.28319",
          duration: 2,
          ease: "power2.inOut",
        })
      }}
      ref={groupRef}
      scale={1.3}
      position={[0, -2.8, 0]}>
      <RobotModel mousePos={mousePos} />
    </group>
  )
}

function RobotModel({mousePos}: {mousePos: MousePos}) {
  return (
    <mesh>
      <Body />
      <Eyes mousePos={mousePos} />
    </mesh>
  )
}

function Body() {
  const result = useGLTF("/models/robot.glb")
  const bodyRef = useRef<THREE.Group>(null)

  const {theme} = useTheme()
  const animations = useAnimations(result.animations, bodyRef)
  const wave_right_action = animations.actions["wave_right"]
  const wave_left_action = animations.actions["wave_left"]
  const wiggle_light_action = animations.actions["light_wiggle"]

  useEffect(() => {
    if (!wave_right_action) return
    if (!wave_left_action) return
    if (!wiggle_light_action) return
    wave_right_action.reset().play()
    wave_left_action.reset().play()
    wiggle_light_action.reset().timeScale = 0.42
    wiggle_light_action.reset().play()
  }, [wave_right_action, wave_left_action, wiggle_light_action])

  useEffect(() => {
    if (result.scene) {
      result.scene.traverse((child: any) => {
        if (child.isMesh) {
          child.material.needsUpdate = true
          if (child.material.metalness !== undefined) {
            child.material.metalness = 0.5
            child.material.roughness = 1.0
          }
        }
      })
    }
  }, [result.scene])

  useEffect(() => {
    if (theme == "light") {
      if (result.scene) {
        result.scene.traverse((child: any) => {
          if (child.isMesh) {
            child.material.needsUpdate = true
            child.material.color.set("#ffffff")
          }
        })
      }
    }
    if (theme == "dark") {
      if (result.scene) {
        result.scene.traverse((child: any) => {
          if (child.isMesh) {
            child.material.needsUpdate = true
            child.material.color.set("#494949")
          }
        })
      }
    }
  }, [theme, result.scene])

  return <primitive ref={bodyRef} object={result.scene} />
}

function Eyes({mousePos}: {mousePos: MousePos}) {
  const result_right_eye = useLoader(GLTFLoader, "/models/right_eye.glb")
  const result_left_eye = useLoader(GLTFLoader, "/models/left_eye.glb")
  const eyesRightRef = useRef<THREE.Group>(null)
  const eyesLeftRef = useRef<THREE.Group>(null)

  const animations_right = useAnimations(result_right_eye.animations, eyesRightRef)
  const animations_left = useAnimations(result_left_eye.animations, eyesLeftRef)
  const blink_right_action = animations_right.actions["blink_right"]
  const blink_left_action = animations_left.actions["blink_left"]
  const nextBlinkTime = useRef<number>(0)

  async function blinkEyes() {
    if (!blink_right_action || !blink_left_action) return
    blink_left_action.setLoop(THREE.LoopOnce, 1)
    blink_right_action.setLoop(THREE.LoopOnce, 1)
    blink_left_action.clampWhenFinished = true
    blink_right_action.clampWhenFinished = true
    blink_left_action.timeScale = 2
    blink_right_action.timeScale = 2
    if (Math.random() > 0.5) {
      blink_right_action.reset().play()
      await new Promise((resolve) => setTimeout(resolve, (Math.random() - 0.5) * 100))
      blink_left_action.reset().play()
    } else {
      blink_left_action.reset().play()
      await new Promise((resolve) => setTimeout(resolve, (Math.random() - 0.5) * 100))
      blink_right_action.reset().play()
    }
  }

  useFrame((state, delta) => {
    if (!eyesRightRef.current || !eyesLeftRef.current) return

    eyesRightRef.current.position.z = THREE.MathUtils.lerp(eyesRightRef.current.position.z, 4 * -1 * mousePos.x * 0.1, 0.1)
    eyesRightRef.current.position.y = THREE.MathUtils.lerp(eyesRightRef.current.position.y, 2 * mousePos.y * 0.1, 0.1)

    eyesLeftRef.current.position.z = THREE.MathUtils.lerp(eyesLeftRef.current.position.z, 4 * -1 * mousePos.x * 0.1, 0.1)
    eyesLeftRef.current.position.y = THREE.MathUtils.lerp(eyesLeftRef.current.position.y, 2 * mousePos.y * 0.1, 0.1)

    eyesLeftRef.current.position.z += smoothNoise(state.clock.elapsedTime * 0.5 + 0) * 0.01
    eyesLeftRef.current.position.y += smoothNoise(state.clock.elapsedTime * 0.5 + 1000) * 0.01

    eyesRightRef.current.position.z += smoothNoise(state.clock.elapsedTime * 0.5 + 2000) * 0.01
    eyesRightRef.current.position.y += smoothNoise(state.clock.elapsedTime * 0.5 + 3000) * 0.01

    if (state.clock.elapsedTime > nextBlinkTime.current) {
      blinkEyes()
      nextBlinkTime.current = state.clock.elapsedTime + 1 + Math.random() * 2
    }
  })

  return (
    <group>
      <primitive ref={eyesRightRef} object={result_right_eye.scene} />
      <primitive ref={eyesLeftRef} object={result_left_eye.scene} />
    </group>
  )
}
