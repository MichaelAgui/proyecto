"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, VolumeX, Zap, Calendar, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const heroSlides = [
  {
    id: 1,
    title: "ARTE URBANO",
    subtitle: "EN TU PIEL",
    description: "Transformamos tu visión en obras maestras permanentes con técnicas de vanguardia",
    image: "/placeholder.svg?height=1080&width=1920",
    cta: "AGENDA AHORA",
    ctaSecondary: "VER TRABAJOS",
    stats: { experience: "6+ AÑOS", clients: "500+ CLIENTES", rating: "5.0 ESTRELLAS" },
    featured: true,
  },
  {
    id: 2,
    title: "REALISMO",
    subtitle: "FOTOGRÁFICO",
    description: "Especialistas en retratos hiperrealistas que capturan cada detalle con precisión milimétrica",
    image: "/placeholder.svg?height=1080&width=1920",
    cta: "VER REALISMO",
    ctaSecondary: "CONOCER ARTISTAS",
    stats: { style: "REALISMO", works: "200+ OBRAS", precision: "100% DETALLE" },
    featured: false,
  },
  {
    id: 3,
    title: "TRADICIÓN",
    subtitle: "MODERNA",
    description: "Fusionamos estilos clásicos con técnicas contemporáneas para crear piezas únicas",
    image: "/placeholder.svg?height=1080&width=1920",
    cta: "EXPLORAR ESTILOS",
    ctaSecondary: "GALERÍA COMPLETA",
    stats: { styles: "10+ ESTILOS", fusion: "TRADICIÓN + MODERNIDAD", quality: "PREMIUM" },
    featured: false,
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const currentSlideData = heroSlides[currentSlide]

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video/Image Background */}
      <div className="absolute inset-0">
        <Image
          src={currentSlideData.image || "/placeholder.svg"}
          alt={currentSlideData.title}
          fill
          className="object-cover transition-all duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40"></div>
      </div>

      {/* Elementos decorativos animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-red-600/20 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-4 border-gray-600/20 rotate-12 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-red-800/20 -rotate-12 animate-spin"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 border-2 border-red-500/10 rotate-45"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto principal */}
            <div className="space-y-8">
              {currentSlideData.featured && (
                <Badge className="bg-red-600/90 text-white font-bold urban-text uppercase px-4 py-2 text-sm animate-pulse">
                  ⚡ ESTUDIO PREMIUM
                </Badge>
              )}

              <div className="space-y-4">
                <h1 className="urban-title text-7xl md:text-8xl lg:text-9xl font-bold text-white street-shadow leading-none">
                  {currentSlideData.title}
                  <br />
                  <span className="text-red-600 animate-pulse">{currentSlideData.subtitle}</span>
                </h1>
                <p className="urban-text text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed">
                  {currentSlideData.description}
                </p>
              </div>

              {/* Estadísticas */}
              <div className="grid grid-cols-3 gap-6">
                {Object.entries(currentSlideData.stats).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="urban-title text-2xl md:text-3xl font-bold text-red-500 mb-1">{value}</div>
                    <div className="urban-text text-gray-400 text-sm uppercase tracking-wider">{key}</div>
                  </div>
                ))}
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-xl font-bold urban-title red-glow hover:scale-105 transition-all duration-300"
                >
                  <Link href="/agendamiento">
                    <Zap className="mr-3 h-7 w-7" />
                    {currentSlideData.cta}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-400 text-gray-300 hover:bg-gray-800 hover:text-white px-12 py-6 text-xl font-bold urban-title hover:scale-105 transition-all duration-300"
                >
                  <Link href="/portafolios">
                    {currentSlideData.ctaSecondary}
                    <ArrowRight className="ml-3 h-7 w-7" />
                  </Link>
                </Button>
              </div>

              {/* Indicadores de confianza */}
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-400 urban-text">5.0 (200+ reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-400 urban-text">Disponible hoy</span>
                </div>
              </div>
            </div>

            {/* Panel lateral con información adicional */}
            <div className="space-y-6">
              <Card className="bg-black/60 border-red-900/30 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="urban-subtitle text-2xl font-bold text-white mb-4 uppercase">
                    Próxima Disponibilidad
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 urban-text">Hoy</span>
                      <Badge className="bg-green-600/20 text-green-400 border border-green-600/50">2 espacios</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 urban-text">Mañana</span>
                      <Badge className="bg-yellow-600/20 text-yellow-400 border border-yellow-600/50">1 espacio</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 urban-text">Esta semana</span>
                      <Badge className="bg-red-600/20 text-red-400 border border-red-600/50">Completo</Badge>
                    </div>
                  </div>
                  <Button asChild className="w-full mt-6 bg-red-600 hover:bg-red-700 urban-subtitle">
                    <Link href="/agendamiento">
                      <Calendar className="mr-2 h-5 w-5" />
                      RESERVAR AHORA
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Testimonial destacado */}
              <Card className="bg-black/60 border-gray-700/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-4 urban-text">
                    "Increíble experiencia. El nivel de detalle y profesionalismo es incomparable. Mi tatuaje superó
                    todas mis expectativas."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <div>
                      <p className="text-white font-semibold urban-text">Ana García</p>
                      <p className="text-gray-400 text-sm urban-text">Cliente verificado</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Controles del carousel */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center gap-4 bg-black/60 backdrop-blur-sm rounded-full px-6 py-3">
          {/* Indicadores */}
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-red-600 w-8" : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>

          {/* Controles de reproducción */}
          <div className="flex items-center gap-2 border-l border-gray-600 pl-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:text-red-500 transition-colors"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button onClick={() => setIsMuted(!isMuted)} className="text-white hover:text-red-500 transition-colors">
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-30">
        <div className="flex flex-col items-center gap-2 text-white">
          <span className="urban-text text-sm uppercase tracking-wider rotate-90 origin-center">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-red-600 to-transparent animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
