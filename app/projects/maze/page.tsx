"use client"
import HoverButton from "@/lib/components/hoverButton";
import React, {useEffect, useRef, useState} from "react"

type CellState = "visited" | "unvisited" | "wall" | "broken"
type Cell = {state: CellState; index: number}
type Position = {x: number; y: number}

const CELL_SIZE = 10

const DIRECTIONS = [
  {dx: 0, dy: -2, wallDx: 0, wallDy: -1},
  {dx: 2, dy: 0, wallDx: 1, wallDy: 0},
  {dx: 0, dy: 2, wallDx: 0, wallDy: 1},
  {dx: -2, dy: 0, wallDx: -1, wallDy: 0},
]

export default function Page() {
  const maze = useRef<Cell[][]>(createGrid())
  const currentIndex = useRef(0)
  const stack = useRef<Position[]>([])
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isGenerating = useRef(false)
  const [cols, setCols] = useState(0)
  const [rows, setRows] = useState(0)

  useEffect(() => {
    initMaze()
  }, [])

  function initMaze() {
    if(typeof window === 'undefined') return
    if (!canvasRef.current) return
    setCols(Math.floor(canvasRef.current.width / CELL_SIZE))
    setRows(Math.floor(canvasRef.current.height / CELL_SIZE))
    maze.current = createGrid()
    currentIndex.current = 0
    stack.current = []
    drawMaze()
  }

  function createGrid(): Cell[][] {
    return Array.from({length: cols}, (_, x) =>
      Array.from({length: rows}, (_, y) => {
        const isWall = x % 2 === 1 || y % 2 === 1
        return {state: isWall ? "wall" : "unvisited", index: 0}
      })
    )
  }

  function inBounds(x: number, y: number) {
    return x >= 0 && x < cols && y >= 0 && y < rows
  }

  function getUnvisitedNeighbors(position: Position) {
    const neighbors: {cell: Position; wall: Position}[] = []
    for (const dir of DIRECTIONS) {
      const nx = position.x + dir.dx
      const ny = position.y + dir.dy
      const wx = position.x + dir.wallDx
      const wy = position.y + dir.wallDy
      if (!inBounds(nx, ny)) continue
      if (maze.current[nx][ny].state !== "unvisited") continue
      neighbors.push({cell: {x: nx, y: ny}, wall: {x: wx, y: wy}})
    }
    return neighbors
  }

  async function backTracking() {
    if (isGenerating.current) return
    isGenerating.current = true
    initMaze()
    const start: Position = {
      x: Math.floor(Math.random() * Math.ceil(cols / 2)) * 2,
      y: Math.floor(Math.random() * Math.ceil(rows / 2)) * 2,
    }
    currentIndex.current = 1
    changeMaze(start.x, start.y, "visited", currentIndex.current)
    stack.current.push(start)

    while (stack.current.length) {
      const current = stack.current[stack.current.length - 1]
      const neighbors = getUnvisitedNeighbors(current)
      if (neighbors.length === 0) {
        stack.current.pop()
        continue
      }
      const next = neighbors[Math.floor(Math.random() * neighbors.length)]
      changeMaze(next.wall.x, next.wall.y, "broken", 0)
      currentIndex.current++
      changeMaze(next.cell.x, next.cell.y, "visited", currentIndex.current)
      stack.current.push(next.cell)
      await delay(30)
    }

    isGenerating.current = false
  }

  function delay(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms))
  }

  function changeMaze(x: number, y: number, state: CellState, index: number) {
    if (!maze.current[x]) return
    maze.current[x][y] = {state, index}
    drawMaze()
  }

  function drawMaze() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const head = stack.current[stack.current.length - 1]
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        let fill = "#0b0b0d"
        const cell = maze.current[x]?.[y]
        switch (cell?.state) {
          case "wall":
            fill = "#0b0b0d"
            break
          case "unvisited":
            fill = "#fff"
            break
          case "visited":
            fill = "#0f0"
            break
          case "broken":
            fill = "#0a0"
            break
          default:
            fill = "#0b0b0d"
        }
        if (head && head.x === x && head.y === y) {
          fill = "#ff0"
        }
        ctx.fillStyle = fill
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
      }
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl text-bold pb-20">Maze Generator</h1>
      <canvas ref={canvasRef} className="w-full max-w-6xl h-full" />
      <div className="pt-10 space-x-4">
        <button onClick={() => void backTracking()}><HoverButton text1="Start" text2="Let's go" /></button>
        <button onClick={() => initMaze()}><HoverButton text1="Reset" text2="Try again" /></button>
      </div>
    </main>
  )
}
