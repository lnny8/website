"use client"

import HoverButton from "@/lib/components/hoverButton"
import React, {useEffect, useMemo, useRef, useState} from "react"

type ClimatePreset = "temperate" | "arid" | "frozen" | "lush"

type WorldConfig = {
  seed: number
  ruggedness: number
  waterLevel: number
  mountainLevel: number
  islandBias: number
  noiseScale: number
  temperature: number
  moisture: number
  riverCount: number
  riverLength: number
  cityDensity: number
  climatePreset: ClimatePreset
}

type WorldStats = {
  seed: number
  mountains: number
  rivers: number
  cities: number
  coastline: number
  landTiles: number
  forests: number
  deserts: number
  snowTiles: number
}

type RiverPath = {points: Array<{x: number; y: number}>}

const DEFAULT_CONFIG: WorldConfig = {
  seed: 704,
  ruggedness: 0.58,
  waterLevel: 0.36,
  mountainLevel: 0.72,
  islandBias: 0.74,
  noiseScale: 28,
  temperature: 0.56,
  moisture: 0.52,
  riverCount: 4,
  riverLength: 120,
  cityDensity: 0.62,
  climatePreset: "temperate",
}

const PRESETS: Array<{title: string; description: string; values: Partial<WorldConfig>}> = [
  {title: "Archipelago", description: "More water and separated landmasses", values: {waterLevel: 0.42, islandBias: 0.9, riverCount: 3, cityDensity: 0.48, climatePreset: "temperate"}},
  {title: "Highlands", description: "Sharper relief with colder mountains", values: {ruggedness: 0.78, mountainLevel: 0.67, waterLevel: 0.34, riverCount: 6, riverLength: 145, temperature: 0.44, climatePreset: "frozen"}},
  {title: "Drylands", description: "Hot interior with sparse rivers", values: {temperature: 0.78, moisture: 0.24, waterLevel: 0.33, riverCount: 2, cityDensity: 0.54, climatePreset: "arid"}},
  {title: "Verdant", description: "Wet land with dense forests and rivers", values: {moisture: 0.78, temperature: 0.62, riverCount: 7, riverLength: 150, cityDensity: 0.75, climatePreset: "lush"}},
]

