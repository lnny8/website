"use client"
import {resolve} from "path"
import React, {useEffect, useRef, useState} from "react"
import {finished} from "stream"

export default function Page() {
  const cols = 29
  const rows = 15
  const bs = 10
  const maze = useRef<("visited" | "unvisited" | "wall" | "broken" | "initial")[][]>(Array.from({length: cols}, () => Array(rows).fill("initial")))

  const inBounds = (x: number, y: number) => x >= 0 && x < cols && y >= 0 && y < rows

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

    maze.current = newMaze
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

  let pos = {x: 0, y: 0}

  function backTracking() {
    gotoStartPos()
    gotoNeighbor()
  }

  function gotoStartPos() {
    const randX = Math.floor(Math.random() * (cols / 2)) * 2
    const randY = Math.floor(Math.random() * (rows / 2)) * 2
    pos = {x: randX, y: randY}
    changeMaze(randX, randY, "visited")
  }

  function getNeighborsVisited() {
    const x = pos.x
    const y = pos.y

    const top = inBounds(x, y - 1) && maze.current[x][y - 2] === "visited"
    const right = inBounds(x + 1, y) && maze.current[x + 2][y] === "visited"
    const bottom = inBounds(x, y + 1) && maze.current[x][y + 2] === "visited"
    const left = inBounds(x - 1, y) && maze.current[x - 2][y] === "visited"

    return {top, right, bottom, left}
  }

  async function gotoNeighbor() {
    while (!(getNeighborsVisited().top && getNeighborsVisited().right && getNeighborsVisited().bottom && getNeighborsVisited().left)) {
      await new Promise((resolve) => setTimeout(resolve, 50))
      switch (getRandomDirection(4)) {
        case 1:
          if (pos.y - 2 < 0) continue
          if (getNeighborsVisited().top) continue
          pos = {x: pos.x, y: pos.y - 1}
          changeMaze(pos.x, pos.y, "broken")
          pos = {x: pos.x, y: pos.y - 1}
          changeMaze(pos.x, pos.y, "visited")
          break
        case 2:
          if (pos.x + 2 >= cols) continue
          if (getNeighborsVisited().right) continue
          pos = {x: pos.x + 1, y: pos.y}
          changeMaze(pos.x, pos.y, "broken")
          pos = {x: pos.x + 1, y: pos.y}
          changeMaze(pos.x, pos.y, "visited")
          break
        case 3:
          if (pos.y + 2 >= rows) continue
          if (getNeighborsVisited().bottom) continue
          pos = {x: pos.x, y: pos.y + 1}
          changeMaze(pos.x, pos.y, "broken")
          pos = {x: pos.x, y: pos.y + 1}
          changeMaze(pos.x, pos.y, "visited")
          break
        case 4:
          if (pos.x - 2 < 0) continue
          if (getNeighborsVisited().left) continue
          pos = {x: pos.x - 1, y: pos.y}
          changeMaze(pos.x, pos.y, "broken")
          pos = {x: pos.x - 1, y: pos.y}
          changeMaze(pos.x, pos.y, "visited")
          break
      }
    }
  }

  function getRandomDirection(options: number) {
    return Math.floor(Math.random() * 4) + 1
  }

  function changeMaze(x: number, y: number, state: "visited" | "unvisited" | "wall" | "broken") {
    const newMaze = maze.current
    newMaze[x][y] = state
    maze.current = newMaze
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
        switch (maze.current[x][y]) {
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
            ctx.fillStyle = "#0a0"
            break
        }
        if (x == pos.x && y == pos.y) ctx.fillStyle = "yellow"
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
