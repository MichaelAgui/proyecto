"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Calendar, Zap } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "INICIO" },
    { href: "/portafolios", label: "PORTAFOLIOS" },
    { href: "/galeria", label: "GALERÍA" },
    { href: "/quienes-somos", label: "NOSOTROS" },
    { href: "/agendamiento", label: "AGENDA" },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-sm border-b-2 border-red-900/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Zap className="h-10 w-10 text-red-600" />
            <span className="urban-title text-3xl font-bold text-white street-shadow">
              INS<span className="text-red-600">K</span>PIRE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="urban-text text-gray-400 hover:text-red-500 transition-colors duration-200 font-semibold text-sm tracking-wider uppercase"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-bold urban-subtitle red-glow">
              <Link href="/agendamiento">
                <Calendar className="mr-2 h-5 w-5" />
                AGENDA
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:text-red-500">
                <Menu className="h-8 w-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-red-900/30">
              <div className="flex flex-col space-y-8 mt-12">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="urban-text text-gray-400 hover:text-red-500 transition-colors duration-200 text-xl font-bold uppercase tracking-wide"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-bold urban-subtitle mt-8">
                  <Link href="/agendamiento" onClick={() => setIsOpen(false)}>
                    <Calendar className="mr-2 h-5 w-5" />
                    AGENDA CITA
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