function fract(value: number) {
  return value - Math.floor(value)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function hash(x: number, y: number, seed: number) {
  return fract(Math.sin(x * 127.1 + y * 311.7 + seed * 17.17) * 43758.5453123)
}

function noise(x: number, y: number, seed: number) {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const fx = x - ix
  const fy = y - iy
  const sx = fx * fx * (3 - 2 * fx)
  const sy = fy * fy * (3 - 2 * fy)

  const a = hash(ix, iy, seed)
  const b = hash(ix + 1, iy, seed)
  const c = hash(ix, iy + 1, seed)
  const d = hash(ix + 1, iy + 1, seed)
  const ab = a * (1 - sx) + b * sx
  const cd = c * (1 - sx) + d * sx
  return ab * (1 - sy) + cd * sy
}

function layeredNoise(x: number, y: number, seed: number) {
  return noise(x, y, seed) * 0.6 + noise(x * 2.1, y * 2.1, seed + 9) * 0.25 + noise(x * 4.3, y * 4.3, seed + 23) * 0.15
}

function getClimatePalette(preset: ClimatePreset) {
  switch (preset) {
    case "arid":
      return {deepWater: "#15304d", shallowWater: "#285984", beach: "#d6bc7c", plains: "#8c8c52", forest: "#6b7b3d", desert: "#d8b26a", mountain: "#8f8268", snow: "#f1e8d4"}
    case "frozen":
      return {deepWater: "#14314a", shallowWater: "#4c83a8", beach: "#c7d3d8", plains: "#8aa0a3", forest: "#597170", desert: "#cfd9dc", mountain: "#8e959a", snow: "#f7fbff"}
    case "lush":
      return {deepWater: "#16355d", shallowWater: "#3b7fb4", beach: "#e5d99e", plains: "#74aa6a", forest: "#3e7743", desert: "#ccb870", mountain: "#7e9675", snow: "#eff5e8"}
    default:
      return {deepWater: "#18355f", shallowWater: "#3773a4", beach: "#e0d3a0", plains: "#9bb777", forest: "#4e7f52", desert: "#cdb16b", mountain: "#7ea66b", snow: "#ddd7cd"}
  }
}

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [config, setConfig] = useState<WorldConfig>(DEFAULT_CONFIG)
  const [stats, setStats] = useState<WorldStats>({seed: DEFAULT_CONFIG.seed, mountains: 0, rivers: 0, cities: 0, coastline: 0, landTiles: 0, forests: 0, deserts: 0, snowTiles: 0})

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const ratio = window.devicePixelRatio || 1
    const width = 860
    const height = 520
    canvas.width = width * ratio
    canvas.height = height * ratio
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)

    const cols = 172
    const rows = 104
    const cellWidth = width / cols
    const cellHeight = height / rows
    const heights: number[][] = Array.from({length: cols}, () => Array(rows).fill(0))
    const temperatures: number[][] = Array.from({length: cols}, () => Array(rows).fill(0))
    const moistureMap: number[][] = Array.from({length: cols}, () => Array(rows).fill(0))
    const palette = getClimatePalette(config.climatePreset)

    let mountains = 0
    let coastline = 0
    let landTiles = 0
    let forests = 0
    let deserts = 0
    let snowTiles = 0

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const nx = x / cols - 0.5
        const ny = y / rows - 0.5
        const distance = Math.hypot(nx * 1.2, ny)
        const falloff = Math.max(0, 1 - distance * (1.15 + config.islandBias))
        const elevationNoise = layeredNoise(x / config.noiseScale, y / config.noiseScale, config.seed)
        const ridgeNoise = noise(x / (config.noiseScale * 0.45), y / (config.noiseScale * 0.45), config.seed + 81)
        const elevation = clamp(elevationNoise * config.ruggedness + falloff * (1 - config.ruggedness * 0.32) + ridgeNoise * 0.16 * config.ruggedness, 0, 1)
        const latitude = 1 - Math.abs(y / rows - 0.5) * 2
        const tempNoise = layeredNoise(x / (config.noiseScale * 0.9), y / (config.noiseScale * 0.9), config.seed + 201)
        const wetNoise = layeredNoise(x / (config.noiseScale * 0.8), y / (config.noiseScale * 0.8), config.seed + 401)
        const temperature = clamp(config.temperature * 0.7 + latitude * 0.25 + tempNoise * 0.2 - elevation * 0.18, 0, 1)
        const wetness = clamp(config.moisture * 0.62 + wetNoise * 0.45 - elevation * 0.08, 0, 1)
        heights[x][y] = elevation
        temperatures[x][y] = temperature
        moistureMap[x][y] = wetness
      }
    }

    ctx.clearRect(0, 0, width, height)
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const elevation = heights[x][y]
        const temperature = temperatures[x][y]
        const wetness = moistureMap[x][y]
        const isLand = elevation > config.waterLevel
        const hasWater = isLand && hasWaterNeighbor(heights, x, y, config.waterLevel)
        let color = palette.deepWater

        if (elevation <= config.waterLevel - 0.06) color = palette.deepWater
        else if (elevation <= config.waterLevel) color = palette.shallowWater
        else if (hasWater && elevation <= config.waterLevel + 0.025) color = palette.beach
        else if (elevation > config.mountainLevel + 0.08 || (elevation > config.mountainLevel && temperature < 0.38)) {
          color = palette.snow
          snowTiles++
          mountains++
        } else if (elevation > config.mountainLevel) {
          color = palette.mountain
          mountains++
        } else if (temperature > 0.68 && wetness < 0.34) {
          color = palette.desert
          deserts++
        } else if (wetness > 0.64) {
          color = palette.forest
          forests++
        } else {
          color = palette.plains
        }

        if (isLand) {
          landTiles++
          if (hasWater) coastline++
        }

        ctx.fillStyle = color
        ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth + 1, cellHeight + 1)
      }
    }

    const rivers = createRivers(heights, config, cellWidth, cellHeight, ctx)
    const cities = pickCities(heights, temperatures, moistureMap, config, rivers)
    for (const city of cities) {
      ctx.fillStyle = "#f772c2"
      ctx.beginPath()
      ctx.arc((city.x + 0.5) * cellWidth, (city.y + 0.5) * cellHeight, 4.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "rgba(255,255,255,0.26)"
      ctx.lineWidth = 1
      ctx.stroke()
    }

    drawFrame(ctx, width, height)
    setStats({seed: config.seed, mountains, rivers: rivers.length, cities: cities.length, coastline, landTiles, forests, deserts, snowTiles})
  }, [config])

  const descriptors = useMemo(
    () => [
      {label: "Land tiles", value: stats.landTiles.toLocaleString()},
      {label: "Coastline", value: stats.coastline.toLocaleString()},
      {label: "Mountains", value: stats.mountains.toLocaleString()},
      {label: "Rivers", value: stats.rivers.toString()},
      {label: "Cities", value: stats.cities.toString()},
      {label: "Forests", value: stats.forests.toLocaleString()},
      {label: "Deserts", value: stats.deserts.toLocaleString()},
      {label: "Snow", value: stats.snowTiles.toLocaleString()},
    ],
    [stats],
  )

  function updateConfig<K extends keyof WorldConfig>(key: K, value: WorldConfig[K]) {
    setConfig((prev) => ({...prev, [key]: value}))
  }

  function randomizeSeed() {
    updateConfig("seed", config.seed + Math.floor(Math.random() * 1234 + 17))
  }

  function resetConfig() {
    setConfig(DEFAULT_CONFIG)
  }

  function applyPreset(values: Partial<WorldConfig>) {
    setConfig((prev) => ({...prev, ...values, seed: prev.seed + Math.floor(Math.random() * 301 + 19)}))
  }

  return (
    <main className="min-h-screen max-w-6xl mx-auto md:px-0 px-6 pt-32 pb-16">
      <h1 className="text-6xl font-clash font-semibold leading-tight">Procedural World Generator</h1>
      <p className="mt-3 text-white/70 light:text-black/70 font-light max-w-3xl text-lg">Generate compact fantasy maps with adjustable terrain, coastlines, climate, rivers, and settlement density from a seeded height field.</p>

      <section className="mt-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-start">
        <div className="space-y-6">
          <div className="rounded-3xl bg-woodsmoke-light shadow-(--inset_shadow) p-4 light:bg-athensgray-light border border-white/10 light:border-black/10">
            <div className="rounded-2xl overflow-hidden border border-white/10 light:border-black/10 bg-black/20 light:bg-white/50">
              <canvas ref={canvasRef} className="w-full h-auto max-w-full" />
            </div>
          </div>

          <section className="rounded-3xl bg-woodsmoke-light shadow-(--inset_shadow) p-6 light:bg-athensgray-light border border-white/10 light:border-black/10">
            <div className="text-sm uppercase tracking-[0.24em] text-white/45 light:text-black/45">Generated features</div>
            <div className="mt-4 grid gap-4 grid-cols-2">
              {descriptors.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 light:border-black/10 p-4">
                  <div className="text-white/50 light:text-black/50 uppercase text-xs tracking-[0.18em]">{item.label}</div>
                  <div className="mt-2 text-2xl font-clash">{item.value}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-white/60 light:text-black/60">Water level, island bias and noise scale change the continent shape. Temperature and moisture drive biomes. River count, length and city density shape the inhabited world.</p>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl bg-woodsmoke-light shadow-(--inset_shadow) p-6 light:bg-athensgray-light border border-white/10 light:border-black/10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-white/45 light:text-black/45">World controls</div>
                <div className="mt-3 text-3xl font-clash">Seed #{stats.seed}</div>
              </div>
              <button className="w-42 h-12" onClick={randomizeSeed}>
                <HoverButton text1="Generate world" text2="New seed" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {PRESETS.map((preset) => (
                <button key={preset.title} type="button" onClick={() => applyPreset(preset.values)} className="rounded-2xl border border-white/10 light:border-black/10 px-4 py-4 text-left hover:bg-white/6 light:hover:bg-black/6 transition-colors">
                  <div className="font-medium">{preset.title}</div>
                  <div className="text-sm text-white/60 light:text-black/60 mt-1">{preset.description}</div>
                </button>
              ))}
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              <button className="w-full h-12" onClick={resetConfig}>
                <HoverButton text1="Reset world" text2="Baseline" />
              </button>
              <label className="rounded-2xl border border-white/10 light:border-black/10 px-4 py-3 text-sm">
                Seed value
                <input type="number" value={config.seed} onChange={(event) => updateConfig("seed", Number(event.target.value) || 0)} className="mt-2 w-full bg-transparent outline-none" />
              </label>
            </div>
          </section>

          <ControlCard title="Terrain">
            <RangeControl label="Ruggedness" value={config.ruggedness} min={0.3} max={0.9} step={0.01} onChange={(value) => updateConfig("ruggedness", value)} />
            <RangeControl label="Water level" value={config.waterLevel} min={0.22} max={0.5} step={0.01} onChange={(value) => updateConfig("waterLevel", value)} />
            <RangeControl label="Mountain line" value={config.mountainLevel} min={0.58} max={0.82} step={0.01} onChange={(value) => updateConfig("mountainLevel", value)} />
            <RangeControl label="Island bias" value={config.islandBias} min={0.3} max={1.05} step={0.01} onChange={(value) => updateConfig("islandBias", value)} />
            <RangeControl label="Noise scale" value={config.noiseScale} min={18} max={42} step={1} onChange={(value) => updateConfig("noiseScale", value)} />
          </ControlCard>

          <ControlCard title="Climate">
            <RangeControl label="Temperature" value={config.temperature} min={0.15} max={0.85} step={0.01} onChange={(value) => updateConfig("temperature", value)} />
            <RangeControl label="Moisture" value={config.moisture} min={0.15} max={0.85} step={0.01} onChange={(value) => updateConfig("moisture", value)} />
            <div>
              <div className="text-sm">Palette</div>
              <select
                value={config.climatePreset}
                onChange={(event) => updateConfig("climatePreset", event.target.value as ClimatePreset)}
                className="mt-2 w-full rounded-xl bg-woodsmoke-light shadow-(--inset_shadow) border border-white/10 light:border-black/10 light:bg-athensgray-light px-4 py-3 text-sm focus:outline-none focus:ring-2 ring-lime">
                <option value="temperate">Temperate</option>
                <option value="arid">Arid</option>
                <option value="frozen">Frozen</option>
                <option value="lush">Lush</option>
              </select>
            </div>
          </ControlCard>

          <ControlCard title="Civilization">
            <RangeControl label="River count" value={config.riverCount} min={1} max={10} step={1} onChange={(value) => updateConfig("riverCount", value)} />
            <RangeControl label="River length" value={config.riverLength} min={60} max={200} step={5} onChange={(value) => updateConfig("riverLength", value)} />
            <RangeControl label="City density" value={config.cityDensity} min={0.2} max={1} step={0.01} onChange={(value) => updateConfig("cityDensity", value)} />
          </ControlCard>
        </div>
      </section>
    </main>
  )
}

