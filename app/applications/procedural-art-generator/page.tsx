"use client"

import HoverButton from "@/lib/components/hoverButton"
import React, {useEffect, useRef, useState} from "react"

type ArtMode = "Flow Field" | "Harmonic Bloom" | "Topographic Drift" | "Moire Loom" | "Fractal Canopy" | "Crystal Mesh"

type Palette = {
  name: string
  mood: string
  colors: [string, string, string, string, string]
  background: [string, string]
  ink: string
}

type GeneratorSettings = {
  complexity: number
  density: number
  energy: number
  symmetry: number
  texture: number
}

type DrawContext = {
  seed: number
  palette: Palette
  settings: GeneratorSettings
  width: number
  height: number
}

const CANVAS_WIDTH = 560
const CANVAS_HEIGHT = 360

const palettes: Palette[] = [
  {
    name: "Neon Dusk",
    mood: "Electric gradients, luminous edges, late-night poster energy.",
    colors: ["#ff4fa3", "#ff7a59", "#ffd166", "#4ef0c0", "#73a8ff"],
    background: ["#060711", "#21163a"],
    ink: "#f5f7ff",
  },
  {
    name: "Mineral Bloom",
    mood: "Muted mineral pigments with botanical warmth.",
    colors: ["#f4efe6", "#d88f6f", "#7b5ea7", "#528f89", "#f1c57a"],
    background: ["#0d1114", "#26333a"],
    ink: "#fff5ea",
  },
  {
    name: "Signal Print",
    mood: "Sharp editorial contrast with deep offsets and warm paper.",
    colors: ["#ff5f5d", "#ffb627", "#f8f4e3", "#4cc9f0", "#1d3557"],
    background: ["#090a0d", "#351628"],
    ink: "#fff4dc",
  },
  {
    name: "Forest Circuit",
    mood: "Moss, copper, and damp electronic terrain.",
    colors: ["#b7d18c", "#5abf90", "#2f7f76", "#f29f67", "#f6e8b1"],
    background: ["#09110d", "#1a3a2d"],
    ink: "#edf7ea",
  },
  {
    name: "Porcelain Heat",
    mood: "Pale ceramics cut with saturated heat signatures.",
    colors: ["#f8f0e3", "#f76f5e", "#f4b942", "#7692ff", "#272d4d"],
    background: ["#11131a", "#392f45"],
    ink: "#fff8ef",
  },
  {
    name: "Infra Garden",
    mood: "Infrared florals, cyan stems, and dark atmospheric depth.",
    colors: ["#ff4d6d", "#ff99c8", "#fefae0", "#56cfe1", "#118ab2"],
    background: ["#09040a", "#24152a"],
    ink: "#fff0f4",
  },
  {
    name: "Sand Matrix",
    mood: "Dry terrain layers with precise blue technical accents.",
    colors: ["#e9d8a6", "#d4a373", "#bc6c25", "#3a86ff", "#fefae0"],
    background: ["#100d0a", "#3a2617"],
    ink: "#fff7dc",
  },
  {
    name: "Velvet Tide",
    mood: "Low-light oceanic depth with velvet magenta interference.",
    colors: ["#c77dff", "#7b2cbf", "#5a189a", "#00b4d8", "#caf0f8"],
    background: ["#050816", "#1b1f4a"],
    ink: "#eef7ff",
  },
]

const artModes: Array<{mode: ArtMode; description: string}> = [
  {
    mode: "Flow Field",
    description: "Layered flow trajectories inspired by signal maps, smoke studies, and plotter-style line systems.",
  },
  {
    mode: "Harmonic Bloom",
    description: "Dense radial harmonics, rosette petals, and orbital details that feel closer to a finished print than a sketch.",
  },
  {
    mode: "Topographic Drift",
    description: "Contour stacking, elevation bands, and drifting ridge lines borrowed from cartography and erosion studies.",
  },
  {
    mode: "Moire Loom",
    description: "Interference fields, woven wave grids, and scanning-line distortions with strong poster energy.",
  },
  {
    mode: "Fractal Canopy",
    description: "Recursive vegetation, floating spores, and atmospheric haze with layered branch systems.",
  },
  {
    mode: "Crystal Mesh",
    description: "Triangulated shards, orbital anchors, and faceted cells that feel halfway between architecture and circuitry.",
  },
]

