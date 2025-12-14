import type {Metadata} from "next"
import "./globals.css"
import Menu from "./menu"
import Footer from "./footer"
import localFont from "next/font/local"
import ReactLenis from "lenis/react"
import BlurReveal from "./blurReveal"
import {ThemeProvider} from "next-themes"
import NextTopLoader from "nextjs-toploader"
import MobileMenu from "./mobile-menu"

const satoshi = localFont({
  src: "/satoshi.ttf",
  variable: "--font-satoshi",
})

export const clash = localFont({
  src: "/clashdisplay.ttf",
  variable: "--font-clash",
})

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body suppressHydrationWarning className={`${satoshi.className} ${clash.variable} bg-woodsmoke light:bg-athensgray light:text-black text-white antialiased`}>
        <ReactLenis root>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
            <BlurReveal />
            <NextTopLoader color="#f772c2" showSpinner={false} height={3} />
            <Menu />
            <MobileMenu />
            {children}
            <Footer />
          </ThemeProvider>
        </ReactLenis>
      </body>
    </html>
  )
}
