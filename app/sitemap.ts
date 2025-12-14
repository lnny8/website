import type {MetadataRoute} from "next"

const routes = ["/", "/contact"]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map((route) => ({
    url: `https://lnny.dev${route}`,
    lastModified,
  }))
}
