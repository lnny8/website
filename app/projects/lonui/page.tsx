import ProjectPage from "@/lib/pages/projectPage"
import React from "react"

export default function page() {
  return (
    <ProjectPage
      title="Lonui Demo Website"
      imageUrl="/labels/lonui.png"
      stack={["Next.js", "GSAP", "Figma", "Logo Designs", "SEO", "Marketing", "Google Ads Design"]}
      projectUrl="https://lonui.de"
      description="Originally created to showcase web development and marketing skills, Lonui is a modern, responsive site built with Next.js and GSAP. Visual design and logos were crafted in Figma; the project includes SEO optimizations, marketing assets, and Google Ads creative design experience. Focused on user-friendly UX and polished front‑end implementation."
    />
  )
}
