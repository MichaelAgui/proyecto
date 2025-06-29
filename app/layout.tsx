import type React from "react"
import type { Metadata } from "next"
import { Inter, Bebas_Neue, Oswald } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { PageTransition } from "@/components/page-transition"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
})
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "INSKPIRE - Estudio de Tatuajes Urbano",
  description:
    "Estudio de tatuajes urbano con artistas especializados. Arte corporal que refleja la cultura de la calle.",
  keywords: "tatuajes, tattoo, arte urbano, street art, cultura urbana, tatuadores",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${bebasNeue.variable} ${oswald.variable} font-sans`}>
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
