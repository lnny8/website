"use client"
import React, {useEffect, useRef} from "react"

// A lightweight, responsive Dino Run-like game using Canvas.
// Scales to any screen size while keeping consistent game physics.

type GameState = "ready" | "running" | "gameover"

const WORLD_WIDTH = 800
const WORLD_HEIGHT = 280

const GROUND_Y = 220 // world units (baseline where player runs)

// Player constants
const PLAYER_WIDTH = 44
const PLAYER_HEIGHT = 48
const PLAYER_X = 60
const GRAVITY = 2500 // u/s^2
const JUMP_VELOCITY = 900 // u/s

// Game difficulty/speed
const START_SPEED = 400 // u/s
const SPEED_INCREASE = 0.08 // u/s per second

// Obstacle (cactus) ranges
const CACTUS_MIN_GAP = 280
const CACTUS_MAX_GAP = 520
const CACTUS_MIN_WIDTH = 16
const CACTUS_MAX_WIDTH = 36
const CACTUS_MIN_HEIGHT = 36
const CACTUS_MAX_HEIGHT = 72

// Clouds for parallax
const CLOUD_SPD = 30
const CLOUD_COUNT = 5

interface Cactus {
  x: number
  y: number
  w: number
  h: number
}

interface Cloud {
  x: number
  y: number
  w: number
}

