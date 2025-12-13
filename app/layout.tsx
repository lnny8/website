import type {Metadata} from "next"
import {Inter, Outfit, Plus_Jakarta_Sans} from "next/font/google"
import "./globals.css"
import Menu from "./menu"
import Footer from "./footer"
import localFont from "next/font/local"
import ReactLenis from "lenis/react"
import BlurReveal from "./blurReveal"
import { ThemeProvider } from "next-themes"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const satoshi = localFont({
  src: "/satoshi.ttf",
  variable: "--font-satoshi",
})

export const clash = localFont({
  src: "/clashdisplay.ttf",
  variable: "--font-clash",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://lenny.website"),
  title: {
    default: `Lenny Muffler · Full Stack Developer`,
    template: `%s · Lenny Muffler`,
  },
  description: "Creative developer crafting motion-heavy web experiences",
  keywords: ["Lenny Muffler", "creative developer", "Next.js portfolio", "GSAP engineer", "WebGL developer", "motion design", "frontend consultant", "shader artist"],
  authors: [{name: "Lenny Muffler", url: "https://lenny.website"}],
  creator: "Lenny Muffler",
  publisher: "Lenny Muffler",
  alternates: {canonical: "https://lenny.website"},
  openGraph: {
    title: `Lenny Muffler · Creative Developer`,
    description: "Creative developer crafting motion-heavy web experiences",
    url: "https://lenny.website",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider attribute="class">
    <html suppressHydrationWarning lang="en">
      <ReactLenis root />
      <body suppressHydrationWarning className={`${satoshi.className} ${clash.variable} bg-black text-white antialiased`}>
        <BlurReveal />
        <Menu />
        {children}
        <Footer />
      </body>
    </html>
    </ThemeProvider>
  )
}
