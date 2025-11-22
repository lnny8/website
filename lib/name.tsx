"use client"
import React, {useEffect} from "react"
import * as THREE from "three"
import {AsciiEffect} from "three/examples/jsm/Addons.js"
import {FontLoader, TTFLoader} from "three/examples/jsm/Addons.js"
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js"

export default function Page() {
  useEffect(() => {
    let cleanup: (() => void) | undefined
    init().then((fn) => {
      cleanup = fn
    })
    return () => {
      cleanup?.()
    }
  }, [])

  async function init() {
    const canvas = document.getElementById("name-canvas") as HTMLCanvasElement
    if (!canvas) {
      console.error("Canvas element #name-canvas not found.")
      return
    }
    canvas.style.display = "none"

    const renderer = new THREE.WebGLRenderer({canvas})
    renderer.setSize(window.innerWidth, window.innerHeight)

    const camera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 0.1, 1000)
    camera.position.z = 200

    const scene = new THREE.Scene()

    // is mobile?
    const isMobile = /Mobi|Android/i.test(navigator.userAgent)
 
    
    const effect = new AsciiEffect(renderer, " nnley", {invert: true, resolution: 0.15})
    effect.setSize(window.innerWidth, window.innerHeight)
    effect.domElement.style.position = "absolute"
    effect.domElement.style.top = "0px"
    document.body.appendChild(effect.domElement)
    const previousOverflowX = document.body.style.overflowX
    document.body.style.overflowX = "hidden"

    const loader = new TTFLoader()
    const fontLoader = new FontLoader()
    let font

    try {
      const fontData = await loader.loadAsync("/jakarta.ttf")
      font = fontLoader.parse(fontData)
    } catch (error) {
      console.error("Failed to load font file.", error)
      return
    }

    const textGeometry = new TextGeometry("lenny", {
      font,
      size: isMobile ? 90 : 180,
      curveSegments: 12,
      bevelEnabled: false,
    })
    const textMesh = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({color: 0xffffff}))
    textGeometry.center()
    textMesh.position.set(0, 0, 0)
    scene.add(textMesh)

    const mouse = {x: 0, y: 0}
    const rotationFactor = 1
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position so rotation remains subtle on large screens
      mouse.x = (event.clientX - window.innerWidth / 2) / window.innerWidth
      mouse.y = (event.clientY - window.innerHeight / 2) / window.innerHeight
    }
    window.addEventListener("mousemove", handleMouseMove)

    let animationId: number

    function animate() {
      animationId = requestAnimationFrame(animate)
      const targetRotationY = mouse.x * rotationFactor
      const targetRotationX = -mouse.y * rotationFactor
      // Ease towards the desired rotation so the motion feels smoother
      textMesh.rotation.y += (targetRotationY - textMesh.rotation.y) * 0.1
      textMesh.rotation.x += (targetRotationX - textMesh.rotation.x) * 0.1
      effect.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.left = -window.innerWidth / 2
      camera.right = window.innerWidth / 2
      camera.top = window.innerHeight / 2
      camera.bottom = -window.innerHeight / 2
      camera.updateProjectionMatrix()
      effect.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      effect.domElement.remove()
      document.body.style.overflowX = previousOverflowX
      renderer.dispose()
      textGeometry.dispose()
    }
  }

  return <canvas id="name-canvas" className="overflow-hidden" style={{display: "none"}} />
}
