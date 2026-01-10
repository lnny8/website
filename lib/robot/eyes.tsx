import {useAnimations} from "@react-three/drei"
import {useLoader, useFrame} from "@react-three/fiber"
import {useRef} from "react"
import * as THREE from "three" 
import { GLTFLoader } from "three/examples/jsm/Addons.js" 
import { smoothNoise } from "@/lib/data/smoothNoise"

interface MousePos {
  x: number
  y: number
}

export function Eyes({mousePos}: {mousePos: MousePos}) {
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
