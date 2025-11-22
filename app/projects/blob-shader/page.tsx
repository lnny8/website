"use client"
import * as THREE from "three/webgpu"
import * as TSL from "three/tsl"
import {useEffect} from "react"

export default function Background() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement
    if (!canvas) return

    const renderer = new THREE.WebGPURenderer({canvas, antialias: true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const aspect = window.innerWidth / window.innerHeight
    const camera = new THREE.PerspectiveCamera(70, aspect)
    camera.position.z = 1

    function onResize() {
      const aspect = window.innerWidth / window.innerHeight
      camera.aspect = aspect
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", onResize)

    const geometry = new THREE.IcosahedronGeometry(0.5, 50)
    const material = new THREE.MeshBasicNodeMaterial()
    const hoverPointUniform = TSL.uniform(new THREE.Vector3())
    const hoverStrengthUniform = TSL.uniform(0)
    // material.wireframe = true

    const object = new THREE.Mesh(geometry, material)
    scene.add(object)

    const frequencyPosition = TSL.positionLocal.mul(10)
    const noise = TSL.mx_noise_vec3(frequencyPosition.add(TSL.time.mul(0.5)))
    const displacement = noise.x.mul(0.05)
    // push vertices near the hovered point outward
    const hoverPointNode = TSL.vec3(hoverPointUniform)
    const hoverDist = TSL.distance(TSL.positionLocal, hoverPointNode)
    const radius = TSL.float(0.2)
    const influence = TSL.clamp(TSL.float(1).sub(hoverDist.div(radius)), TSL.float(0), TSL.float(1))
    const hoverDisplacement = influence.mul(hoverStrengthUniform)
    const totalDisplacement = displacement.add(hoverDisplacement)
    const displacedPosition = TSL.positionLocal.add(TSL.normalLocal.mul(totalDisplacement))
    material.positionNode = displacedPosition
    const baseColorNode = getColor()
    const brightness = TSL.clamp(TSL.abs(totalDisplacement).mul(15), TSL.float(0), TSL.float(1))
    material.colorNode = TSL.mix(baseColorNode, TSL.vec3(1, 1, 1), brightness)

    let isRunning = true
    let animationFrameId: number | null = null

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    const localPoint = new THREE.Vector3()

    let targetHover = 0
    let currentHover = 0

    function onMouseMove(event: MouseEvent) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", onMouseMove)

    const animate = async () => {
      if (!isRunning) return

      // update raycaster and find intersection point in world space
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObject(object)

      if (intersects.length > 0) {
        const worldPoint = intersects[0].point
        object.worldToLocal(localPoint.copy(worldPoint))
        hoverPointUniform.value.copy(localPoint)
        targetHover = 1
      } else {
        targetHover = 0
      }

      currentHover += (targetHover - currentHover) * 0.18
      hoverStrengthUniform.value = currentHover * 0.05

      await renderer.renderAsync(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }
    void animate()

    return () => {
      isRunning = false
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("mousemove", onMouseMove)
      try {
        material.dispose()
      } catch {}
      try {
        geometry.dispose()
      } catch {}
      renderer.dispose()
    }
  }, [])

  function getColor() {
    return TSL.vec3(0.13, 0.77, 0.37).mul(TSL.vec3(0.8))
  }
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <canvas style={{width: "100vw", height: "100vh", touchAction: "none", display: "block", backgroundColor: "#000"}} id="myCanvas" aria-label="Interactive WebGPU blob shader by Lenny Muffler" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">WebGPU experiment</p>
        <h1 className="mt-4 text-4xl font-bold">Organic Blob Shader</h1>
        <p className="mt-4 text-white/80">Exploring WebGPU nodes, interactive ray-marching, and hover-reactive displacement. This study shows how I combine GLSL intuition with the new Three.js node APIs to craft tactile hero backgrounds for brands.</p>
        <p className="mt-4 text-white/60">Move the cursor to warp the surface and see how the lighting stack responds. The project demonstrates how Lenny Muffler prototypes realtime visuals for campaigns and landing pages.</p>
      </div>
    </main>
  )
}
