"use client"
import {Canvas, useFrame} from "@react-three/fiber"
import {Environment, Image as DreiImage, MeshReflectorMaterial, OrbitControls} from "@react-three/drei"
import {Suspense, useEffect, useMemo, useRef, useState} from "react"
import * as THREE from "three"

export const images = ["/art/1.jpeg", "/art/2.jpeg", "/art/3.jpeg", "/art/4.jpeg", "/art/5.jpeg", "/art/6.jpeg", "/art/7.jpeg", "/art/8.jpeg", "/art/9.jpeg", "/art/10.jpeg", "/art/11.jpeg", "/art/12.jpeg", "/art/13.jpeg", "/art/14.jpeg", "/art/15.jpeg", "/art/16.jpeg"]

function GalleryCard({url, angle, radius}: {url: string; angle: number; radius: number}) {
  const cardRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => {
    if (!cardRef.current) return
    const targetScale = hovered ? 1.12 : 1
    const currentScale = cardRef.current.scale.x
    const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, Math.min(1, delta * 10))
    cardRef.current.scale.setScalar(nextScale)
  })

  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius

  return (
    <group ref={cardRef} position={[x, 0, z]} rotation={[0, angle + Math.PI, 0]}>
      <DreiImage url={url} transparent side={THREE.DoubleSide} radius={0.12} scale={[2.1, 2.8]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} />
    </group>
  )
}

function GalleryScene() {
  const groupRef = useRef<THREE.Group>(null)
  const rotationTarget = useRef(0)

  useEffect(() => {
    let dragging = false

    const handleWheel = (event: WheelEvent) => {
      rotationTarget.current += event.deltaY * 0.0015
    }

    const handlePointerDown = () => {
      dragging = true
    }

    const handlePointerUp = () => {
      dragging = false
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragging) return
      rotationTarget.current += event.movementX * -0.006
    }

    window.addEventListener("wheel", handleWheel, {passive: true})
    window.addEventListener("pointerdown", handlePointerDown)
    window.addEventListener("pointerup", handlePointerUp)
    window.addEventListener("pointermove", handlePointerMove)

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("pointerdown", handlePointerDown)
      window.removeEventListener("pointerup", handlePointerUp)
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    rotationTarget.current += delta * 0.2
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotationTarget.current, Math.min(1, delta * 6))
  })

  const angles = useMemo(() => images.map((_, index) => (index / images.length) * Math.PI * 2), [])

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[100, -2.3, 100]}>
        <planeGeometry args={[400, 400]} />
        {/* <meshBasicMaterial color="#FF0000" /> */}
        <MeshReflectorMaterial resolution={1024} mirror={1} color="#FFFFFF" metalness={1.0} roughness={0.0} />
      </mesh>
      {/* <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2.1} minPolarAngle={Math.PI / 3} /> */}
      <group ref={groupRef}>
        {images.map((url, index) => (
          <GalleryCard key={url} url={url} angle={angles[index]} radius={6} />
        ))}
      </group>
    </>
  )
}

export default function Page() {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768
  return (
    <main className="h-screen w-full fixed z-5" style={{background: "#0b0b0d"}}>
      <Canvas camera={{position: isMobile ? [0, 0, 6] : [0, 0, 4], fov: 45}}>
        <Suspense fallback={null}>
          <color attach="background" args={["#0b0b0d"]} />
          <fog attach="fog" args={["#0b0b0d", 9, 20]} />
          <GalleryScene />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </main>
  )
}
