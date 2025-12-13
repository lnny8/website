import type {Metadata} from "next"
import "./globals.css"
import Menu from "./menu"
import Footer from "./footer"
import localFont from "next/font/local"
import ReactLenis from "lenis/react"
import BlurReveal from "./blurReveal"
import {ThemeProvider} from "next-themes"
import NextTopLoader from 'nextjs-toploader';

const satoshi = localFont({
  src: "/satoshi.ttf",
  variable: "--font-satoshi",
})

export const clash = localFont({
  src: "/clashdisplay.ttf",
  variable: "--font-clash",
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
    <html suppressHydrationWarning lang="en">
      <head>
      <script type="module" src="https://unpkg.com/@splinetool/viewer@1.12.16/build/spline-viewer.js"></script>
      </head>
      <body suppressHydrationWarning className={`${satoshi.className} ${clash.variable} bg-woodsmoke light:bg-athensgray light:text-black text-white antialiased`}>
        <ReactLenis root>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
            <BlurReveal />
            <NextTopLoader color="#f772c2" showSpinner={false} height={1} />
            <Menu />
            {children}
            <Footer />
          </ThemeProvider>
        </ReactLenis>
      </body>
    </html>
  )
}
