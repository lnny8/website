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

    const geometry = new THREE.PlaneGeometry(10, 10, 128, 128)
    const material = new THREE.MeshPhysicalNodeMaterial()

    material.positionNode = Fn(() => {
      const pos = positionLocal
      const normal = normalLocal
      const noise = mx_noise_vec3(pos.add(time))
      const displacement = noise.mul(0.5)
      return pos.add(displacement.mul(normal))
    })()

    material.colorNode = Fn(() => {
      const noise = mx_noise_vec3(positionLocal.mul(0.3).add(time.mul(0.1)))
      const türkis = uniform(new THREE.Color(0x00ffff))
      const blau = uniform(new THREE.Color(0x0000ff))
      const black = uniform(new THREE.Color(0x000000))
      const red = uniform(new THREE.Color(0xff0000))
      const green = uniform(new THREE.Color(0x00ff00))
      const mixed = mix(black, green, smoothstep(0, 0.5, noise))
      return mixed
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
