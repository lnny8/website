"use client"
import * as THREE from "three/webgpu"
import {float, vec3, mx_fractal_noise_vec3, positionLocal, time, mx_noise_vec3} from "three/tsl"
import {useEffect} from "react"

export default function Background() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement
    if (!canvas) return

    const renderer = new THREE.WebGPURenderer({canvas, antialias: true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1

    const scene = new THREE.Scene()
    const aspect = window.innerWidth / window.innerHeight
    const camera = new THREE.PerspectiveCamera(70, aspect, 0.1, 25)
    camera.position.z = 1.2
    camera.lookAt(0, 0, 0)

    function onResize() {
      const aspect = window.innerWidth / window.innerHeight
      camera.aspect = aspect
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", onResize)

    const geometry = new THREE.IcosahedronGeometry(0.3, 10)
    const material = new THREE.MeshStandardNodeMaterial()
    material.colorNode = getColor()
    material.roughnessNode = float(0.35)
    material.metalnessNode = float(0.12)

    const object = new THREE.Mesh(geometry, material)
    object.castShadow = true

    const noise = mx_noise_vec3(positionLocal.add(time.mul(0.2)))

    scene.add(object)
    const adding = mx_noise_vec3(positionLocal.add(time.mul(0.2)))
    material.positionNode = positionLocal.xyz.add(adding.mul(0.1))

    const ambientLight = new THREE.AmbientLight(0x1a1d28, 0.35)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xfff6d9, 2)
    keyLight.position.set(3.5, 4.5, 2.5)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.set(2048, 2048)
    keyLight.shadow.camera.near = 0.5
    keyLight.shadow.camera.far = 10
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0x5ea9ff, 0.6)
    rimLight.position.set(-4, 2, -3)
    scene.add(rimLight)

    let isRunning = true
    let animationFrameId: number | null = null

    const animate = () => {
      if (!isRunning) return
      object.rotation.y += 0.01
      object.rotation.x += 0.004
      void renderer.renderAsync(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      isRunning = false
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", onResize)
      renderer.dispose()
    }
  }, [])

  function getColor() {
    const noise = mx_fractal_noise_vec3(positionLocal.mul(2).add(time.mul(0.35)))
    const balancedNoise = noise.add(vec3(1)).mul(0.5)
    const deepBlue = vec3(0.92, 0.32, 0.82)
    const sunset = vec3(0.12, 0.45, 0.98)
    return deepBlue.mix(sunset, balancedNoise.x)
  }

  return <canvas style={{width: "100vw", height: "100vh", touchAction: "none", display: "block", backgroundColor: "#000"}} id="myCanvas" />
}
