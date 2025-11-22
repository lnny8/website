"use client"
import React, {useEffect, useRef} from "react"
import * as THREE from "three/webgpu"
import * as TSL from "three/tsl"
import {bloom} from "three/examples/jsm/tsl/display/BloomNode.js"

export default function Game() {
  const mouseRef = useRef({x: 0, y: 0})
  const isMobile = typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)

  useEffect(() => {
    if (typeof window === "undefined") return

    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement
    const renderer = new THREE.WebGPURenderer({canvas, antialias: true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const aspect = window.innerWidth / window.innerHeight
    const size = 4
    const camera = new THREE.OrthographicCamera(-aspect * size, aspect * size, size, -size, -100, 10)
    camera.position.z = 1

    const geometry = new THREE.IcosahedronGeometry(2, 1)
    const material = new THREE.MeshBasicNodeMaterial()
    // Use a uniform so the color can be updated each frame
    const colorUniform = TSL.uniform(new THREE.Vector3(1, 1, 1))
    const distanceUniform = TSL.uniform(0)
    material.colorNode = colorUniform as any
    material.userData.distanceToCenter = distanceUniform as any

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Post-Processing mit Bloom
    const PostProcessing = new THREE.PostProcessing(renderer)
    const pass = TSL.pass(scene, camera)
    const sceneColor = pass.getTextureNode()
    const bloomPass = bloom(sceneColor, 1.4, 0.55, 0.01)
    PostProcessing.outputNode = TSL.add(sceneColor, bloomPass)

    // Wichtig: WebGPURenderer async initialisieren!
    let frameId: number | null = null
    renderer.init().then(() => {
      function animate() {
        // Map mouse [-1,1] -> [0,1]
        const nx = (mouseRef.current.x + 1) * 0.5
        const ny = (mouseRef.current.y + 1) * 0.5
        const d = 1 - getMouseDistanceToCenter()
        colorUniform.value.set(nx * d, (0.2 + 0.8 * ny) * d, (1 - nx) * d)
        distanceUniform.value = d

        mesh.rotation.x += 0.01
        mesh.rotation.y += 0.01
        PostProcessing.renderAsync()
        frameId = requestAnimationFrame(animate)
      }
      animate()
    })

    const handleResize = () => {
      const aspect = window.innerWidth / window.innerHeight
      camera.left = -aspect * size
      camera.right = aspect * size
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (frameId !== null) cancelAnimationFrame(frameId)
      // Dispose in safe order: materials and geometries before renderer
      try {
        ;(PostProcessing as any)?.dispose?.()
      } catch {}
      try {
        material.dispose()
      } catch {}
      try {
        geometry.dispose()
      } catch {}
      try {
        renderer.dispose()
      } catch {}
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      mouseRef.current = {x, y}
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  function getMouseDistanceToCenter() {
    if (isMobile) return 0
    const x = mouseRef.current.x
    const y = mouseRef.current.y
    const centerX = 0
    const centerY = 0
    return Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <canvas id="myCanvas" className="absolute inset-0" aria-label="WebGPU shader exploration by Lenny Muffler" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">WebGPU research</p>
        <h1 className="text-4xl font-bold">Color Bloom Shader</h1>
        <p className="text-white/80">Built to test bloom nodes, mouse-driven uniforms, and async renderer init. This scene is part of my shader toolkit for premium hero sections.</p>
        <p className="text-white/60">Move the cursor to nudge chroma and bloom intensity — a small preview of how Lenny Muffler blends creative direction with performance budgets.</p>
      </div>
    </main>
  )
}