function mulberry32(seed: number) {
  let state = seed >>> 0
  return () => {
    state += 0x6d2b79f5
    let value = Math.imul(state ^ (state >>> 15), 1 | state)
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function lerp(from: number, to: number, mix: number) {
  return from + (to - from) * mix
}

function fitCanvas(canvas: HTMLCanvasElement, width = CANVAS_WIDTH, height = CANVAS_HEIGHT) {
  const ratio = window.devicePixelRatio || 1
  canvas.width = width * ratio
  canvas.height = height * ratio
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  const ctx = canvas.getContext("2d")
  if (!ctx) return null
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
  return ctx
}

function hexToRgb(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  }
}

function withAlpha(hex: string, alpha: number) {
  const {r, g, b} = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function mixHex(from: string, to: string, mix: number) {
  const a = hexToRgb(from)
  const b = hexToRgb(to)
  return `rgb(${Math.round(lerp(a.r, b.r, mix))}, ${Math.round(lerp(a.g, b.g, mix))}, ${Math.round(lerp(a.b, b.b, mix))})`
}

function valueNoise(x: number, y: number, seed: number) {
  const value = Math.sin(x * 127.1 + y * 311.7 + seed * 17.3) * 43758.5453123
  return value - Math.floor(value)
}

function smoothNoise(x: number, y: number, seed: number) {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const fx = x - ix
  const fy = y - iy
  const sx = fx * fx * (3 - 2 * fx)
  const sy = fy * fy * (3 - 2 * fy)

  const n00 = valueNoise(ix, iy, seed)
  const n10 = valueNoise(ix + 1, iy, seed)
  const n01 = valueNoise(ix, iy + 1, seed)
  const n11 = valueNoise(ix + 1, iy + 1, seed)
  const nx0 = lerp(n00, n10, sx)
  const nx1 = lerp(n01, n11, sx)
  return lerp(nx0, nx1, sy)
}

function fbm(x: number, y: number, seed: number, octaves: number) {
  let value = 0
  let amplitude = 0.55
  let frequency = 1
  let totalAmplitude = 0

  for (let octave = 0; octave < octaves; octave++) {
    value += smoothNoise(x * frequency, y * frequency, seed + octave * 11) * amplitude
    totalAmplitude += amplitude
    amplitude *= 0.52
    frequency *= 2.03
  }

  return value / totalAmplitude
}

function drawBackdrop(ctx: CanvasRenderingContext2D, drawContext: DrawContext) {
  const {palette, width, height, settings, seed} = drawContext
  const base = ctx.createLinearGradient(0, 0, width, height)
  base.addColorStop(0, palette.background[0])
  base.addColorStop(1, palette.background[1])
  ctx.fillStyle = base
  ctx.fillRect(0, 0, width, height)

  const glowA = ctx.createRadialGradient(width * 0.22, height * 0.24, 10, width * 0.22, height * 0.24, width * 0.5)
  glowA.addColorStop(0, withAlpha(palette.colors[0], 0.24 + settings.energy * 0.08))
  glowA.addColorStop(1, "rgba(0,0,0,0)")
  ctx.fillStyle = glowA
  ctx.fillRect(0, 0, width, height)

  const glowB = ctx.createRadialGradient(width * 0.8, height * 0.7, 10, width * 0.8, height * 0.7, width * 0.56)
  glowB.addColorStop(0, withAlpha(palette.colors[3], 0.2 + settings.texture * 0.08))
  glowB.addColorStop(1, "rgba(0,0,0,0)")
  ctx.fillStyle = glowB
  ctx.fillRect(0, 0, width, height)

  const image = ctx.createImageData(width, height)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const noise = fbm(x / 90, y / 90, seed + 900, 4)
      const grain = fbm(x / 14, y / 14, seed + 1200, 2)
      const amount = (noise * 0.7 + grain * 0.3) * settings.texture * 34
      const index = (y * width + x) * 4
      image.data[index] = amount
      image.data[index + 1] = amount
      image.data[index + 2] = amount
      image.data[index + 3] = 18
    }
  }
  ctx.putImageData(image, 0, 0)

  const vignette = ctx.createRadialGradient(width / 2, height / 2, Math.min(width, height) * 0.15, width / 2, height / 2, Math.max(width, height) * 0.68)
  vignette.addColorStop(0, "rgba(0,0,0,0)")
  vignette.addColorStop(1, "rgba(0,0,0,0.36)")
  ctx.fillStyle = vignette
  ctx.fillRect(0, 0, width, height)
}

