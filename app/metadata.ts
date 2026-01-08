import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://lnny.dev"),
  title: {
    default: `Lenny Muffler · Portfolio`,
    template: `%s · Lenny Muffler`,
  },
  description: "Creative developer crafting motion-heavy web experiences",
  keywords: ["Lenny Muffler", "creative developer", "Next.js portfolio", "GSAP engineer", "WebGL developer", "motion design", "frontend consultant", "shader artist"],
  authors: [{name: "Lenny Muffler", url: "https://lnny.dev"}],
  creator: "Lenny Muffler",
  publisher: "Lenny Muffler",
  alternates: {canonical: "https://lnny.dev"},
  openGraph: {
    title: `Lenny Muffler · Portfolio`,
    description: "Creative developer crafting motion-heavy web experiences",
    url: "https://lnny.dev",
    siteName: "Lenny Muffler",
    type: "website",
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