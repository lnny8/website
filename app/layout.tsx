import "./globals.css"
import Menu from "@/lib/layout/menu"
import Footer from "@/lib/layout/footer"
import localFont from "next/font/local"
import ReactLenis from "lenis/react"
import BlurReveal from "@/lib/layout/blurReveal"
import {ThemeProvider} from "next-themes"
import NextTopLoader from "nextjs-toploader"
import MobileMenu from "@/lib/layout/mobileMenu"
import { metadata as siteMetadata } from "./metadata"

const satoshi = localFont({
  src: "/satoshi.ttf",
  variable: "--font-satoshi",
})

export const clash = localFont({
  src: "/clashdisplay.ttf",
  variable: "--font-clash",
})

export const metadata = siteMetadata

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
