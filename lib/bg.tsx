"use client"
import React, {useEffect} from "react"
import {Fn, mix, mx_fractal_noise_vec3, mx_noise_vec3, normalLocal, positionLocal, sin, smoothstep, step, time, uniform} from "three/tsl"
import * as THREE from "three/webgpu"
import {bloom} from "three/addons/tsl/display/BloomNode.js"

export default function Blob() {
  useEffect(() => {
    const canvas = document.getElementById("background-canvas") as HTMLCanvasElement
    if (!canvas) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 200 / 200, 0.1, 1000)
    const renderer = new THREE.WebGPURenderer({canvas, alpha: true})
    renderer.setPixelRatio(window.devicePixelRatio)

    

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

    const pointLight = new THREE.PointLight(0xffffff, 2, 10)
    pointLight.position.set(0, 2, 2)
    scene.add(pointLight)
    scene.add(new THREE.AmbientLight(0xffffff, 0.1))

    const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.3)
    scene.add(pointLightHelper)

    const geometry = new THREE.IcosahedronGeometry(1, 15)
    const material = new THREE.MeshPhysicalNodeMaterial()

    material.positionNode = Fn(() => {
      const pos = positionLocal
      const normal = normalLocal
      const noise = mx_noise_vec3(pos.add(time))
      const displacement = noise.mul(0.5)
      return pos.add(displacement.mul(normal))
    })()

    material.colorNode = Fn(() => {
      const color1 = uniform(new THREE.Color(0xffffff))
      return color1
    })()

    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    camera.position.z = 2

    let frameId: number | null = null
    function animate() {
      frameId = requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId)
      window.removeEventListener("resize", resize)
      renderer.dispose()
    }
  }, [])

  return (
    <div className="w-full h-full fixed top-0 left-0 -z-1">
      <canvas className="w-full h-full" id="background-canvas" />
      hallo
    </div>
  )
}
