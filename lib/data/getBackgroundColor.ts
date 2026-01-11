export function getBackgroundColor(seed: string | number, brightness: number, saturation: number) {
  const seedString = seed.toString()
  let hash = 0

  for (let i = 0; i < seedString.length; i++) {
    hash = (hash * 31 + seedString.charCodeAt(i)) | 0
  }

  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, ${saturation}%, ${brightness}%)`
}
