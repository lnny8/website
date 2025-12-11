"use client"
import React, {useEffect} from "react"
import {Fn, mix, mx_noise_vec3, normalLocal, positionLocal, sin, time, uniform} from "three/tsl"
import * as THREE from "three/webgpu"

export default function Blob() {
  useEffect(() => {
    const canvas = document.getElementById("tutorial-blob-canvas") as HTMLCanvasElement
    if (!canvas) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 200 / 200, 0.1, 1000)
    const renderer = new THREE.WebGPURenderer({canvas, alpha: true})
    renderer.setPixelRatio(window.devicePixelRatio)
    const pointLight = new THREE.PointLight(0xffffff, 2, 10)
    pointLight.position.set(2, 2, 2)
    scene.add(pointLight)

    const resize = () => {
      const width = canvas.clientWidth || 200
      const height = canvas.clientHeight || 200
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener("resize", resize)

    const geometry = new THREE.IcosahedronGeometry(1, 10)
    const material = new THREE.MeshPhysicalNodeMaterial()
    material.wireframe = true

    material.positionNode = Fn(() => {
      const pos = positionLocal
      const noise = mx_noise_vec3(pos.mul(1.2).add(time))
      const displacement = noise.mul(0.3)
      return pos.add(displacement)
    })()

    material.emissiveNode = Fn(() => {
      const color1 = uniform(new THREE.Color(0x6366f1)) // Indigo
      const color2 = uniform(new THREE.Color(0xec4899)) // Pink
      const gradientFactor = sin(time)
      const mixedColor = mix(color1, color2, gradientFactor)
      return mixedColor
    })()
    const sphere = new THREE.Mesh(geometry, material)
    camera.position.z = 2
    scene.add(sphere)

    let frameId: number | null = null
    function animate() {
      frameId = requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId)
      window.removeEventListener("resize", resize)
      sphere.geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="w-90 h-90 relative">
      <canvas className="w-90 h-90" id="tutorial-blob-canvas" />
    </div>
  )
}
