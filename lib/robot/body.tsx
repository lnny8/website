import {useAnimations, useGLTF} from "@react-three/drei"
import {useTheme} from "next-themes"
import {useEffect, useRef, useState} from "react"
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

  const nodes = result.nodes as any

  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#222"),
    metalness: 0.4,
    roughness: 1.0,
  })

  const bodyMaterialLight = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#ddd"),
    metalness: 0.4,
    roughness: 1.0,
  })

  const screenMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#000000"),
    metalness: 1.0,
    roughness: 0.2,
  })

  const lightMaterial = new THREE.MeshStandardMaterial({
    emissive: new THREE.Color("#ffffff"),
    emissiveIntensity: 200.0,
  })

  const lightMaterialLight = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#888"),
    metalness: 1.0,
    roughness: 1.0,
  })

  const [lightTheme, setLightTheme] = useState<boolean>(theme === "light")

  useEffect(() => {
    if (theme === "dark") {
      setLightTheme(false)
    } else if (theme === "light") {
      setLightTheme(true)
    }
  }, [theme])

  return (
    <group ref={bodyRef} dispose={null}>
      <group name="Scene">
        <mesh
          name="head"
          castShadow
          receiveShadow
          geometry={nodes.head.geometry}
          material={theme == "light" ? bodyMaterialLight : bodyMaterial}
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
          material={lightTheme ? bodyMaterialLight : bodyMaterial}
          position={[0, 1.044, 0]}
          scale={0.557}
        />
        <mesh
          name="arm_right"
          castShadow
          receiveShadow
          geometry={nodes.arm_right.geometry}
          material={theme == "light" ? bodyMaterialLight : bodyMaterial}
          position={[-0.02, 1.262, -0.679]}
          scale={0.163}
        />
        <mesh
          name="arm_left"
          castShadow
          receiveShadow
          geometry={nodes.arm_left.geometry}
          material={theme == "light" ? bodyMaterialLight : bodyMaterial}
          position={[-0.01, 1.252, 0.678]}
          rotation={[0, 0, -Math.PI]}
          scale={-0.163}
        />
        <group name="light_armature" position={[0, 3.477, -0.014]}>
          <group name="light">
            <skinnedMesh
              name="Icosphere"
              geometry={nodes.Icosphere.geometry}
              material={theme == "light" ? lightMaterialLight : lightMaterial}
              skeleton={nodes.Icosphere.skeleton}
            />
            <skinnedMesh
              name="Icosphere_1"
              geometry={nodes.Icosphere_1.geometry}
              material={theme == "light" ? bodyMaterialLight : bodyMaterial}
              skeleton={nodes.Icosphere_1.skeleton}
            />
          </group>
          <primitive object={nodes.Bone} />
        </group>
      </group>
    </group>
  )
}