function sprinkleDust(ctx: CanvasRenderingContext2D, rand: () => number, palette: Palette, width: number, height: number, amount: number) {
  for (let index = 0; index < amount; index++) {
    const radius = rand() * 1.8 + 0.3
    ctx.beginPath()
    ctx.arc(rand() * width, rand() * height, radius, 0, Math.PI * 2)
    ctx.fillStyle = withAlpha(palette.ink, 0.05 + rand() * 0.14)
    ctx.fill()
  }
}

function drawFlowField(ctx: CanvasRenderingContext2D, drawContext: DrawContext) {
  const {seed, palette, settings, width, height} = drawContext
  const rand = mulberry32(seed * 13 + 7)
  drawBackdrop(ctx, drawContext)

  const layerCount = Math.round(3 + settings.complexity * 4)
  const pathCount = Math.round(50 + settings.density * 150)
  const steps = Math.round(34 + settings.complexity * 44)

  for (let layer = 0; layer < layerCount; layer++) {
    const color = palette.colors[layer % palette.colors.length]
    for (let index = 0; index < pathCount; index++) {
      let x = rand() * width
      let y = rand() * height
      const velocity = 1.1 + settings.energy * 2.6 + rand() * 0.7
      ctx.beginPath()
      ctx.moveTo(x, y)

      for (let step = 0; step < steps; step++) {
        const field = fbm(x / (110 - settings.complexity * 48), y / (110 - settings.complexity * 48), seed + layer * 90, 5)
        const swirl = Math.atan2(y - height / 2, x - width / 2)
        const angle = field * Math.PI * 4.5 + swirl * settings.symmetry * 0.65
        x += Math.cos(angle) * velocity
        y += Math.sin(angle) * velocity
        if (settings.symmetry > 0.3 && step % 12 === 0) {
          const mirrorX = width - x
          const mirrorY = height - y
          ctx.lineTo(mirrorX, mirrorY)
        }
        ctx.lineTo(x, y)
        if (x < -10 || x > width + 10 || y < -10 || y > height + 10) break
      }

      ctx.strokeStyle = withAlpha(color, 0.08 + layer * 0.03)
      ctx.lineWidth = 0.55 + settings.texture * 0.6 + rand() * 1.2
      ctx.stroke()
    }
  }

  for (let halo = 0; halo < 7; halo++) {
    const x = rand() * width
    const y = rand() * height
    const glow = ctx.createRadialGradient(x, y, 0, x, y, 36 + rand() * 120)
    glow.addColorStop(0, withAlpha(palette.colors[(halo + 2) % palette.colors.length], 0.24))
    glow.addColorStop(1, "rgba(0,0,0,0)")
    ctx.fillStyle = glow
    ctx.fillRect(x - 120, y - 120, 240, 240)
  }

  sprinkleDust(ctx, rand, palette, width, height, Math.round(70 + settings.texture * 110))
}

