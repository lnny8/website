import Image from "next/image"
import Link from "next/link"
import { Globe, LogIn, Search } from "lucide-react"

interface NavItemProps {
  href: string
  label: string
  hasDropdown?: boolean
}

function NavItem({ href, label, hasDropdown = false }: NavItemProps) {
  return (
    <div className="relative group">
      <Link
        href={href}
        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 flex items-center"
      >
        {label}
        {hasDropdown && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1 h-4 w-4"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        )}
      </Link>
    </div>
  )
}

export function Navbar() {
  return (
    <header className="hidden md:block fixed backdrop-blur-2xl bg-white/80 z-20 w-full h-18">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 z-20">
              <div className="relative w-40 h-10">
              <Image
                src="/crossbaseLogo.png"
                alt="crossbase Logo"
                fill objectFit="contain"
              />
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <NavItem href="#" label="Anforderungen" hasDropdown />
            <NavItem href="#" label="Produkte" hasDropdown />
            <NavItem href="#" label="Service" hasDropdown />
            <NavItem href="#" label="Kunden" hasDropdown />
            <NavItem href="#" label="Wissen" hasDropdown />
            <NavItem href="#" label="Unternehmen" hasDropdown />
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <LogIn className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Globe className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
