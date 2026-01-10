"use client"
import React, {useRef, useState, useEffect} from "react"
import {Canvas, useLoader, useFrame} from "@react-three/fiber"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js"
import {Environment, OrbitControls, useGLTF, useHelper} from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap"

type MousePos = {x: number; y: number}

function smoothNoise(x: number): number {
  const i = Math.floor(x)
  const f = x - i
  const fade = f * f * (3 - 2 * f)

  const a = Math.sin(i * 12.9898 + 78.233) * 43758.5453
  const b = Math.sin((i + 1) * 12.9898 + 78.233) * 43758.5453

  return (a - Math.floor(a)) * (1 - fade) + (b - Math.floor(b)) * fade
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

  useFrame(() => {
    if (!groupRef.current) return
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
  const bodyMixerRef = useRef<THREE.AnimationMixer | null>(null)
  const wiggleLightActionRef = useRef<THREE.AnimationAction | null>(null)
  const waveRightActionRef = useRef<THREE.AnimationAction | null>(null)
  const waveLeftActionRef = useRef<THREE.AnimationAction | null>(null)

  useEffect(() => {
    if (bodyRef.current && !bodyMixerRef.current) {
      bodyMixerRef.current = new THREE.AnimationMixer(bodyRef.current)
      const wiggleLightClip = THREE.AnimationClip.findByName(result.animations, "light_wiggle")
      if (wiggleLightClip) {
        const action = bodyMixerRef.current.clipAction(wiggleLightClip)
        action.timeScale = 0.42
        action.play()
        wiggleLightActionRef.current = action
      }
      const waveRightClip = THREE.AnimationClip.findByName(result.animations, "wave_right")
      if (waveRightClip) {
        const action = bodyMixerRef.current.clipAction(waveRightClip)
        action.play()
        waveRightActionRef.current = action
      }
      const waveLeftClip = THREE.AnimationClip.findByName(result.animations, "wave_left")
      if (waveLeftClip) {
        const action = bodyMixerRef.current.clipAction(waveLeftClip)
        action.play()
        waveLeftActionRef.current = action
      }
    }
  }, [result.animations])

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

  useFrame((state, delta) => {
    bodyMixerRef.current?.update(delta)
  })

  return <primitive ref={bodyRef} object={result.scene} />
}

function Eyes({mousePos}: {mousePos: MousePos}) {
  const result_right_eye = useLoader(GLTFLoader, "/models/right_eye.glb")
  const result_left_eye = useLoader(GLTFLoader, "/models/left_eye.glb")
  const eyesRightRef = useRef<THREE.Group>(null)
  const eyesLeftRef = useRef<THREE.Group>(null)
  const mixerLeftRef = useRef<THREE.AnimationMixer | null>(null)
  const mixerRightRef = useRef<THREE.AnimationMixer | null>(null)
  const blinkLeftActionRef = useRef<THREE.AnimationAction | null>(null)
  const blinkRightActionRef = useRef<THREE.AnimationAction | null>(null)
  const nextBlinkAtRef = useRef<number>(0)

  useEffect(() => {
    if (eyesLeftRef.current && !mixerLeftRef.current) {
      mixerLeftRef.current = new THREE.AnimationMixer(eyesLeftRef.current)
      const clip = THREE.AnimationClip.findByName(result_left_eye.animations, "blink_left") || result_left_eye.animations[0]
      if (clip) {
        const action = mixerLeftRef.current.clipAction(clip)
        action.loop = THREE.LoopOnce
        action.clampWhenFinished = true
        action.timeScale = 1.6
        blinkLeftActionRef.current = action
      }
    }

    if (eyesRightRef.current && !mixerRightRef.current) {
      mixerRightRef.current = new THREE.AnimationMixer(eyesRightRef.current)
      const clip = THREE.AnimationClip.findByName(result_right_eye.animations, "blink_right") || result_right_eye.animations[0]
      if (clip) {
        const action = mixerRightRef.current.clipAction(clip)
        action.loop = THREE.LoopOnce
        action.clampWhenFinished = true
        action.timeScale = 1.6
        blinkRightActionRef.current = action
      }
    }

    if (!nextBlinkAtRef.current) {
      nextBlinkAtRef.current = THREE.MathUtils.randFloat(1, 2)
    }
  }, [result_left_eye, result_right_eye])

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

    mixerLeftRef.current?.update(delta)
    mixerRightRef.current?.update(delta)

    const elapsed = state.clock.elapsedTime
    if (elapsed >= nextBlinkAtRef.current) {
      if (blinkLeftActionRef.current) {
        blinkLeftActionRef.current.reset().play()
      }
      if (blinkRightActionRef.current) {
        blinkRightActionRef.current.reset().play()
      }
      nextBlinkAtRef.current = elapsed + THREE.MathUtils.randFloat(2.5, 6)
    }
  })

  return (
    <group>
      <primitive ref={eyesRightRef} object={result_right_eye.scene} />
      <primitive ref={eyesLeftRef} object={result_left_eye.scene} />
    </group>
  )
}
