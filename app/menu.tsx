import React from "react"
import Link from "next/link"
import {Moon, Sun} from "lucide-react"

export default function Menu() {
  const tabs = ["Home", "About", "Projects", "Contact"]
  const currentTab = "Home"
  return (
    <nav className="w-full fixed h-20">
      <div className="w-full max-w-7xl h-full mx-auto flex items-center justify-between">
        <Link href="/" className="text-white font-semibold text-lg">
          LM
        </Link>
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <Link key={tab} href={"/" + tab.toLowerCase()} className={`flex items-center justify-center gap-2 cursor-pointer ${currentTab === tab ? "text-white" : "text-white/70"}`}>
              {currentTab === tab && <div className="rounded-full size-1.5 bg-[#b5ff6d]" />}
              <span className="text-sm font-extralight">{tab}</span>
            </Link>
          ))}
        </div>
        <div>
          <Moon className="size-4" />
        </div>
      </div>
    </nav>
  )
}