function drawHarmonicBloom(ctx: CanvasRenderingContext2D, drawContext: DrawContext) {
  const {seed, palette, settings, width, height} = drawContext
  const rand = mulberry32(seed * 17 + 19)
  drawBackdrop(ctx, drawContext)

  ctx.save()
  ctx.translate(width / 2, height / 2)

  const rings = Math.round(5 + settings.complexity * 4)
  for (let ring = 0; ring < rings; ring++) {
    const petals = 4 + ring + Math.round(settings.symmetry * 8)
    const radius = 24 + ring * 24
    const wobble = 6 + settings.energy * 18

    ctx.beginPath()
    for (let step = 0; step <= 360; step++) {
      const angle = (step / 360) * Math.PI * 2
      const rose = Math.cos(angle * petals) * (radius * 0.42 + wobble)
      const contour = radius + rose + Math.sin(angle * (ring + 2)) * wobble * 0.4
      const x = Math.cos(angle) * contour
      const y = Math.sin(angle) * contour
      if (step === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.strokeStyle = withAlpha(palette.colors[ring % palette.colors.length], 0.7)
    ctx.lineWidth = 1 + settings.texture * 1.4
    ctx.stroke()
  }

  for (let orbit = 0; orbit < 180 + settings.density * 180; orbit++) {
    const angle = rand() * Math.PI * 2
    const orbitRadius = 26 + rand() * (Math.min(width, height) * 0.34)
    const nodeX = Math.cos(angle) * orbitRadius
    const nodeY = Math.sin(angle) * orbitRadius
    const nodeSize = 0.8 + rand() * (2.3 + settings.energy)
    ctx.beginPath()
    ctx.arc(nodeX, nodeY, nodeSize, 0, Math.PI * 2)
    ctx.fillStyle = withAlpha(palette.colors[orbit % palette.colors.length], 0.24 + rand() * 0.46)
    ctx.fill()
  }

  for (let band = 0; band < 5; band++) {
    const arcRadius = 70 + band * 24
    ctx.beginPath()
    for (let step = 0; step <= 180; step++) {
      const angle = (step / 180) * Math.PI * 2
      const x = Math.cos(angle) * arcRadius
      const y = Math.sin(angle) * (arcRadius * (0.45 + settings.symmetry * 0.55))
      if (step === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.strokeStyle = withAlpha(palette.ink, 0.08 + band * 0.03)
    ctx.lineWidth = 0.8
    ctx.stroke()
  }

  ctx.restore()
  sprinkleDust(ctx, rand, palette, width, height, Math.round(50 + settings.texture * 70))
}

function drawTopographicDrift(ctx: CanvasRenderingContext2D, drawContext: DrawContext) {
  const {seed, palette, settings, width, height} = drawContext
  const rand = mulberry32(seed * 23 + 3)
  drawBackdrop(ctx, drawContext)

  const layers = Math.round(26 + settings.density * 24)
  for (let layer = 0; layer < layers; layer++) {
    const baseline = (layer / (layers - 1)) * height
    const fillPath = new Path2D()
    fillPath.moveTo(0, height)

    ctx.beginPath()
    for (let x = 0; x <= width; x += 6) {
      const nx = x / (140 - settings.complexity * 50)
      const drift = fbm(nx, layer * 0.11, seed + 240, 5) * (38 + settings.energy * 42)
      const micro = fbm(x / 30, layer * 0.5, seed + 580, 3) * 12
      const y = baseline + drift - micro - height * 0.08
      if (x === 0) {
        ctx.moveTo(x, y)
        fillPath.lineTo(x, y)
      } else {
        ctx.lineTo(x, y)
        fillPath.lineTo(x, y)
      }
    }
    fillPath.lineTo(width, height)
    fillPath.closePath()

    ctx.strokeStyle = withAlpha(palette.colors[layer % palette.colors.length], 0.28 + (layer / layers) * 0.3)
    ctx.lineWidth = 1.1
    ctx.stroke()

    ctx.fillStyle = withAlpha(mixHex(palette.colors[layer % palette.colors.length], palette.background[1], 0.55), 0.03 + layer / layers / 8)
    ctx.fill(fillPath)
  }

  for (let ridge = 0; ridge < 10; ridge++) {
    ctx.beginPath()
    for (let x = 0; x <= width; x += 8) {
      const y = height * 0.22 + ridge * 18 + fbm(x / 90, ridge * 0.4, seed + 810, 4) * 20
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.strokeStyle = withAlpha(palette.ink, 0.04 + ridge * 0.01)
    ctx.lineWidth = 0.8
    ctx.stroke()
  }

  sprinkleDust(ctx, rand, palette, width, height, Math.round(90 + settings.texture * 90))
}

function drawMoireLoom(ctx: CanvasRenderingContext2D, drawContext: DrawContext) {
  const {seed, palette, settings, width, height} = drawContext
  const rand = mulberry32(seed * 29 + 31)
  drawBackdrop(ctx, drawContext)

  const families = 3 + Math.round(settings.complexity * 2)
  for (let family = 0; family < families; family++) {
    const color = palette.colors[family % palette.colors.length]
    const spacing = 6 + family * 3 + (1 - settings.density) * 4
    const rotation = family * 0.55 + settings.symmetry * 0.4
    ctx.save()
    ctx.translate(width / 2, height / 2)
    ctx.rotate(rotation)
    ctx.translate(-width / 2, -height / 2)

    for (let line = -height; line < height * 2; line += spacing) {
      ctx.beginPath()
      for (let x = -40; x <= width + 40; x += 10) {
        const wave = Math.sin(x * 0.018 * (family + 1) + seed * 0.03 + line * 0.02) * (10 + settings.energy * 24)
        const ripple = fbm(x / 45, line / 80, seed + family * 40, 4) * 18
        const y = line + wave + ripple - 8
        if (x === -40) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = withAlpha(color, 0.16 + family * 0.05)
      ctx.lineWidth = 0.8 + family * 0.15
      ctx.stroke()
    }
    ctx.restore()
  }

  for (let disk = 0; disk < 5; disk++) {
    const x = width * (0.18 + disk * 0.16)
    const y = height * (0.2 + (disk % 2) * 0.34)
    ctx.beginPath()
    ctx.arc(x, y, 22 + disk * 10, 0, Math.PI * 2)
    ctx.strokeStyle = withAlpha(palette.ink, 0.16)
    ctx.lineWidth = 1.2
    ctx.stroke()
  }

  sprinkleDust(ctx, rand, palette, width, height, Math.round(30 + settings.texture * 60))
}

function branchCanopy(ctx: CanvasRenderingContext2D, rand: () => number, drawContext: DrawContext, x: number, y: number, angle: number, length: number, depth: number) {
  const {palette, settings} = drawContext
  if (depth <= 0 || length < 4) return

  const bend = (rand() - 0.5) * (0.25 + settings.energy * 0.5)
  const x2 = x + Math.cos(angle + bend) * length
  const y2 = y + Math.sin(angle + bend) * length

  ctx.strokeStyle = withAlpha(palette.colors[depth % palette.colors.length], 0.42 + depth * 0.05)
  ctx.lineWidth = Math.max(0.8, depth * 0.92)
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x2, y2)
  ctx.stroke()

  if (depth < 4) {
    ctx.beginPath()
    ctx.arc(x2, y2, 1.4 + rand() * (2.4 + settings.energy * 1.8), 0, Math.PI * 2)
    ctx.fillStyle = withAlpha(palette.colors[(depth + 2) % palette.colors.length], 0.36 + rand() * 0.34)
    ctx.fill()
  }

  const branches = 2 + Math.round(settings.symmetry * 2) + (rand() > 0.65 ? 1 : 0)
  for (let branchIndex = 0; branchIndex < branches; branchIndex++) {
    branchCanopy(ctx, rand, drawContext, x2, y2, angle - 0.8 + (branchIndex / Math.max(1, branches - 1)) * 1.6 + (rand() - 0.5) * 0.3, length * (0.67 + rand() * 0.11), depth - 1)
  }
}

function drawFractalCanopy(ctx: CanvasRenderingContext2D, drawContext: DrawContext) {
  const {seed, palette, settings, width, height} = drawContext
  const rand = mulberry32(seed * 37 + 5)
  drawBackdrop(ctx, drawContext)

  const haze = ctx.createLinearGradient(0, height, 0, height * 0.3)
  haze.addColorStop(0, withAlpha(palette.colors[1], 0.22))
  haze.addColorStop(1, "rgba(0,0,0,0)")
  ctx.fillStyle = haze
  ctx.fillRect(0, 0, width, height)

  const trunkCount = 3 + Math.round(settings.density * 4)
  for (let trunk = 0; trunk < trunkCount; trunk++) {
    const startX = width * (0.12 + (trunk / Math.max(1, trunkCount - 1)) * 0.76) + (rand() - 0.5) * 24
    branchCanopy(ctx, rand, drawContext, startX, height + 10, -Math.PI / 2 + (rand() - 0.5) * 0.2, 58 + rand() * 26, Math.round(6 + settings.complexity * 3))
  }

  for (let spore = 0; spore < 80 + settings.density * 120; spore++) {
    const x = rand() * width
    const y = rand() * height * 0.78
    const glow = ctx.createRadialGradient(x, y, 0, x, y, 8 + rand() * 20)
    glow.addColorStop(0, withAlpha(palette.colors[spore % palette.colors.length], 0.18 + rand() * 0.24))
    glow.addColorStop(1, "rgba(0,0,0,0)")
    ctx.fillStyle = glow
    ctx.fillRect(x - 24, y - 24, 48, 48)
  }

  sprinkleDust(ctx, rand, palette, width, height, Math.round(120 + settings.texture * 120))
}

function drawCrystalMesh(ctx: CanvasRenderingContext2D, drawContext: DrawContext) {
  const {seed, palette, settings, width, height} = drawContext
  const rand = mulberry32(seed * 41 + 11)
  drawBackdrop(ctx, drawContext)

  const columns = Math.round(8 + settings.density * 8)
  const rows = Math.round(5 + settings.density * 5)
  const points: Array<{x: number; y: number; color: string}> = []

  for (let row = 0; row <= rows; row++) {
    for (let column = 0; column <= columns; column++) {
      const x = (column / columns) * width + (rand() - 0.5) * 24
      const y = (row / rows) * height + (rand() - 0.5) * 24
      points.push({x, y, color: palette.colors[(row + column) % palette.colors.length]})
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const topLeft = points[row * (columns + 1) + column]
      const topRight = points[row * (columns + 1) + column + 1]
      const bottomLeft = points[(row + 1) * (columns + 1) + column]
      const bottomRight = points[(row + 1) * (columns + 1) + column + 1]
      const diagonal = rand() > 0.5

      ctx.beginPath()
      ctx.moveTo(topLeft.x, topLeft.y)
      ctx.lineTo(topRight.x, topRight.y)
      ctx.lineTo(diagonal ? bottomLeft.x : bottomRight.x, diagonal ? bottomLeft.y : bottomRight.y)
      ctx.closePath()
      ctx.fillStyle = withAlpha(topLeft.color, 0.08 + rand() * 0.14)
      ctx.fill()
      ctx.strokeStyle = withAlpha(palette.ink, 0.08)
      ctx.lineWidth = 0.8
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(bottomLeft.x, bottomLeft.y)
      ctx.lineTo(topRight.x, topRight.y)
      ctx.lineTo(bottomRight.x, bottomRight.y)
      ctx.closePath()
      ctx.fillStyle = withAlpha(bottomRight.color, 0.08 + rand() * 0.14)
      ctx.fill()
      ctx.stroke()
    }
  }

  for (const point of points) {
    ctx.beginPath()
    ctx.arc(point.x, point.y, 1.5 + rand() * 2.3, 0, Math.PI * 2)
    ctx.fillStyle = withAlpha(point.color, 0.4)
    ctx.fill()
  }

  for (let orbit = 0; orbit < 4; orbit++) {
    ctx.beginPath()
    ctx.ellipse(width / 2, height / 2, 70 + orbit * 40, 28 + orbit * 18, orbit * 0.35, 0, Math.PI * 2)
    ctx.strokeStyle = withAlpha(palette.colors[orbit % palette.colors.length], 0.18)
    ctx.lineWidth = 1.2
    ctx.stroke()
  }

  sprinkleDust(ctx, rand, palette, width, height, Math.round(40 + settings.texture * 70))
}

const renderers: Record<ArtMode, (ctx: CanvasRenderingContext2D, drawContext: DrawContext) => void> = {
  "Flow Field": drawFlowField,
  "Harmonic Bloom": drawHarmonicBloom,
  "Topographic Drift": drawTopographicDrift,
  "Moire Loom": drawMoireLoom,
  "Fractal Canopy": drawFractalCanopy,
  "Crystal Mesh": drawCrystalMesh,
}

function RangeControl({label, value, min, max, step, onChange}: {label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-4 text-sm text-white/75 light:text-black/75">
        <span>{label}</span>
        <span>{Math.round(value * 100)}%</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="ui-range mt-3 w-full" />
    </label>
  )
}

export default function Page() {
  const [seed, setSeed] = useState(1824)
  const [paletteIndex, setPaletteIndex] = useState(0)
  const [settings, setSettings] = useState<GeneratorSettings>({
    complexity: 0.76,
    density: 0.64,
    energy: 0.58,
    symmetry: 0.44,
    texture: 0.62,
  })
  const canvases = useRef<Record<ArtMode, HTMLCanvasElement | null>>({
    "Flow Field": null,
    "Harmonic Bloom": null,
    "Topographic Drift": null,
    "Moire Loom": null,
    "Fractal Canopy": null,
    "Crystal Mesh": null,
  })

  useEffect(() => {
    const palette = palettes[paletteIndex]
    const drawContext: DrawContext = {
      seed,
      palette,
      settings,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    }

    for (const {mode} of artModes) {
      const canvas = canvases.current[mode]
      if (!canvas) continue
      const ctx = fitCanvas(canvas)
      if (!ctx) continue
      renderers[mode](ctx, drawContext)
    }
  }, [paletteIndex, seed, settings])

  function updateSetting(key: keyof GeneratorSettings, value: number) {
    setSettings((current) => ({...current, [key]: value}))
  }

  function generate() {
    setSeed((current) => current + Math.floor(Math.random() * 1201 + 37))
  }

  function randomizeStructure() {
    const rand = mulberry32(seed + 404)
    setSeed((current) => current + Math.floor(rand() * 1400 + 51))
    setSettings({
      complexity: clamp(0.35 + rand() * 0.65, 0, 1),
      density: clamp(0.3 + rand() * 0.7, 0, 1),
      energy: clamp(0.25 + rand() * 0.75, 0, 1),
      symmetry: clamp(rand(), 0, 1),
      texture: clamp(0.3 + rand() * 0.7, 0, 1),
    })
  }

  const activePalette = palettes[paletteIndex]

  return (
    <main className="min-h-screen max-w-6xl mx-auto md:px-0 px-6 pt-32 pb-16">
      <div className="max-w-4xl">
        <div className="text-sm uppercase tracking-[0.24em] text-white/45 light:text-black/45">Generative Lab</div>
        <h1 className="mt-4 text-6xl font-clash font-semibold leading-tight">Procedural Art Generator</h1>
        <p className="mt-4 text-white/70 light:text-black/70 font-light max-w-3xl text-lg">Rebuilt around richer systems instead of quick palette swaps: flow fields, moire interference, contour maps, harmonic blooms, recursive canopies, and faceted mesh studies.</p>
      </div>

      <section className="mt-10 grid xl:grid-cols-[1.35fr_0.95fr] gap-6">
        <article className="rounded-3xl bg-woodsmoke-light shadow-(--inset_shadow) p-6 light:bg-athensgray-light border border-white/10 light:border-black/10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="text-sm uppercase tracking-[0.24em] text-white/45 light:text-black/45">Current seed</div>
              <div className="text-4xl font-clash mt-2">#{seed}</div>
              <p className="mt-3 text-sm text-white/65 light:text-black/65 max-w-xl">`Generate` now keeps your palette locked and only spins a new variation through the same visual language.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="w-44 h-12" onClick={generate}>
                <HoverButton text1="Generate" text2="New variation" />
              </button>
              <button
                type="button"
                onClick={randomizeStructure}
                className="h-12 px-5 rounded-full border border-white/10 light:border-black/10 text-sm font-medium text-white/85 light:text-black/85 bg-white/5 light:bg-black/5 hover:bg-white/10 light:hover:bg-black/8 transition-colors">
                Randomize structure
              </button>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="rounded-2xl border border-white/10 light:border-black/10 bg-black/15 light:bg-white/45 p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-white/45 light:text-black/45">Palette</div>
              <div className="mt-2 text-xl font-clash">{activePalette.name}</div>
              <div className="mt-2 text-sm text-white/65 light:text-black/65">{activePalette.mood}</div>
            </div>
            <div className="rounded-2xl border border-white/10 light:border-black/10 bg-black/15 light:bg-white/45 p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-white/45 light:text-black/45">Systems</div>
              <div className="mt-2 text-xl font-clash">6</div>
              <div className="mt-2 text-sm text-white/65 light:text-black/65">Each panel is rendered from a different algorithmic family.</div>
            </div>
            <div className="rounded-2xl border border-white/10 light:border-black/10 bg-black/15 light:bg-white/45 p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-white/45 light:text-black/45">Complexity</div>
              <div className="mt-2 text-xl font-clash">{Math.round(settings.complexity * 100)}%</div>
              <div className="mt-2 text-sm text-white/65 light:text-black/65">Controls layering, path depth, and contour count.</div>
            </div>
            <div className="rounded-2xl border border-white/10 light:border-black/10 bg-black/15 light:bg-white/45 p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-white/45 light:text-black/45">Energy</div>
              <div className="mt-2 text-xl font-clash">{Math.round(settings.energy * 100)}%</div>
              <div className="mt-2 text-sm text-white/65 light:text-black/65">Pushes motion, interference, and bloom intensity.</div>
            </div>
            <div className="rounded-2xl border border-white/10 light:border-black/10 bg-black/15 light:bg-white/45 p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-white/45 light:text-black/45">Texture</div>
              <div className="mt-2 text-xl font-clash">{Math.round(settings.texture * 100)}%</div>
              <div className="mt-2 text-sm text-white/65 light:text-black/65">Adds grain, atmosphere, and paper-like surface detail.</div>
            </div>
          </div>
        </article>

        <article className="rounded-3xl bg-woodsmoke-light shadow-(--inset_shadow) p-6 light:bg-athensgray-light border border-white/10 light:border-black/10">
          <div className="text-sm uppercase tracking-[0.24em] text-white/45 light:text-black/45">Tuning</div>
          <div className="mt-5 space-y-5">
            <RangeControl label="Complexity" value={settings.complexity} min={0} max={1} step={0.01} onChange={(value) => updateSetting("complexity", value)} />
            <RangeControl label="Density" value={settings.density} min={0} max={1} step={0.01} onChange={(value) => updateSetting("density", value)} />
            <RangeControl label="Energy" value={settings.energy} min={0} max={1} step={0.01} onChange={(value) => updateSetting("energy", value)} />
            <RangeControl label="Symmetry" value={settings.symmetry} min={0} max={1} step={0.01} onChange={(value) => updateSetting("symmetry", value)} />
            <RangeControl label="Texture" value={settings.texture} min={0} max={1} step={0.01} onChange={(value) => updateSetting("texture", value)} />
          </div>
        </article>
      </section>

      <section className="mt-8 rounded-3xl bg-woodsmoke-light shadow-(--inset_shadow) p-6 light:bg-athensgray-light border border-white/10 light:border-black/10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="text-sm uppercase tracking-[0.24em] text-white/45 light:text-black/45">Palette library</div>
            <p className="mt-2 text-sm text-white/65 light:text-black/65 max-w-2xl">Choose the exact color language yourself. No more automatic palette jump when generating a new piece.</p>
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {palettes.map((palette, index) => (
            <button
              key={palette.name}
              type="button"
              onClick={() => setPaletteIndex(index)}
              className={`text-left rounded-2xl border p-4 transition-transform hover:-translate-y-0.5 ${index === paletteIndex ? "border-white/60 light:border-black/55 bg-white/8 light:bg-black/7" : "border-white/10 light:border-black/10 bg-black/15 light:bg-white/45"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-clash">{palette.name}</div>
                  <div className="mt-2 text-sm text-white/65 light:text-black/65">{palette.mood}</div>
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-white/45 light:text-black/45">{index === paletteIndex ? "Active" : "Select"}</div>
              </div>
              <div className="mt-4 flex gap-2">
                {palette.colors.map((color) => (
                  <span key={color} className="block h-9 flex-1 rounded-xl border border-white/10 light:border-black/10" style={{backgroundColor: color}} />
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {artModes.map(({mode, description}) => (
          <article key={mode} className="rounded-3xl bg-woodsmoke-light shadow-(--inset_shadow) p-4 light:bg-athensgray-light border border-white/10 light:border-black/10">
            <div className="rounded-2xl overflow-hidden border border-white/10 light:border-black/10 bg-black/20 light:bg-white/50">
              <canvas
                ref={(element) => {
                  canvases.current[mode] = element
                }}
                className="w-full h-auto max-w-full"
              />
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-clash font-medium">{mode}</h2>
              <p className="mt-2 text-sm text-white/70 light:text-black/70">{description}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
