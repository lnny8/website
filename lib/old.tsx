"use client"
import * as THREE from "three/webgpu"
import {float, vec3, pass, mx_fractal_noise_vec3, positionLocal, mul, time, mx_noise_vec3, abs, sin} from "three/tsl"
import {useEffect, useRef} from "react"
import {PostProcessing} from "three/webgpu"
import {bloom} from "three/examples/jsm/tsl/display/BloomNode.js"

export default function Numbers() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement
    if (!canvas) return

    const renderer = new THREE.WebGPURenderer({canvas, antialias: true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const aspect = window.innerWidth / window.innerHeight
    const size = 4
    const camera = new THREE.PerspectiveCamera(70, aspect)
    camera.position.z = 1

    function onResize() {
      const aspect = window.innerWidth / window.innerHeight
      camera.aspect = aspect
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      // bloom node resizes itself each frame based on renderer size
    }
    window.addEventListener("resize", onResize)

    const postProcessing = new PostProcessing(renderer)
    const scenePass = pass(scene, camera)
    const sceneColor = scenePass.getTextureNode("output")
    const bloomPass = bloom(sceneColor, 1.4, 0.85, 0.2)
    postProcessing.outputNode = sceneColor.add(bloomPass)

    const geometry = new THREE.IcosahedronGeometry(0.3, 1)
    const material = new THREE.MeshBasicNodeMaterial()
    material.colorNode = getColor()
    // material.wireframe = true

    const object = new THREE.Mesh(geometry, material)

    scene.add(object)
    const adding = mx_noise_vec3(positionLocal.add(time.mul(0.2)))
    material.positionNode = positionLocal.xyz.add(adding.mul(0.7))

    let isRunning = true
    let animationFrameId: number | null = null

    const animate = async () => {
      if (!isRunning) return
      try {
        await postProcessing.renderAsync()
      } catch (error) {
        console.error("WebGPU render error", error)
        isRunning = false
        return
      }
      if (!isRunning) return
      animationFrameId = window.requestAnimationFrame(() => {
        void animate()
      })
    }
    void animate()

    return () => {
      isRunning = false
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", onResize)
      postProcessing.dispose()
      renderer.dispose()
    }
  }, [])

  function getColor() {
    const adding = mx_noise_vec3(positionLocal.add(time.mul(0.2)))
    return vec3(abs(sin(adding.x)), abs(sin(adding.y)), abs(sin(adding.z)))
  }

  return <canvas style={{width: "100vw", height: "100vh", touchAction: "none", display: "block", backgroundColor: "#000"}} id="myCanvas" />
}
