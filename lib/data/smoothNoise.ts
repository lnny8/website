export function smoothNoise(x: number): number {
  const i = Math.floor(x)
  const f = x - i
  const fade = f * f * (3 - 2 * f)

  const a = Math.sin(i * 12.9898 + 78.233) * 43758.5453
  const b = Math.sin((i + 1) * 12.9898 + 78.233) * 43758.5453

  const result = (a - Math.floor(a)) * (1 - fade) + (b - Math.floor(b)) * fade
  return result - 0.5
}