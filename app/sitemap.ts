import type {MetadataRoute} from "next"

const routes = [
  "/",
  "/projects/blackjack",
  "/projects/blob-shader",
  "/projects/connect-four",
  "/projects/fibonacci",
  "/projects/number-font",
  "/projects/sorting-visualizer",
  "/projects/soundmaker",
  "/projects/webgpu-shader",
  "/projects/wheelspin",
  "/tutorials/horizontal-scroll"
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map((route) => ({
    url: `https://lenny.website${route}`,
    lastModified,
  }))
}
