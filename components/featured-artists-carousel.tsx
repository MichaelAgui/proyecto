"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Instagram, Calendar, Award, Users, Palette, Star, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Artist } from "@/lib/types"

interface FeaturedArtistsCarouselProps {
  artists: Artist[]
}

export function FeaturedArtistsCarousel({ artists }: FeaturedArtistsCarouselProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-black via-dark-900 to-steel-950 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 border border-red-600/10 rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-gray-600/10 -rotate-12"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-red-800/10 rotate-12"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-red-600/20 text-red-400 border border-red-600/50 mb-6 px-4 py-2 urban-text uppercase">
            ⭐ EQUIPO PREMIUM
          </Badge>
          <h2 className="urban-title text-6xl md:text-7xl font-bold text-white mb-6 street-shadow">
            NUESTROS <span className="text-red-600">MAESTROS</span>
          </h2>
          <p className="urban-text text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            ARTISTAS DE CLASE MUNDIAL CON AÑOS DE EXPERIENCIA EN LA ESCENA URBANA. CADA UNO CON SU ESTILO ÚNICO Y
            TÉCNICAS ESPECIALIZADAS.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {artists.map((artist) => (
              <CarouselItem key={artist.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="bg-dark-800/80 border-2 border-red-900/30 hover:border-red-600/50 transition-all duration-500 group overflow-hidden h-full">
                  <CardContent className="p-0">
                    {/* Header con imagen y stats */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={artist.image_url || "/placeholder.svg?height=256&width=400"}
                        alt={artist.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                      {/* Badge de experiencia */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-600/90 text-white font-bold urban-text uppercase">
                          <Award className="h-3 w-3 mr-1" />
                          {artist.years_experience}+ AÑOS
                        </Badge>
                      </div>

                      {/* Rating */}
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 bg-black/60 rounded-full px-2 py-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-white text-sm font-bold">5.0</span>
                        </div>
                      </div>

                      {/* Info básica en overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="urban-subtitle text-2xl font-bold text-white mb-1 uppercase">{artist.name}</h3>
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin className="h-4 w-4" />
                          <span className="urban-text text-sm">Estudio Principal</span>
                        </div>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6 space-y-6">
                      {/* Bio */}
                      <p className="text-gray-400 urban-text leading-relaxed text-sm">{artist.bio}</p>

                      {/* Especialidades */}
                      <div>
                        <h4 className="text-gray-400 urban-text uppercase font-semibold mb-3 text-xs tracking-wider">
                          Especialidades
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {artist.specialties.map((specialty) => (
                            <Badge
                              key={specialty}
                              className="bg-red-900/30 text-red-400 border border-red-800/50 urban-text font-semibold uppercase text-xs"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Estadísticas */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="urban-title text-xl font-bold text-red-500">
                            {Math.floor(Math.random() * 100) + 50}+
                          </div>
                          <div className="urban-text text-gray-400 text-xs uppercase">Trabajos</div>
                        </div>
                        <div className="text-center">
                          <div className="urban-title text-xl font-bold text-red-500">
                            {Math.floor(Math.random() * 50) + 20}+
                          </div>
                          <div className="urban-text text-gray-400 text-xs uppercase">Clientes</div>
                        </div>
                        <div className="text-center">
                          <div className="urban-title text-xl font-bold text-red-500">5.0</div>
                          <div className="urban-text text-gray-400 text-xs uppercase">Rating</div>
                        </div>
                      </div>

                      {/* Disponibilidad */}
                      <div className="bg-black/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="urban-text text-gray-400 text-sm uppercase">Próxima disponibilidad</span>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-green-400 urban-text text-xs">Disponible</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <Clock className="h-4 w-4 text-red-500" />
                          <span className="urban-text text-sm">
                            {Math.random() > 0.5 ? "Hoy 2:00 PM" : "Mañana 10:00 AM"}
                          </span>
                        </div>
                      </div>

                      {/* Acciones */}
                      <div className="space-y-3">
                        <Button
                          asChild
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold urban-subtitle"
                        >
                          <Link href="/portafolios">
                            <Palette className="mr-2 h-4 w-4" />
                            VER TRABAJOS
                          </Link>
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white urban-text"
                          >
                            <Link href="/agendamiento">
                              <Calendar className="mr-1 h-4 w-4" />
                              AGENDAR
                            </Link>
                          </Button>
                          {artist.instagram_handle && (
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white urban-text"
                            >
                              <Link href={`https://instagram.com/${artist.instagram_handle.replace("@", "")}`}>
                                <Instagram className="mr-1 h-4 w-4" />
                                SEGUIR
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-black/60 border-red-900/30 text-white hover:bg-red-600/20 -left-12" />
          <CarouselNext className="bg-black/60 border-red-900/30 text-white hover:bg-red-600/20 -right-12" />
        </Carousel>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-red-900/20 via-black/40 to-red-900/20 rounded-2xl p-8 border border-red-900/30">
            <h3 className="urban-subtitle text-2xl font-bold text-white mb-4 uppercase">
              ¿No sabes qué artista elegir?
            </h3>
            <p className="text-gray-400 urban-text mb-6">
              Agenda una consulta gratuita y te ayudamos a encontrar el artista perfecto para tu visión
            </p>
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold urban-subtitle">
              <Link href="/agendamiento">
                <Users className="mr-2 h-5 w-5" />
                CONSULTA GRATUITA
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
