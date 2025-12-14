"use client"
import Link from "next/link"
import React, {useEffect, useState} from "react"
import {AnimatePresence, motion} from "motion/react"
import Image from "next/image"
import {Mail, Moon, Phone, Sun} from "lucide-react"
import {useTheme} from "next-themes"

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuKey, setMenuKey] = useState(0)
  const {theme, resolvedTheme, setTheme} = useTheme()
  const [mounted, setMounted] = useState(false)

  const tabs = [
    {label: "Home", link: "/"},
    {label: "About", link: "/about"},
    {label: "Projects", link: "/projects"},
    {label: "Tutorials", link: "/tutorials"},
    {label: "Contact", link: "/contact"},
  ]

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen)
    if (!menuOpen) {
      setMenuKey((prev) => prev + 1)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="fixed md:hidden not-sr-only z-80 w-full">
      <Link href="/" className="absolute h-6 gap-3 flex items-center justify-center top-6 left-6 text-xl font-bold z-8">
        <span className="text-white font-clash light:text-black font-medium text-lg">LM</span>
      </Link>
      <motion.div animate={{rotate: menuOpen ? 180 : 0}} transition={{duration: menuOpen ? 0.42 : 0}} onClick={handleMenuToggle} className="z-50 w-6 h-6 absolute top-6 right-6 flex flex-col items-center justify-center gap-1">
        <motion.div animate={{y: menuOpen ? 3 : 0, rotate: menuOpen ? 45 : 0}} className="bg-white light:bg-black w-5 h-0.5 rounded-full" />
        <motion.div animate={{y: menuOpen ? -3 : 0, rotate: menuOpen ? -45 : 0}} className="bg-white light:bg-black w-5 h-0.5 rounded-full" />
      </motion.div>{" "}
      <AnimatePresence key={menuKey}>
        {menuOpen && (
          <motion.div animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} transition={{ease: "easeInOut", duration: 0.3}} className="absolute top-0 left-0 pt-40 w-full h-[100dvh] bg-woodsmoke light:bg-athensgray">
            {tabs.map((tab, index) => (
              <motion.div
                key={index}
                className="text-3xl flex justify-center w-full pt-2 overflow-hidden font-clash"
                initial={{opacity: 0, y: 30, scale: 0.9}}
                animate={{opacity: 1, y: 0, scale: 1}}
                exit={{opacity: 0, y: -20, scale: 0.95}}
                transition={{
                  delay: index * 0.08,
                  duration: 0.4,
                  ease: "easeOut",
                }}>
                {" "}
                <motion.div whileHover={{scale: 1.05, color: "#cbd5e1"}} whileTap={{scale: 0.95}} transition={{duration: 0.2, ease: "easeOut"}}>
                  <Link href={tab.link} onClick={() => setMenuOpen(false)}>
                    {tab.label}
                  </Link>
                </motion.div>
              </motion.div>
            ))}
            <motion.div
              className="flex justify-center w-full pt-8"
              initial={{opacity: 0, y: 30, scale: 0.9}}
              animate={{opacity: 1, y: 0, scale: 1}}
              exit={{opacity: 0, y: -20, scale: 0.95}}
              transition={{
                delay: tabs.length * 0.08,
                duration: 0.4,
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6"
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: 20}}
              transition={{
                delay: (tabs.length + 1) * 0.08,
                duration: 0.4,
                ease: "easeOut",
              }}>
              <motion.a href="mailto:lenny@lenny.website" className="w-12 h-12 flex items-center justify-center border-1 border-white/5 light:border-black/5 rounded-full" whileHover={{scale: 1.1, y: -4}} whileTap={{scale: 0.95}} transition={{duration: 0.2, ease: "easeOut"}}>
                <Mail className="size-5 text-white/70 light:text-black/70" />
              </motion.a>

              <motion.button
                animate={mounted ? {rotate: theme === "dark" ? 0 : 90, transition: {duration: 0.5, type: "spring"}} : {rotate: 0}}
                whileTap={{scale: 0.9}}
                className="w-12 h-12 flex items-center justify-center border-1 border-white/5 light:border-black/5 rounded-full"
                onClick={() => {
                  if (!mounted) return
                  const newTheme = theme === "dark" ? "light" : "dark"
                  setTheme(newTheme)
                }}>
                {mounted ? theme === "dark" ? <Moon className="size-5 text-white/70" /> : <Sun className="size-5 text-black/70" /> : <span className="block size-5" />}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
