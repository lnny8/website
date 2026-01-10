import React, {useRef} from "react"
import {useGLTF} from "@react-three/drei"

export function Model(props: any) {
  const {nodes, materials} = useGLTF("/models/robot.glb") as any
  materials["body material"].metalness = 0.5
  materials["body material"].roughness = 1.0
  materials["screen material"].metalness = 0.5
  materials["screen material"].roughness = 1.0
  materials["light material"].emissiveIntensity = 2.0
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.head.geometry} material={materials["body material"]} position={[0, 2.533, 0]} scale={[1, 1, 1.486]} />
      <mesh castShadow receiveShadow geometry={nodes.display.geometry} material={materials["screen material"]} position={[0.131, 2.533, 0]} scale={[1, 1, 1.486]} />
      <mesh castShadow receiveShadow geometry={nodes.light.geometry} material={materials["light material"]} position={[0, 4.316, -0.703]} scale={0.274} />
      <mesh castShadow receiveShadow geometry={nodes.antenne.geometry} material={materials["body material"]} position={[0, 4.11, -0.565]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={[-0.135, -0.131, -0.135]} />
      <mesh castShadow receiveShadow geometry={nodes.body.geometry} material={materials["body material"]} position={[0, 1.044, 0]} scale={0.557} />
      <mesh castShadow receiveShadow geometry={nodes.arm_right.geometry} material={materials["body material"]} position={[0, 1.264, -0.829]} scale={0.163} />
      <mesh castShadow receiveShadow geometry={nodes.arm_right001.geometry} material={materials["body material"]} position={[0, 1.264, 0.825]} rotation={[0, 0, -Math.PI]} scale={-0.163} />
    </group>
  )
}

useGLTF.preload("/robot.glb")
