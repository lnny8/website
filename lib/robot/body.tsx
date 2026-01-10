import {useAnimations, useGLTF} from "@react-three/drei"
import {useTheme} from "next-themes"
import {useEffect, useRef} from "react"
import * as THREE from "three"

export function Body() {
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

  const nodes = result.nodes as any

  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: theme === "light" ? new THREE.Color("#ffffff") : new THREE.Color("#494949"),
    metalness: 0.5,
    roughness: 1.0,
  })

  const screenMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#000000"),
    emissiveIntensity: 0.6,
    metalness: 0.1,
    roughness: 0.9,
  })

  const lightMaterial = new THREE.MeshStandardMaterial({
    emissive: new THREE.Color("#ffffff"),
    emissiveIntensity: 100.0,
  })

  return (
    <group ref={bodyRef} dispose={null}>
      <group name="Scene">
        <mesh
          name="head"
          castShadow
          receiveShadow
          geometry={nodes.head.geometry}
          material={bodyMaterial}
          position={[0, 2.533, 0]}
          scale={[1, 1, 1.486]}
        />
        <mesh
          name="display"
          castShadow
          receiveShadow
          geometry={nodes.display.geometry}
          material={screenMaterial}
          position={[0.131, 2.533, 0]}
          scale={[1, 1, 1.486]}
        />
        <mesh
          name="body"
          castShadow
          receiveShadow
          geometry={nodes.body.geometry}
          material={bodyMaterial}
          position={[0, 1.044, 0]}
          scale={0.557}
        />
        <mesh
          name="arm_right"
          castShadow
          receiveShadow
          geometry={nodes.arm_right.geometry}
          material={bodyMaterial}
          position={[-0.02, 1.262, -0.679]}
          scale={0.163}
        />
        <mesh
          name="arm_left"
          castShadow
          receiveShadow
          geometry={nodes.arm_left.geometry}
          material={bodyMaterial}
          position={[-0.01, 1.252, 0.678]}
          rotation={[0, 0, -Math.PI]}
          scale={-0.163}
        />
        <group name="light_armature" position={[0, 3.477, -0.014]}>
          <group name="light">
            <skinnedMesh
              name="Icosphere"
              geometry={nodes.Icosphere.geometry}
              material={lightMaterial}
              skeleton={nodes.Icosphere.skeleton}
            />
            <skinnedMesh
              name="Icosphere_1"
              geometry={nodes.Icosphere_1.geometry}
              material={bodyMaterial}
              skeleton={nodes.Icosphere_1.skeleton}
            />
          </group>
          <primitive object={nodes.Bone} />
        </group>
      </group>
    </group>
  )
}