function ControlCard({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <section className="rounded-3xl bg-woodsmoke-light shadow-(--inset_shadow) p-6 light:bg-athensgray-light border border-white/10 light:border-black/10">
      <div className="text-sm uppercase tracking-[0.24em] text-white/45 light:text-black/45">{title}</div>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  )
}

function RangeControl({label, value, min, max, step, onChange}: {label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void}) {
  return (
    <label className="block text-sm">
      {label}: <span className="text-white/60 light:text-black/60">{step >= 1 ? value.toFixed(0) : value.toFixed(2)}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="ui-range mt-2 w-full cursor-pointer" />
    </label>
  )
}

function drawFrame(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.strokeStyle = "rgba(255,255,255,0.08)"
  ctx.lineWidth = 8
  ctx.strokeRect(0, 0, width, height)
}

function hasWaterNeighbor(heights: number[][], x: number, y: number, waterLevel: number) {
  const neighbors = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]
  return neighbors.some(([dx, dy]) => heights[x + dx]?.[y + dy] !== undefined && heights[x + dx][y + dy] <= waterLevel)
}

function isLocalPeak(heights: number[][], x: number, y: number) {
  const center = heights[x]?.[y]
  if (center === undefined) return false
  for (const [dx, dy] of [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ]) {
    if ((heights[x + dx]?.[y + dy] ?? 0) > center) return false
  }
  return true
}