export default function Game() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Keep refs for mutable game state without causing re-renders
  const stateRef = useRef<{state: GameState; highScore: number}>({state: "ready", highScore: 0})
  const playerRef = useRef({x: PLAYER_X, y: GROUND_Y - PLAYER_HEIGHT, vy: 0, onGround: true})
  const speedRef = useRef(START_SPEED)
  const scoreRef = useRef(0)
  const cactiRef = useRef<Cactus[]>([])
  const cloudsRef = useRef<Cloud[]>([])
  const nextSpawnRef = useRef(0)
  const lastTimeRef = useRef<number | null>(null)
  const scaleRef = useRef({cssWidth: 0, cssHeight: 0, worldToPx: 1, dpr: 1})
  const runningRef = useRef(false)

  // Resize and DPR-aware canvas setup with world scaling
  const resize = () => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    // Target aspect ratio based on world size
    const targetAspect = WORLD_WIDTH / WORLD_HEIGHT
    const containerWidth = container.clientWidth

    // Compute height from width to preserve aspect. Use full container width for seamless integration.
    const rawHeight = Math.round(containerWidth / targetAspect)
    const cssWidth = containerWidth
    const cssHeight = rawHeight

    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1))
    const worldToPx = cssWidth / WORLD_WIDTH

    canvas.style.width = `${cssWidth}px`
    canvas.style.height = `${cssHeight}px`
    canvas.width = Math.floor(cssWidth * dpr)
    canvas.height = Math.floor(cssHeight * dpr)

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.setTransform(dpr * worldToPx, 0, 0, dpr * worldToPx, 0, 0) // Now draw in world units

    scaleRef.current = {cssWidth, cssHeight, worldToPx, dpr}
  }

  const resetGame = () => {
    stateRef.current.state = "ready"
    playerRef.current = {x: PLAYER_X, y: GROUND_Y - PLAYER_HEIGHT, vy: 0, onGround: true}
    speedRef.current = START_SPEED
    scoreRef.current = 0
    cactiRef.current = []
    nextSpawnRef.current = 0
    // Seed clouds
    cloudsRef.current = Array.from({length: CLOUD_COUNT}).map(() => ({
      x: Math.random() * WORLD_WIDTH,
      y: 20 + Math.random() * 100,
      w: 40 + Math.random() * 90,
    }))
  }

  const startGame = () => {
    if (stateRef.current.state === "running") return
    resetGame()
    stateRef.current.state = "running"
    runningRef.current = true
    lastTimeRef.current = null
    requestAnimationFrame(loop)
  }

  const endGame = () => {
    stateRef.current.state = "gameover"
    runningRef.current = false
    stateRef.current.highScore = Math.max(stateRef.current.highScore, Math.floor(scoreRef.current))
    draw() // Draw once to show gameover banner
  }

  const jump = () => {
    const player = playerRef.current
    if (!player.onGround) return
    player.vy = -JUMP_VELOCITY
    player.onGround = false
  }

  const spawnCactus = (minGap = CACTUS_MIN_GAP, maxGap = CACTUS_MAX_GAP) => {
    const w = randInt(CACTUS_MIN_WIDTH, CACTUS_MAX_WIDTH)
    const h = randInt(CACTUS_MIN_HEIGHT, CACTUS_MAX_HEIGHT)
    cactiRef.current.push({x: WORLD_WIDTH + 5, y: GROUND_Y - h, w, h})
    const gap = randInt(minGap, maxGap)
    nextSpawnRef.current = gap
  }

  const update = (dt: number) => {
    const state = stateRef.current.state
    if (state !== "running") return
    const player = playerRef.current

    // Increase speed and score
    speedRef.current += SPEED_INCREASE * dt
    scoreRef.current += (speedRef.current * dt) / 40 // score roughly linked to distance

    // Update player physics
    player.vy += GRAVITY * dt
    player.y += player.vy * dt
    if (player.y >= GROUND_Y - PLAYER_HEIGHT) {
      player.y = GROUND_Y - PLAYER_HEIGHT
      player.vy = 0
      player.onGround = true
    }

    // Spawn cacti
    const speed = speedRef.current
    if (nextSpawnRef.current <= 0) {
      spawnCactus()
    } else {
      nextSpawnRef.current -= speed * dt
    }

    // Move cacti and check collisions
    const newCacti: Cactus[] = []
    for (const c of cactiRef.current) {
      c.x -= speed * dt
      if (c.x + c.w > 0) newCacti.push(c)

      // AABB collision
      if (rectsOverlap(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT, c.x, c.y, c.w, c.h)) {
        endGame()
        return
      }
    }
    cactiRef.current = newCacti

    // Clouds move slowly
    for (const cl of cloudsRef.current) {
      cl.x -= CLOUD_SPD * dt
      if (cl.x + cl.w < 0) {
        cl.x = WORLD_WIDTH + Math.random() * 150
        cl.y = 20 + Math.random() * 100
        cl.w = 40 + Math.random() * 90
      }
    }
  }

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear in world units (transform already applied)
    ctx.save()
    ctx.setTransform(scaleRef.current.worldToPx * scaleRef.current.dpr, 0, 0, scaleRef.current.worldToPx * scaleRef.current.dpr, 0, 0)
    ctx.clearRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT)
    ctx.restore()

  // Background sky (match page background)
  ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT)

    // Clouds
    for (const cl of cloudsRef.current) {
      drawCloud(ctx, cl.x, cl.y, cl.w)
    }

    // Ground line
    drawGround(ctx)

    // Cacti
    ctx.fillStyle = "#36d399" // subtle green tint
    for (const c of cactiRef.current) {
      ctx.fillRect(c.x, c.y, c.w, c.h)
    }

    // Player
    drawPlayer(ctx, playerRef.current.x, playerRef.current.y)

    // UI: score and highscore
    drawHUD(ctx, Math.floor(scoreRef.current), stateRef.current.highScore)

    // State banners
    if (stateRef.current.state === "ready") drawBanner(ctx, "Tap/Space to start")
    if (stateRef.current.state === "gameover") drawBanner(ctx, "Game Over – Tap/Enter to retry")
  }

  const loop = (t: number) => {
    if (!runningRef.current) return
    const last = lastTimeRef.current
    lastTimeRef.current = t
    const dt = last ? Math.min(0.05, (t - last) / 1000) : 0 // clamp to avoid huge steps
    update(dt)
    draw()
    requestAnimationFrame(loop)
  }

  // Event handlers
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault()
        if (stateRef.current.state === "ready") startGame()
        else if (stateRef.current.state === "running") jump()
        else if (stateRef.current.state === "gameover") startGame()
      }
      if (e.code === "Enter" && stateRef.current.state === "gameover") startGame()
    }

    const onPointer = (ev: PointerEvent) => {
      // Start, jump or restart on tap/click inside canvas
      if (stateRef.current.state === "ready") startGame()
      else if (stateRef.current.state === "running") jump()
      else if (stateRef.current.state === "gameover") startGame()
    }

    const onVisibility = () => {
      if (document.visibilityState !== "visible") {
        // Soft pause when tab hidden
        runningRef.current = false
      } else if (stateRef.current.state === "running") {
        runningRef.current = true
        lastTimeRef.current = null
        requestAnimationFrame(loop)
      }
    }

    resetGame()

    // Initial size and draw
    resize()
    draw()

    window.addEventListener("resize", resize)
    window.addEventListener("keydown", onKeyDown, {passive: false})
    canvasRef.current?.addEventListener("pointerdown", onPointer)
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("keydown", onKeyDown)
      canvasRef.current?.removeEventListener("pointerdown", onPointer)
      document.removeEventListener("visibilitychange", onVisibility)
      runningRef.current = false
    }
  }, [])

  // Drawing helpers
  const drawPlayer = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Simple stylized dino using rectangles for performance
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(x, y, PLAYER_WIDTH, PLAYER_HEIGHT)
    // Eye
    ctx.fillStyle = "#0b0b0b"
    ctx.fillRect(x + PLAYER_WIDTH - 10, y + 10, 6, 6)
    // Leg accent
    ctx.fillStyle = "#10b981"
    ctx.fillRect(x + 6, y + PLAYER_HEIGHT - 8, PLAYER_WIDTH - 12, 6)
  }

  const drawGround = (ctx: CanvasRenderingContext2D) => {
    // Ground baseline
    ctx.strokeStyle = "#2a2a2a"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, GROUND_Y + 0.5)
    ctx.lineTo(WORLD_WIDTH, GROUND_Y + 0.5)
    ctx.stroke()

    // Dashes simulating motion using score as phase
    const phase = (scoreRef.current % 1000) / 1000
    ctx.strokeStyle = "#1f1f1f"
    ctx.lineWidth = 1
    ctx.setLineDash([8, 10])
    ctx.lineDashOffset = -phase * 200
    ctx.beginPath()
    ctx.moveTo(0, GROUND_Y + 10.5)
    ctx.lineTo(WORLD_WIDTH, GROUND_Y + 10.5)
    ctx.stroke()
    ctx.setLineDash([])
  }

  const drawCloud = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number) => {
    ctx.fillStyle = "#2f2f2f"
    const h = w * 0.5
    ctx.beginPath()
    roundedRectPath(ctx, x, y, w * 0.5, h * 0.6, 6)
    ctx.fill()
    ctx.beginPath()
    roundedRectPath(ctx, x + w * 0.3, y - h * 0.1, w * 0.5, h * 0.7, 8)
    ctx.fill()
  }

  const drawHUD = (ctx: CanvasRenderingContext2D, score: number, hi: number) => {
    ctx.fillStyle = "#e5e5e5"
    ctx.font = "16px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    ctx.textAlign = "right"
    ctx.fillText(`${score.toString().padStart(5, "0")}`, WORLD_WIDTH - 16, 28)
    ctx.fillStyle = "#9ca3af"
    ctx.fillText(`HI ${hi.toString().padStart(5, "0")}`, WORLD_WIDTH - 16, 48)
    ctx.textAlign = "left"
  }

  const drawBanner = (ctx: CanvasRenderingContext2D, text: string) => {
    const w = 360
    const h = 60
    const x = (WORLD_WIDTH - w) / 2
    const y = 50
    ctx.fillStyle = "rgba(24,24,27,0.7)"
    ctx.fillRect(x, y, w, h)
    ctx.strokeStyle = "#3f3f46"
    ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1)
    ctx.fillStyle = "#e5e7eb"
    ctx.font = "bold 18px system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(text, WORLD_WIDTH / 2, y + h / 2 + 6)
    ctx.textAlign = "left"
  }

  return (
    <div ref={containerRef} className="w-full select-none">
      <canvas ref={canvasRef} className="block bg-black" aria-label="Dino Runner Game Canvas" />
    </div>
  )
}

// Utils
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function rectsOverlap(ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by
}

function roundedRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2)
  ctx.moveTo(x + rr, y)
  ctx.lineTo(x + w - rr, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr)
  ctx.lineTo(x + w, y + h - rr)
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h)
  ctx.lineTo(x + rr, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr)
  ctx.lineTo(x, y + rr)
  ctx.quadraticCurveTo(x, y, x + rr, y)
}
