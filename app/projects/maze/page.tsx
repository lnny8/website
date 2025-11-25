"use client"
import React, {useEffect, useState} from "react"

export default function Page() {
  const cols = 29
  const rows = 15
  const bs = 10
  const [maze, setMaze] = useState<("visited" | "unvisited" | "wall" | "broken" | "initial")[][]>(Array.from({length: cols}, () => Array(rows).fill("initial")))

  function initMaze() {
    const newMaze: ("visited" | "unvisited" | "wall" | "broken" | "initial")[][] = Array.from({length: cols}, () => Array(rows).fill("initial"))

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        if (y % 2 === 1) {
          newMaze[x][y] = "wall"
        } else if (x % 2 === 1) {
          newMaze[x][y] = "wall"
        } else {
          newMaze[x][y] = "unvisited"
        }
      }
    }

    setMaze(newMaze)
  }

  useEffect(() => {
    const canvas = document.getElementById("maze-canvas") as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const bs = 10
    if ((canvas.width % 2) * bs == 0) {
      canvas.width -= bs
    }
    initMaze()
  }, [])

  useEffect(() => {
    drawMaze()
  }, [maze])

  function backTracking() {
    const randX = Math.floor(Math.random() * (cols / 2)) * 2
    const randY = Math.floor(Math.random() * (rows / 2)) * 2
    changeMaze(randX, randY, "visited")
    let pos = {x: randX, y: randY}

    for (let i = 0; i < 10; i++) {
      switch (getRandomDirection(4)) {
        case 1:
          pos = {x: pos.x, y: pos.y + 1}
          changeMaze(pos.x, pos.y, "broken")
          pos = {x: pos.x, y: pos.y + 1}
          changeMaze(pos.x, pos.y, "visited")
          break
        case 2:
          pos = {x: pos.x + 1, y: pos.y}
          changeMaze(pos.x, pos.y, "broken")
          pos = {x: pos.x + 1, y: pos.y}
          changeMaze(pos.x, pos.y, "visited")
          break
        case 3:
          pos = {x: pos.x, y: pos.y - 1}
          changeMaze(pos.x, pos.y, "broken")
          pos = {x: pos.x, y: pos.y - 1}
          changeMaze(pos.x, pos.y, "visited")
          break
        case 3:
          pos = {x: pos.x - 1, y: pos.y}
          changeMaze(pos.x, pos.y, "broken")
          pos = {x: pos.x - 1, y: pos.y}
          changeMaze(pos.x, pos.y, "visited")
          break
      }
    }
  }

  function getRandomDirection(options: number) {
    return Math.floor(Math.random() * options)
  }

  function changeMaze(x: number, y: number, state: "visited" | "unvisited" | "wall" | "broken") {
    const newMaze = maze
    newMaze[x][y] = state
    setMaze(newMaze)
    drawMaze()
  }

  function drawMaze() {
    const canvas = document.getElementById("maze-canvas") as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        ctx.fillStyle = "#000"
        switch (maze[x][y]) {
          case "wall":
            ctx.fillStyle = "#000"
            break
          case "unvisited":
            ctx.fillStyle = "#fff"
            break
          case "visited":
            ctx.fillStyle = "#0f0"
            break
          case "broken":
            ctx.fillStyle = "#0f0"
            break
        }
        ctx.fillRect(x * bs, y * bs, bs, bs)
      }
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl text-bold pb-20">Maze Generator</h1>
      <canvas className="w-full max-w-6xl h-full" id="maze-canvas" />
      <button className="bg-white text-black text-2xl font-semibold p-2 mt-10 rounded-2xl cursor-pointer" onClick={() => backTracking()}>
        Start
      </button>
    </main>
  )
}
