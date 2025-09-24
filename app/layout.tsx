import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"

const outfit = Inter({
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
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>{children}</body>
    </html>
  )
}
