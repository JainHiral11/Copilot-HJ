import { useEffect, useRef, useState } from 'react'
import './SnakeGame.css'

type Point = { x: number; y: number }

const BOARD_SIZE = 20
const INITIAL_SPEED = 120 // ms per tick

function randomPoint(exclude: Set<string>): Point {
  while (true) {
    const p = { x: Math.floor(Math.random() * BOARD_SIZE), y: Math.floor(Math.random() * BOARD_SIZE) }
    const k = `${p.x},${p.y}`
    if (!exclude.has(k)) return p
  }
}

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(() => [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ])
  const [dir, setDir] = useState<Point>({ x: 1, y: 0 })
  const [food, setFood] = useState<Point>(() => randomPoint(new Set(snake.map(s => `${s.x},${s.y}`))))
  const [running, setRunning] = useState<boolean>(false)
  const [speed, setSpeed] = useState<number>(INITIAL_SPEED)
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(false)

  const tickRef = useRef<number | null>(null)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') setDirIfValid({ x: 0, y: -1 })
      if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') setDirIfValid({ x: 0, y: 1 })
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') setDirIfValid({ x: -1, y: 0 })
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') setDirIfValid({ x: 1, y: 0 })
      if (e.key === ' ') setRunning(r => !r)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snake, dir])

  useEffect(() => {
    if (running && !gameOver) {
      tickRef.current = window.setInterval(tick, speed)
    }
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current)
      tickRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, speed, gameOver, snake, dir])

  function setDirIfValid(newDir: Point) {
    // Prevent reversing directly
    if (newDir.x === -dir.x && newDir.y === -dir.y) return
    setDir(newDir)
  }

  function tick() {
    setSnake(prev => {
      const head = prev[0]
      const next: Point = { x: head.x + dir.x, y: head.y + dir.y }

      // wall collision
      if (next.x < 0 || next.x >= BOARD_SIZE || next.y < 0 || next.y >= BOARD_SIZE) {
        setRunning(false)
        setGameOver(true)
        return prev
      }

      const key = `${next.x},${next.y}`
      const bodySet = new Set(prev.map(p => `${p.x},${p.y}`))
      if (bodySet.has(key)) {
        setRunning(false)
        setGameOver(true)
        return prev
      }

      const ate = next.x === food.x && next.y === food.y
      const newSnake = [next, ...prev]
      if (!ate) newSnake.pop()

      if (ate) {
        setScore(s => s + 1)
        const exclude = new Set(newSnake.map(p => `${p.x},${p.y}`))
        setFood(randomPoint(exclude))
        // optionally increase speed slightly
        setSpeed(s => Math.max(40, s - 2))
      }

      return newSnake
    })
  }

  function start() {
    if (gameOver) {
      reset()
    }
    setRunning(true)
  }

  function pause() {
    setRunning(false)
  }

  function reset() {
    const init = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ]
    setSnake(init)
    setDir({ x: 1, y: 0 })
    setFood(randomPoint(new Set(init.map(s => `${s.x},${s.y}`))))
    setScore(0)
    setSpeed(INITIAL_SPEED)
    setGameOver(false)
    setRunning(false)
  }

  const snakeSet = new Set(snake.map(p => `${p.x},${p.y}`))

  return (
    <div className="snake-game">
      <h1>Snake</h1>
      <div className="hud">
        <div className="score">Score: {score}</div>
        <div className="controls">
          <button onClick={start} disabled={running && !gameOver}>Start</button>
          <button onClick={pause} disabled={!running}>Pause</button>
          <button onClick={reset}>Reset</button>
          <label className="speed">
            Speed
            <input type="range" min={40} max={300} value={speed} onChange={e => setSpeed(Number(e.target.value))} />
          </label>
        </div>
      </div>

      <div
        className="board"
        style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`, gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)` }}
      >
        {Array.from({ length: BOARD_SIZE }).flatMap((_, y) =>
          Array.from({ length: BOARD_SIZE }).map((__, x) => {
            const k = `${x},${y}`
            const isSnake = snakeSet.has(k)
            const isFood = food.x === x && food.y === y
            const className = `cell${isSnake ? ' snake' : ''}${isFood ? ' food' : ''}`
            return <div key={k} className={className} />
          }),
        )}
      </div>

      {gameOver && <div className="game-over">Game Over — score {score}</div>}

      <p className="hint">Use arrow keys or WASD to move. Space to toggle pause.</p>
    </div>
  )
}
