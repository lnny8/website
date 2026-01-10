import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

export function Model(props: any) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF('/robot.glb') as any
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="head"
          castShadow
          receiveShadow
          geometry={nodes.head.geometry}
          material={materials['body material']}
          position={[0, 2.533, 0]}
          scale={[1, 1, 1.486]}
        />
        <mesh
          name="display"
          castShadow
          receiveShadow
          geometry={nodes.display.geometry}
          material={materials['screen material']}
          position={[0.131, 2.533, 0]}
          scale={[1, 1, 1.486]}
        />
        <mesh
          name="body"
          castShadow
          receiveShadow
          geometry={nodes.body.geometry}
          material={materials['body material']}
          position={[0, 1.044, 0]}
          scale={0.557}
        />
        <group name="Armature" position={[0, 1.249, -0.682]}>
          <skinnedMesh
            name="arm_right"
            geometry={nodes.arm_right.geometry}
            material={materials['body material']}
            skeleton={nodes.arm_right.skeleton}
          />
          <primitive object={nodes.Bone} />
        </group>
        <group name="Armature001" position={[0, 1.262, 0.682]}>
          <skinnedMesh
            name="arm_right001"
            geometry={nodes.arm_right001.geometry}
            material={materials['body material']}
            skeleton={nodes.arm_right001.skeleton}
          />
          <primitive object={nodes.Bone_1} />
        </group>
        <group name="Armature002" position={[0, 3.477, -0.014]}>
          <group name="light">
            <skinnedMesh
              name="Icosphere"
              geometry={nodes.Icosphere.geometry}
              material={materials['light material']}
              skeleton={nodes.Icosphere.skeleton}
            />
            <skinnedMesh
              name="Icosphere_1"
              geometry={nodes.Icosphere_1.geometry}
              material={materials['body material']}
              skeleton={nodes.Icosphere_1.skeleton}
            />
          </group>
          <primitive object={nodes.Bone_2} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/robot.glb')