function createRivers(heights: number[][], config: WorldConfig, cellWidth: number, cellHeight: number, ctx: CanvasRenderingContext2D) {
  const sources: Array<{x: number; y: number; score: number}> = []
  const cols = heights.length
  const rows = heights[0]?.length ?? 0

  for (let x = 2; x < cols - 2; x++) {
    for (let y = 2; y < rows - 2; y++) {
      const elevation = heights[x][y]
      if (elevation > config.mountainLevel - 0.03 && isLocalPeak(heights, x, y)) {
        const score = elevation + hash(x, y, config.seed + 77) * 0.08
        sources.push({x, y, score})
      }
    }
  }

  sources.sort((first, second) => second.score - first.score)
  const rivers: RiverPath[] = []
  const taken = new Set<string>()

  for (const source of sources) {
    if (rivers.length >= config.riverCount) break
    if (taken.has(`${source.x},${source.y}`)) continue
    const river = traceRiver(ctx, heights, source.x, source.y, config.waterLevel, config.riverLength, cellWidth, cellHeight)
    if (river.points.length > 14) {
      rivers.push(river)
      for (const point of river.points.slice(0, 18)) taken.add(`${point.x},${point.y}`)
    }
  }

  return rivers
}

function traceRiver(ctx: CanvasRenderingContext2D, heights: number[][], startX: number, startY: number, waterLevel: number, maxSteps: number, cellWidth: number, cellHeight: number) {
  let current = {x: startX, y: startY}
  const visited = new Set<string>()
  const points = [current]

  ctx.strokeStyle = "#7cc7ff"
  ctx.lineWidth = 2.2
  ctx.beginPath()
  ctx.moveTo((current.x + 0.5) * cellWidth, (current.y + 0.5) * cellHeight)

  for (let step = 0; step < maxSteps; step++) {
    const key = `${current.x},${current.y}`
    if (visited.has(key)) break
    visited.add(key)
    if (heights[current.x]?.[current.y] <= waterLevel) break

    let best = current
    let bestHeight = heights[current.x][current.y]
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
    ]) {
      const nextHeight = heights[current.x + dx]?.[current.y + dy]
      if (nextHeight !== undefined && nextHeight <= bestHeight) {
        bestHeight = nextHeight
        best = {x: current.x + dx, y: current.y + dy}
      }
    }

    if (best === current) break
    current = best
    points.push(current)
    ctx.lineTo((current.x + 0.5) * cellWidth, (current.y + 0.5) * cellHeight)
  }
  ctx.stroke()

  return {points}
}

