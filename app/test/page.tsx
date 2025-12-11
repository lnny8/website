"use client"
import React, {useEffect, useRef} from "react"
import * as THREE from "three"
import {WebGPURenderer} from "three/webgpu"
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js"
import {GLTFLoader} from "three/examples/jsm/Addons.js"
import {OrbitControls} from "three/examples/jsm/Addons.js"
import {uniform, positionLocal, normalLocal, time, sin, mix, Fn, mx_noise_vec3, abs} from "three/tsl"

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const letters = ["l", "e", "n", "n", "y"]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (!("gpu" in navigator)) {
      console.error("WebGPU wird nicht unterstützt.")
      return
    }
    const renderer = new WebGPURenderer({canvas})
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    const scene = new THREE.Scene()
    // const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 1000)
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.x = (letters.length * 70) / 2
    camera.position.y = 100
    camera.position.z = 500
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(5, 5, 5)
    scene.add(light)

    const material = new THREE.MeshPhysicalMaterial()
    material.metalness = 0.0
    material.roughness = 0.0
    material.transmission = 0.5 // 50% see-through
    material.thickness = 1.0
    material.ior = 1.5 // Glass refraction index
    material.transparent = true
    material.opacity = 0.6
    material.side = THREE.DoubleSide

    const color1 = uniform(new THREE.Color(0x6366f1)) // Indigo
    const color2 = uniform(new THREE.Color(0xec4899)) // Pink

    material.positionNode = Fn(() => {
      const pos = positionLocal 
      const norm = normalLocal 

      const noise = mx_noise_vec3(pos.mul(1).add(time))
      
      const displacement = noise.mul(0.3)

      return pos.add(displacement)
    })()

    const geometry = new THREE.TorusKnotGeometry(100, 30, 300, 200)
    const mesh = new THREE.Mesh(geometry, material)
    // scene.add(mesh)

    const loader = new FBXLoader()
    const group = new THREE.Group()
    scene.add(group)
    for (let i = 0; i < letters.length; i++) {
      loader.load(`/letters/${letters[i]}.fbx`, (object) => {
        object.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh
            mesh.material = material
          }
        })
        let offset;
        switch (i) {
          case 0:
            offset = 0
            break
          case 1:
            offset = 60
            break
          case 2:
            offset = 120
            break
          case 3:
            offset = 200
            break
          case 4:
            offset = 280
            break
          default:
            offset = -10
            break
        }
        object.position.x = offset
        group.add(object)
        group.rotation.set(0, 2*Math.PI/20, 0)
        group.position.set(-180, 0, 0)
      })
    }
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
      hoverEffect()
      mesh.rotation.y += 0.0005
      controls.update()
    }

    // Create a gradient that moves based on position and time
    const gradientFactor = sin(positionLocal.length().mul(0.05).add(time)).mul(-0.5).add(0.5)

    // Add a pulsating brightness effect
    const pulse = sin(time.mul(2.0)).mul(0.3).add(0.7)

    // Mix the two colors based on gradient
    const finalColor = mix(color1, color2, gradientFactor)

    // Apply to emissive (makes it glow through the glass)
    material.emissiveNode = finalColor.mul(pulse)

    function hoverEffect() {
      const time = performance.now() * 0.001
      for (let i = 0; i < group.children.length; i++) {
        const child = group.children[i]
        child.position.y = Math.sin(time + i) * 10
      }
    }

    animate()
    return () => {
      renderer.dispose()
    }
  }, [])

  return (
    <main className="h-full w-[97vw] flex items-center justify-center bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
    </main>
  )
}
