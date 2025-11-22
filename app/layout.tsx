import type {Metadata} from "next"
import {Outfit, Plus_Jakarta_Sans} from "next/font/google"
import "./globals.css"
import Menu from "./menu"
import Footer from "./footer"
import {absoluteUrl, metadataBase, siteConfig} from "@/lib/seo"

const outfit = Outfit({
  subsets: ["latin"],
})

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${siteConfig.name} · Creative Developer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{name: siteConfig.name, url: siteConfig.url}],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {canonical: siteConfig.url},
  openGraph: {
    title: `${siteConfig.name} · Creative Developer`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [{url: absoluteUrl(siteConfig.defaultOgImage)}],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · Creative Developer`,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.defaultOgImage)],
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.tagline,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  sameAs: Object.values(siteConfig.socials).filter(Boolean),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}} />
      </head>
      <body suppressHydrationWarning className={`${font.className} bg-black text-white antialiased`}>
        <Menu />
        {children}
        <Footer />
      </body>
    </html>
  )
}
