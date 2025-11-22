import type {Metadata} from "next"
import {Outfit, Plus_Jakarta_Sans} from "next/font/google"
import "./globals.css"
import Menu from "./menu"

const outfit = Outfit({
  subsets: ["latin"],
})

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "lenny",
  description: "made by lenny",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body suppressHydrationWarning className={`${font.className} bg-black text-white antialiased`}>
        <Menu />
        {children}
      </body>
    </html>
  )
}