function pickCities(heights: number[][], temperatures: number[][], moistureMap: number[][], config: WorldConfig, rivers: RiverPath[]) {
  const cities: Array<{x: number; y: number}> = []
  const cols = heights.length
  const rows = heights[0]?.length ?? 0
  const maxCities = Math.max(3, Math.round(3 + config.cityDensity * 8))

  for (let x = 4; x < cols - 4; x++) {
    for (let y = 4; y < rows - 4; y++) {
      const elevation = heights[x][y]
      if (elevation <= config.waterLevel + 0.01 || elevation >= config.mountainLevel - 0.06) continue
      const coastBonus = hasWaterNeighbor(heights, x, y, config.waterLevel)
      const riverBonus = rivers.some((river) => river.points.some((point) => Math.hypot(point.x - x, point.y - y) < 8))
      const mildClimate = temperatures[x][y] > 0.28 && temperatures[x][y] < 0.82
      const habitableWetness = moistureMap[x][y] > 0.18 && moistureMap[x][y] < 0.86
      const roll = hash(x, y, config.seed + 55)
      const threshold = 0.985 - config.cityDensity * 0.08 - (coastBonus ? 0.03 : 0) - (riverBonus ? 0.035 : 0)

      if (mildClimate && habitableWetness && (coastBonus || riverBonus) && roll > threshold) {
        const tooClose = cities.some((city) => Math.hypot(city.x - x, city.y - y) < 12)
        if (!tooClose) cities.push({x, y})
      }
    }
  }

  return cities.slice(0, maxCities)
}
