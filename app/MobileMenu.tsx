"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { ArrowLeft, Globe, LogIn, Search } from "lucide-react"

const menuData = [
  {
    name: "Anforderungen",
    subPages: [
      { name: "Management", path: "/anforderungen/management" },
      { name: "Marketing", path: "/anforderungen/marketing" },
      { name: "Produktdatenpflege", path: "/anforderungen/produktdatenpflege" },
      { name: "Übersetzung / Lokalisierung", path: "/anforderungen/uebersetzung-lokalisierung" },
      { name: "E-Commerce / Verkauf", path: "/anforderungen/e-commerce-verkauf" },
      { name: "Engineering", path: "/anforderungen/engineering" },
    ],
  },
  {
    name: "Produkte",
    subPages: [
      { name: "Vorteile", path: "/produkte/produkt-1" },
      { name: "Editionen", path: "/produkte/produkt-2" },
      { name: "KI", path: "/produkte/produkt-3" },
      { name: "Anwendungsmodule", path: "/produkte/produkt-4" },
      {
        name: "Basismodule",
        subsubPages: [
          { name: "Datenbank-Basismodul", path: "/test" },
          { name: "Mehrsprachige Oberfläche", path: "/test" },
          { name: "Web-Applikationsserver", path: "/test" },
          { name: "Datenhub und Prozessmonitor", path: "/test" },
        ],
      },
      {
        name: "Datenimport",
        subsubPages: [
          { name: "ERP-Schnittstelle", path: "/test" },
          { name: "Datenimport-Konfigurator", path: "/test" },
        ],
      },
      {
        name: "PIM und MAM",
        subsubPages: [
          { name: "Produktdatenbank", path: "/test" },
          { name: "Media Asset Manager", path: "/test" },
          { name: "Textverwaltung", path: "/test" },
          { name: "Channel Output Manager", path: "/test" },
          { name: "Workflowmanagement", path: "/test" },
        ],
      },
      {
        name: "Übersetzung",
        subsubPages: [
          { name: "Übersetzungsmanagement", path: "/test" },
          { name: "Onlineübersetzung", path: "/test" },
        ],
      },
      {
        name: "Datenbereitstellung",
        subsubPages: [
          { name: "Datenexport E-Kataloge", path: "/test" },
          { name: "API-Server", path: "/test" },
          { name: "Sales Information Service", path: "/test" },
        ],
      },
      {
        name: "Online",
        subsubPages: [
          { name: "Headless CMS", path: "/test" },
          { name: "Onlinekatalog", path: "/test" },
          { name: "Medienservice", path: "/test" },
          { name: "Mobile Anwendungen", path: "/test" },
        ],
      },
      {
        name: "Print",
        subsubPages: [
          { name: "Print Publishing", path: "/test" },
          { name: "Office-Anbindung", path: "/test" },
        ],
      },
    ],
  },
  {
    name: "Service",
    subPages: [
      { name: "Umsetzung", path: "/service/umsetzung" },
      { name: "Beratung & Support", path: "/service/beratung-support" },
      { name: "Schulungen", path: "/service/schulungen" },
      { name: "IT-Systemanforderungen", path: "/service/it-systemanforderungen" },
    ],
  },
  {
    name: "Kunden",
    subPages: [
      { name: "Kundenübersicht", path: "/kunden/kundenuebersicht" },
      { name: "Maschinenbau und Elektronik", path: "/kunden/maschinenbau-elektronik" },
      { name: "Bauelemente und Baustoffe", path: "/kunden/bauelemente-baustoffe" },
      { name: "Medizintechnik", path: "/kunden/medizintechnik" },
      { name: "Konsumgüter", path: "/kunden/konsumgueter" },
    ],
  },
  {
    name: "Wissen",
    subPages: [
      { name: "Blog", path: "/wissen/blog" },
      { name: "PIM-Leitfaden", path: "/wissen/pim-leitfaden" },
      { name: "crossbase Lösungen", path: "/wissen/crossbase-loesungen" },
      {
        name: "Kundenprojekte",
        path: "/wissen/kundenprojekte",
        subsubPages: [
          { name: "E-Commerce", path: "/test" },
          { name: "Onlinekatalog", path: "/test" },
          { name: "Medienservice", path: "/test" },
          { name: "Print und PDF", path: "/test" },
        ],
      },
      {
        name: "Case Studies",
        subsubPages: [
          { name: "Case Studies E-Commerce", path: "/test" },
          { name: "Case Studies Print", path: "/test" },
        ],
      },
      { name: "Video", path: "/wissen/video" },
    ],
  },
  {
    name: "Unternehmen",
    subPages: [
      { name: "Über uns", path: "/unternehmen/ueber-uns" },
      { name: "Neuigkeiten", path: "/unternehmen/neuigkeiten" },
      {
        name: "Karriere",
        subsubPages: [
          { name: "Offene Stellen", path: "/test" },
          { name: "Arbeiten bei crossbase", path: "/test" },
          { name: "Studierende", path: "/test" },
          { name: "Absolventen", path: "/test" },
        ],
      },
      { name: "Partner", path: "/unternehmen/partner" },
      { name: "crossbase for kids", path: "/unternehmen/crossbase-for-kids" },
    ],
  },
]

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null)
  const [activeSubTabIndex, setActiveSubTabIndex] = useState<number | null>(null)

  const menuTimeline = useRef<gsap.core.Timeline | null>(null)
  const buttonTimeline = useRef<gsap.core.Timeline | null>(null)
  const subMenuTimeline = useRef<gsap.core.Timeline | null>(null)
  const subSubMenuTimeline = useRef<gsap.core.Timeline | null>(null)

  // Back arrow animation
  useEffect(() => {
    gsap.to("#backArrow", {
      xPercent: 20,
      duration: 1,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    })
  }, [])

  // Initial setup of elements
  useLayoutEffect(() => {
    gsap.set(["#mainTab"], { yPercent: -100, opacity: 0 })
    gsap.set("#menuCover", { y: -window.innerHeight })
    gsap.set("#icons > *", { opacity: 0, xPercent: 100 })
    gsap.set("#subMenuContainer", { xPercent: 100, opacity: 0 })
    gsap.set(["#subTab"], { xPercent: 100, opacity: 0 })
    gsap.set("#backButton", { opacity: 0, xPercent: -50 })
    gsap.set("#subSubMenuContainer", { xPercent: 100, opacity: 0 })
    gsap.set(["#subSubTab"], { xPercent: 100, opacity: 0 })
    gsap.set("#backButtonSubSub", { opacity: 0, xPercent: -50 })
  }, [])

  // Initialize animations
  useEffect(() => {
    // Button animation
    const bt = gsap.timeline({ paused: true })
    bt.to("#topLine", { y: 7, duration: 0.3 }, 0)
      .to("#middleLine", { y: 0, duration: 0.3 }, 0)
      .to("#bottomLine", { y: -7, duration: 0.3 }, 0)
      .to("#topLine", { rotate: 45, duration: 0.3, delay: 0.3 }, 0)
      .to("#middleLine", { rotate: -45, duration: 0.3, delay: 0.3 }, 0)
      .to("#bottomLine", { rotate: -45, duration: 0.3, delay: 0.3 }, 0)

    // Main menu animation
    const mt = gsap.timeline({ paused: true })
    mt.to("#menuCover", { y: 0, duration: 1, ease: "power2.inOut" }, 0)
      .to("#mainTab", { delay: 0.2, yPercent: 0, duration: 0.6, stagger: 0.02, ease: "back.inOut(0.5)" }, 0)
      .to("#mainTab", { delay: 0.2, opacity: 1, duration: 1, stagger: 0.02, ease: "power2.inOut" }, 0)
      .to("#icons > *", { opacity: 1, duration: 0.5, stagger: 0.2, xPercent: 0, ease: "power2.inOut" }, 1)

    // Sub-menu animation
    const st = gsap.timeline({ paused: true })
    st.to("#mainMenuContainer", { xPercent: -100, opacity: 0, duration: 0.5, ease: "power2.inOut" }, 0)
      .to("#subMenuContainer", { xPercent: 0, opacity: 1, duration: 0.5, ease: "power2.inOut" }, 0.2)
      .to("#subTab", { xPercent: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.7)" }, 0.3)
      .to("#backButton", { opacity: 1, xPercent: 0, duration: 0.3, ease: "power2.out" }, 0.4)

    // Sub-sub-menu animation
    const sst = gsap.timeline({ paused: true })
    sst
      .to("#subMenuContainer", { xPercent: -100, opacity: 0, duration: 0.5, ease: "power2.inOut" }, 0)
      .to("#subSubMenuContainer", { xPercent: 0, opacity: 1, duration: 0.5, ease: "power2.inOut" }, 0.2)
      .to("#subSubTab", { xPercent: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.7)" }, 0.3)
      .to("#backButtonSubSub", { opacity: 1, xPercent: 0, duration: 0.3, ease: "power2.out" }, 0.4)

    menuTimeline.current = mt
    buttonTimeline.current = bt
    subMenuTimeline.current = st
    subSubMenuTimeline.current = sst

    return () => {
      bt.kill()
      mt.kill()
      st.kill()
      sst.kill()
    }
  }, [])

  // Handle menu toggle
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

  // Close all menus in the correct order
  const closeAllMenus = () => {
    if (!buttonTimeline.current || !menuTimeline.current) return

    // If sub-sub-menu is open, close it first
    if (activeSubTabIndex !== null && subSubMenuTimeline.current) {
      subSubMenuTimeline.current.reverse().then(() => {
        setActiveSubTabIndex(null)
        // Then if sub-menu is open, close it
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
    // If only sub-menu is open, close it
    else if (activeTabIndex !== null && subMenuTimeline.current) {
      subMenuTimeline.current.reverse().then(() => {
        setActiveTabIndex(null)
        buttonTimeline.current?.reverse()
        menuTimeline.current?.timeScale(1.5).reverse()
        setMenuOpen(false)
      })
    }
    // Otherwise just close the main menu
    else {
      buttonTimeline.current.reverse()
      menuTimeline.current.timeScale(1.5).reverse()
      setMenuOpen(false)
    }
  }

  // Handle main tab click
  const handleTabClick = (index: number) => {
    if (!subMenuTimeline.current) return
    setActiveTabIndex(index)
    subMenuTimeline.current.play()
  }

  // Handle sub-tab click - either open sub-sub-menu or navigate to path
  const handleSubTabClick = (index: number) => {
    const subPage = menuData[activeTabIndex!].subPages[index]

    // If it has sub-sub-pages, open them
    if ("subsubPages" in subPage && subPage.subsubPages?.length) {
      if (!subSubMenuTimeline.current) return
      setActiveSubTabIndex(index)
      subSubMenuTimeline.current.play()
    }
    // If it has a path, navigate to it
    else if ("path" in subPage && subPage.path) {
      closeAllMenus()
    }
  }

  // Handle back button click to return to main menu
  const handleBackClick = () => {
    if (!subMenuTimeline.current) return
    subMenuTimeline.current.reverse().then(() => {
      setActiveTabIndex(null)
    })
  }

  // Handle back button click to return to sub-menu
  const handleBackSubSubClick = () => {
    if (!subSubMenuTimeline.current) return
    subSubMenuTimeline.current.reverse().then(() => {
      setActiveSubTabIndex(null)
    })
  }

  return (
    <div className="w-full h-full fixed z-20 md:hidden">
      {/* Header */}
      <header className="w-full h-16 bg-white flex items-center">
        <Link href="/" className="flex items-center gap-2 z-20">
          <div className="relative w-40 h-10 my-3">
            <Image src="/crossbaseLogo.png" alt="crossbase Logo" fill objectFit="contain" />
          </div>
        </Link>
      </header>

      {/* Menu Button */}
      <div
        id="menu"
        className="absolute top-4 right-5 rounded-lg w-10 h-10 flex flex-col gap-1 justify-center items-center transition-colors duration-1000 z-[200]"
        onClick={handleMenuClick}
      >
        <div id="topLine" className="bg-[#180c6c] rounded-full h-[3px] w-6 transition-colors duration-1000" />
        <div id="middleLine" className="bg-[#180c6c] rounded-full h-[3px] w-6 transition-colors duration-1000" />
        <div id="bottomLine" className="bg-[#180c6c] rounded-full h-[3px] w-6 transition-colors duration-1000" />
      </div>

      {/* Footer Icons */}
      <div
        id="icons"
        className="flex flex-row absolute bottom-10 left-0 right-0 justify-center text-[#180c6c] gap-10 pt-20"
      >
        <LogIn className="cursor-pointer" />
        <Globe className="cursor-pointer" />
        <Search className="cursor-pointer" />
      </div>

      {/* Menu Container */}
      <div className={`h-[100dvh] absolute inset-0 top-0 overflow-hidden ${menuOpen ? "" : "pointer-events-none"}`}>
        {/* Main Menu */}
        <div id="mainMenuContainer" className="absolute inset-0 flex flex-col pt-32 gap-3 pl-12">
          {menuData.map((tab, index) => (
            <div key={tab.name} id="mainTab" className="cursor-pointer" onClick={() => handleTabClick(index)}>
              <span className="text-3xl text-[#180c6c] font-semibold">{tab.name}</span>
            </div>
          ))}
        </div>

        {/* Sub Menu */}
        <div id="subMenuContainer" className="absolute inset-0 flex flex-col pt-32 gap-5 pl-12">
          {/* Back Button */}
          <div
            id="backButton"
            className="flex items-center gap-5 text-white bg-[#180c6c] w-42 rounded-full h-12 justify-center cursor-pointer mb-4"
            onClick={handleBackClick}
          >
            <ArrowLeft size={24} id="backArrow" />
            <span className="text-xl font-medium">Zurück</span>
          </div>

          {/* Sub-pages */}
          {activeTabIndex !== null &&
            menuData[activeTabIndex].subPages.map((subPage, index) => {
              const hasSubSubPages = "subsubPages" in subPage &&  subPage.subsubPages?.length !== null

              // If it has a path, render as a link
              if ("path" in subPage && subPage.path && !hasSubSubPages) {
                return (
                  <Link href={subPage.path} key={subPage.name} id="subTab" className="text-3xl text-[#180c6c] font-semibold transition-colors cursor-pointer"onClick={closeAllMenus}>
                    {subPage.name}
                  </Link>
                )
              }

              // If it has sub-sub-pages, render as a clickable item
              return (
                <div key={subPage.name} id="subTab" className="text-3xl text-[#180c6c] font-semibold transition-colors cursor-pointer" onClick={() => handleSubTabClick(index)}>
                  {subPage.name} {">"}
                </div>
              )
            })}
        </div>

        {/* Sub-Sub Menu */}
        <div id="subSubMenuContainer" className="absolute inset-0 flex flex-col pt-32 gap-5 pl-12">
          {/* Back Button */}
          <div
            id="backButtonSubSub"
            className="flex items-center gap-2 text-[#180c6c] cursor-pointer mb-4"
            onClick={handleBackSubSubClick}
          >
            <ArrowLeft size={24} id="backArrow" />
            <span className="text-xl font-medium">Zurück</span>
          </div>

          {/* Sub-sub-pages */}
          {activeTabIndex !== null &&
            activeSubTabIndex !== null &&
            "subsubPages" in menuData[activeTabIndex].subPages[activeSubTabIndex] &&
            menuData[activeTabIndex].subPages[activeSubTabIndex].subsubPages?.map((subSubPage: any) => (
              <Link
                href={subSubPage.path}
                key={subSubPage.name}
                id="subSubTab"
                onClick={closeAllMenus}
                className="text-3xl text-[#180c6c] font-semibold hover:text-[#2d1eb3] transition-colors"
              >
                {subSubPage.name}
              </Link>
            ))}
        </div>

        {/* Menu Background */}
        <div className="bg-white transition-colors duration-1000 -z-10 absolute inset-0" id="menuCover" />
      </div>
    </div>
  )
}

export default MobileMenu
