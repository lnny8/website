"use client"
import {boolean, row} from "mathjs"
import React, {useEffect} from "react"

export default function Page() {
  const rows = 6
  const cols = 7
  const cellSize = 100
  const lineWidth = 2
  const [board, setBoard] = React.useState<number[][]>(Array.from({length: cols}, () => Array(rows).fill(0)))
  const [currentPlayer, setCurrentPlayer] = React.useState<number>(1)

  useEffect(() => {
    const canvas = document.getElementById("connect-four-canvas") as HTMLCanvasElement
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = cols * cellSize
    canvas.height = rows * cellSize
    canvas.style.backgroundColor = "#000"

    ctx.strokeStyle = "#ffffff"
    ctx.fillStyle = "#ffffff"

    // resetBoard()

    drawBoard(ctx, canvas)

    for (let c = 0; c < cols; c++) {
      for (let r = rows; r >= 0; r--) {
        if (board[c] && board[c][r] !== 0) {
          ctx.fillStyle = "#00f"
          if (board[c][r] === 2) ctx.fillStyle = "#0f0"
          ctx.beginPath()
          let yPos = r * cellSize + cellSize / 2
          ctx.arc(c * cellSize + cellSize / 2, canvas.height - yPos, cellSize / 2 - 10, 0, Math.PI * 2)
          ctx.fill()
          ctx.closePath()
        }
      }
    }
  })

  function handleClick(event: React.MouseEvent) {
    const canvas = document.getElementById("connect-four-canvas") as HTMLCanvasElement
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const col = Math.floor(x / cellSize)
    addPiece(col)
  }

  function addPiece(col: number) {
    let lastIndex = -1
    for (let r = 0; r < rows; r++) {
      if (board[col][r] === 0) {
        lastIndex = r
        break
      }
    }
    // column full
    if (lastIndex === -1) return

    setBoard((board) => {
      const newBoard = board.map((row) => row.slice())
      newBoard[col][lastIndex] = currentPlayer
      return newBoard
    })
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
    console.log(board)
  }

  function drawBoard(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#000"
    ctx.fillRect(lineWidth, lineWidth, canvas.width - 2 * lineWidth, canvas.height - 2 * lineWidth)
    ctx.fillStyle = "#ffffff"

    for (let r = 1; r <= rows; r++) {
      ctx.fillRect(0, r * cellSize, canvas.width, lineWidth)
    }
    for (let c = 1; c <= cols; c++) {
      ctx.fillRect(c * cellSize, 0, lineWidth, canvas.height)
    }
  }

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <canvas onClick={handleClick} id="connect-four-canvas"></canvas>
    </main>
  )
}
