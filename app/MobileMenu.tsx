"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { ChevronLeft, AlignLeft, Globe, LogIn, Search } from "lucide-react"
import menuData from "./menuData"

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null)
  const [activeSubTabIndex, setActiveSubTabIndex] = useState<number | null>(null)

  const menuTimeline = useRef<gsap.core.Timeline | null>(null)
  const buttonTimeline = useRef<gsap.core.Timeline | null>(null)
  const subMenuTimeline = useRef<gsap.core.Timeline | null>(null)
  const deepMenuTimeline = useRef<gsap.core.Timeline | null>(null)


  // Erstmalige Positionen bei erstem Rendern
  useLayoutEffect(() => {
    gsap.set(["#mainTab"], { yPercent: -100, opacity: 0 })
    gsap.set("#menuCover", { y: -window.innerHeight })
    gsap.set("#icons > *", { opacity: 0, xPercent: 100 })
    gsap.set("#subMenuContainer", { xPercent: 5, opacity: 0 })
    gsap.set(["#subTab"], { xPercent: 100, opacity: 0 })
    gsap.set("#backButton", { opacity: 0 })
    gsap.set("#deepMenuContainer", { xPercent: 5, opacity: 0 })
    gsap.set(["#deepTab"], { xPercent: 100, opacity: 0 })
    gsap.set("#backButtondeep", { opacity: 0, xPercent: -50 })
  }, [])

  // Timelines erstellen
  useEffect(() => {
    // Hamburger Knopf Animation
    const bt = gsap.timeline({ paused: true })
    bt.to("#topLine", { y: 7, duration: 0.3 }, 0)
      .to("#middleLine", { y: 0, duration: 0.3 }, 0)
      .to("#bottomLine", { y: -7, duration: 0.3 }, 0)
      .to("#topLine", { rotate: 45, duration: 0.3, delay: 0.3 }, 0)
      .to("#middleLine", { rotate: -45, duration: 0.3, delay: 0.3 }, 0)
      .to("#bottomLine", { rotate: -45, duration: 0.3, delay: 0.3 }, 0)

    // Hauptmenü / 1. Layer
    const mt = gsap.timeline({ paused: true })
    mt.to("#menuCover", { y: 0, duration: 1, ease: "power2.inOut" }, 0)
      .to("#mainTab", { delay: 0.4, yPercent: 0, duration: 0.6, stagger: 0.02, ease: "back.inOut(0.5)" }, 0)
      .to("#mainTab", { delay: 0.4, opacity: 1, duration: 1, stagger: 0.02, ease: "power2.inOut" }, 0)
      .to("#icons > *", { opacity: 1, duration: 0.5, stagger: 0.2, xPercent: 0, ease: "power2.inOut" }, 1)

    // Submenü / 2. Layer
    const st = gsap.timeline({ paused: true })
    st.to("#mainMenuContainer", { xPercent: -5, duration: 0.5, ease: "power2.inOut" }, 0)
    st.to("#mainMenuContainer", { opacity: 0, duration: 0.3, ease: "power2.inOut" }, 0)
      .to("#subMenuContainer", { xPercent: 0,  duration: 0.5, ease: "power2.inOut" }, 0)
      .to("#subMenuContainer", { opacity: 1, duration: 0.3, ease: "power2.inOut" }, 0)
      .to("#subTab", { xPercent: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.7)" }, 0)
      .to("#backButton", { opacity: 1, duration: 0.3, ease: "power2.out" }, 0)

    // Deep Menü / 3. Layer
    const sst = gsap.timeline({ paused: true })
    sst.to("#subMenuContainer", { xPercent: -5, duration: 0.5, ease: "power2.inOut" }, 0)
    sst.to("#subMenuContainer", { opacity: 0, duration: 0.3, ease: "power2.inOut" }, 0)
      .to("#deepMenuContainer", { xPercent: 0, duration: 0.5, ease: "power2.inOut" }, 0.2)
      .to("#deepMenuContainer", { opacity: 1, duration: 0.3, ease: "power2.inOut" }, 0.2)
      .to("#deepTab", { xPercent: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.7)" }, 0.3)
      .to("#backButtondeep", { opacity: 1, xPercent: 0, duration: 0.3, ease: "power2.out" }, 0.4)

    menuTimeline.current = mt
    buttonTimeline.current = bt
    subMenuTimeline.current = st
    deepMenuTimeline.current = sst

    return () => {
      bt.kill()
      mt.kill()
      st.kill()
      sst.kill()
    }
  }, [])

  // Menü öffnen / schließen
  const handleMenuClick = () => {
    if (!buttonTimeline.current || !menuTimeline.current) return

    if (menuOpen) {
      closeAllMenus()
    } else {
      buttonTimeline.current.play()
      menuTimeline.current.play()
      setMenuOpen(true)
    }
  }

   // Alle Menüs schließen
 const closeAllMenus = () => {
  if (!buttonTimeline.current || !menuTimeline.current) return

  // Wenn Deep Menü auf ist, zuerst das schließen
  if (activeSubTabIndex !== null && deepMenuTimeline.current) {
    deepMenuTimeline.current.reverse().then(() => {
      setActiveSubTabIndex(null)
      // Wenn das dann zu ist, Sub Menü schließen
      if (activeTabIndex !== null && subMenuTimeline.current) {
        subMenuTimeline.current.reverse().then(() => {
          setActiveTabIndex(null)
          buttonTimeline.current?.reverse()
          menuTimeline.current?.timeScale(1.5).reverse()
          setMenuOpen(false)
        })
      } else {
        buttonTimeline.current?.reverse()
        menuTimeline.current?.timeScale(1.5).reverse()
        setMenuOpen(false)
      }
    })
  }
  // Wenn nur Sub Menü auf ist, nur das schließen
  else if (activeTabIndex !== null && subMenuTimeline.current) {
    subMenuTimeline.current.reverse().then(() => {
      setActiveTabIndex(null)
      buttonTimeline.current?.reverse()
      menuTimeline.current?.timeScale(1.5).reverse()
      setMenuOpen(false)
    })
  }
  // Sonst einfach Hauptmenü schließen
  else {
    buttonTimeline.current.reverse()
    menuTimeline.current.timeScale(1.5).reverse()
    setMenuOpen(false)
  }
}

  // Main Tab Funktion
  const handleTabClick = (index: number) => {
    if (!subMenuTimeline.current) return
    setActiveTabIndex(index)
    subMenuTimeline.current.play()
  }

  // Sub Tab Funktion - Entweder Deep Menü öffnen oder direkter Link
  const handleSubTabClick = (index: number) => {
    const subPage = menuData[activeTabIndex!].subPages[index]

    // Wenn es Deep Pages hat, diese öffnen
    if ("deepPages" in subPage && subPage.deepPages?.length) {
      if (!deepMenuTimeline.current) return
      setActiveSubTabIndex(index)
      deepMenuTimeline.current.play()
    }
    // Wenn ein Pfad angegeben ist, zu diesem navigieren
    else if ("path" in subPage && subPage.path) {
      closeAllMenus()
    }
  }

  //Funktion für den Back Knopf
 const handleBackClick = (deep: boolean) => {
    const bt = gsap.timeline();
    bt.fromTo(["#arrow1", "#arrow2"], {xPercent: 0,}, {xPercent: -100, duration: 1, ease: "back.inOut(0.5)",})
    bt.fromTo(["#arrow1", "#arrow2"], {scale: 0.8}, {scale: 1, duration: 0.5, ease: "back.inOut",}, 0)
    if (!deep) { // Ist es das Sub Menu also 2. Layer oder nicht?
         if (!subMenuTimeline.current) return
         subMenuTimeline.current.reverse().then(() => {setActiveTabIndex(null)})} //Zu Main Menu zurückgehen
    else {     
         if (!deepMenuTimeline.current) return
         deepMenuTimeline.current.reverse().then(() => {setActiveSubTabIndex(null)}) // Zu Sub Menu zurückgehen
    }
  }

  return (
    <div className="w-full h-full fixed z-20 md:hidden">
      <header className="w-full h-16 bg-white flex items-center">
        <Link href="/" className="flex items-center gap-2 z-20">
          <div className="relative w-40 h-10 my-3"><Image src="/crossbaseLogo.png" alt="crossbase Logo" fill objectFit="contain" /></div>
        </Link>
      </header>

      {/* Hamburger */}
      <div id="menu" className="absolute top-4 right-5 rounded-lg w-10 h-10 flex flex-col gap-1 justify-center items-center transition-colors duration-1000 z-[200] cursor-pointer" onClick={handleMenuClick}>
        <div id="topLine" className="bg-[#180c6c] rounded-full h-[3px] w-6 transition-colors duration-1000" />
        <div id="middleLine" className="bg-[#180c6c] rounded-full h-[3px] w-6 transition-colors duration-1000" />
        <div id="bottomLine" className="bg-[#180c6c] rounded-full h-[3px] w-6 transition-colors duration-1000" />
      </div>

          {/* Back Button */}
          <div id="backButton" className="flex items-center absolute right-4 gap-5 text-white z-10 w-12 rounded-full h-12 justify-center cursor-pointer" onClick={() => handleBackClick(activeSubTabIndex == null ? false : true)}>
            <div id="border" className="overflow-hidden absolute rounded-2xl w-12 h-12">
              <div className="flex flex-row w-24"><ChevronLeft size={42} id="arrow1" strokeWidth={2} className="text-[#180c6c]" /><ChevronLeft size={42} id="arrow2" strokeWidth={2} className="text-[#180c6c]" /></div></div>
          </div>

      {/* Aktionen */}
      <div id="icons" className="flex flex-row absolute bottom-10 left-0 z-10 right-0 justify-center text-[#180c6c] gap-10 pt-20">
        <LogIn className="cursor-pointer" />
        <Globe className="cursor-pointer" />
        <Search className="cursor-pointer" />
        <div className="w-60 -z-1 backdrop-blur-lg border-1 border-black/10 shadow-2xl h-16 rounded-2xl -bottom-5 absolute" />
      </div>

      {/* Menu Container */}
      <div className={`h-[100dvh] absolute inset-0 top-0 overflow-hidden ${menuOpen ? "" : "pointer-events-none"}`}>
        
        {/* Main Menu */}
        <div id="mainMenuContainer" className="absolute inset-0 flex flex-col pt-32 gap-3 pl-12">
          {menuData.map((tab, index) => (<div key={tab.name} id="mainTab" className="cursor-pointer text-3xl text-[#180c6c] font-semibold" onClick={() => handleTabClick(index)}>{tab.name}</div>))}
        </div>

        {/* Sub Menu */}
        <div id="subMenuContainer" className={`absolute inset-0 flex-col pt-32 gap-5 pl-12 ${activeTabIndex !== null ? "flex" : "hidden"}`}>
          
          {/* Sub-pages */}
          {activeTabIndex !== null && menuData[activeTabIndex].subPages.map((subPage, index) => {
              const hasdeepPages = "deepPages" in subPage &&  subPage.deepPages?.length !== null

              // Keine Subpages + path => direkter Link :D
              if ("path" in subPage && subPage.path && !hasdeepPages) { 
                return (
                  <Link href={subPage.path} key={subPage.name} id="subTab" className="text-3xl text-[#180c6c] font-semibold transition-colors cursor-pointer"onClick={closeAllMenus}>
                    {subPage.name}
                  </Link>
                )}

              // Sonst einfach als Menü
              return (
                <div key={subPage.name} id="subTab" className="text-3xl text-[#180c6c] font-semibold transition-colors cursor-pointer" onClick={() => handleSubTabClick(index)}>
                  <span className="flex flex-row">{subPage.name}<AlignLeft strokeWidth={2} size={30} className="translate-y-[6px] ml-2" /></span>
                </div>)})}
        </div>

        {/* Letztes Menü */}
        <div id="deepMenuContainer" className={`absolute inset-0 flex-col pt-32 gap-5 pl-12 ${activeSubTabIndex !== null ? "flex" : "hidden"}`}>

          {/* Sub-sub-pages */}
          {activeTabIndex !== null &&
            activeSubTabIndex !== null &&
            "deepPages" in menuData[activeTabIndex].subPages[activeSubTabIndex] &&
            menuData[activeTabIndex].subPages[activeSubTabIndex].deepPages?.map((deepPage) => (

              <Link href={deepPage.path} key={deepPage.name} id="deepTab" onClick={closeAllMenus} className="text-3xl text-[#180c6c] font-semibold hover:text-[#2d1eb3] transition-colors">
                {deepPage.name}
              </Link>
            ))}
        </div>

        {/* Menü Hintergrund */}
        <div className="bg-white transition-colors duration-1000 -z-10 absolute inset-0" id="menuCover" />
      </div>
    </div>
  )
}

export default MobileMenu