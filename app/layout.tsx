import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const font = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "crossbase | Demo",
  description: "Designed by Lonui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${font.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
