"use client"
import {useEffect, useLayoutEffect, useRef, useState} from "react"
import Link from "next/link"
import gsap from "gsap"
import {Globe, LogIn, Search} from "lucide-react"

const MobileMenu = () => {
  const Tabs = [
  {name: "Anforderungen", path: "/", directLink: true},
  {name: "Produkte", path: "/our-mission"},
  {name: "Service", path: "/what-we-offer"},
  {name: "Kunden", path: "/projects",},
  {name: "Wissen", path: "/contact"},
  {name: "Unternehmen", path: "/technologies"},
]

  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(false)



  useLayoutEffect(() => {
    gsap.set(["#tab"], {yPercent: -100, opacity: 0})
    gsap.set("#menuCover", {y: -window.innerHeight})
    gsap.set("#icons > *", {opacity: 0, xPercent: 100})
  },[])

  function handleMenuLink() {
    if (!buttonTimeline.current || !menuTimeline.current) return
    buttonTimeline.current.reverse()
    menuTimeline.current.timeScale(1.5).reverse()
    setMenuOpen(false)
  }

  const menuTimeline = useRef<GSAPTimeline | null>(null)
  const buttonTimeline = useRef<GSAPTimeline | null>(null)

  useEffect(() => {
    const mt = gsap.timeline({paused: true})
    const bt = gsap.timeline({paused: true})

    bt.to("#topLine", {y: 6.6625, duration: 0.3}, 0).to("#middleLine", {y: 0.2, duration: 0.3}, 0).to("#bottomLine", {y: -6.6625, duration: 0.3}, 0)
    .to("#topLine", {rotate: 45, duration: 0.3, delay: 0.3}, 0).to("#middleLine", {rotate: -45, duration: 0.3, delay: 0.3}, 0).to("#bottomLine", {rotate: -45, duration: 0.3, delay: 0.3}, 0)

    mt.to("#menuCover",{
        y: 0,
        duration: 1,
        ease: "power2.inOut",
      },0)

    .to("#tab",{
        delay: 0.2,
        yPercent: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: "back.inOut(0.5)",
      },0)

    .to("#tab",{
        delay: 0.2,
        opacity: 1,
        duration: 1,
        stagger: 0.02,
        ease: "power2.inOut",
      },0)

      .to("#icons > *",{
          opacity: 1,
          duration: 0.5,
          stagger: 0.2,
          xPercent: 0,
          ease: "power2.inOut",
        },1)

    menuTimeline.current = mt
    buttonTimeline.current = bt

    return () => {
      bt.kill()
      mt.kill()
    }
  }, [])


  function handleMenuClick() {
    if (!buttonTimeline.current || !menuTimeline.current ) return
    if (menuOpen) {
      buttonTimeline.current.reverse()
      menuTimeline.current.timeScale(1.5).reverse()
    } else {
      buttonTimeline.current.play()
      menuTimeline.current.play()
    }
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="md:hidden w-full h-full absolute z-100">
      <div id="menu" className="absolute top-[2.5vh] right-5 rounded-lg w-10 h-10 flex flex-col gap-1 justify-center items-center transition-colors duration-1000 z-200" onClick={handleMenuClick}>
        <div id="topLine" className=" bg-[#108] rounded-full h-0.75 w-6 transition-colors duration-1000" />
        <div id="middleLine" className="bg-[#180c6c] rounded-full h-0.75 w-6 transition-colors duration-1000" />
        <div id="bottomLine" className="bg-[#180c6c] rounded-full h-0.75 w-6 transition-colors duration-1000" />
      </div>

      <div className={`h-[100dvh] absolute inset-0 top-0 overflow-hidden ${menuOpen ? "" : "pointer-events-none"}`}>
        <div className="absolute inset-0 flex flex-col pt-32 gap-3 pl-12">
          {Tabs.map((tab) => (
            <Link href={tab.directLink ? "#" : tab.path} key={tab.name} id="tab" onClick={handleMenuLink}>
                <span className="text-3xl text-[#180c6c] font-semibold">{tab.name}</span>
            </Link>
          ))}
          <div id="icons" className="flex flex-row text-[#180c6c] gap-10 pt-20">
          <LogIn /><Globe /><Search />
            </div>
        </div>
        <div className="bg-white transition-colors duration-1000 -z-10 absolute inset-0" id="menuCover" />
      </div>
    </div>
  )
}

export default MobileMenu