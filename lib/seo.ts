import type {Metadata} from "next"

export const siteConfig = {
  name: "Lenny Muffler",
  tagline: "Creative developer crafting motion-heavy web experiences",
  description: "Lenny Muffler is a creative developer specialised in WebGL, GSAP motion, and interactive web apps that blend polished design with solid engineering.",
  email: "lenny@lenny.website",
  url: "https://lenny.website",
  keywords: ["Lenny Muffler", "creative developer", "Next.js portfolio", "GSAP engineer", "WebGL developer", "motion design", "frontend consultant", "shader artist"],
  socials: {
    linkedin: "https://www.linkedin.com/in/lennymuffler",
  },
  defaultOgImage: "/projects/lonui.png",
}

export const metadataBase = new URL(siteConfig.url)

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString()
}

type BuildMetadataOptions = {
  title?: string
  description?: string
  path?: string
  keywords?: string[]
  openGraphImage?: string
}

export function buildMetadata({title, description, path = "/", keywords, openGraphImage}: BuildMetadataOptions = {}): Metadata {
  const resolvedTitle = title ?? siteConfig.tagline
  const resolvedDescription = description ?? siteConfig.description
  const canonicalUrl = absoluteUrl(path)
  const image = openGraphImage ? absoluteUrl(openGraphImage) : absoluteUrl(siteConfig.defaultOgImage)

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    metadataBase,
    alternates: {canonical: canonicalUrl},
    keywords: keywords ?? siteConfig.keywords,
    authors: [{name: siteConfig.name, url: siteConfig.url}],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}
