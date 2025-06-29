"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Instagram, Award, Clock, DollarSign, Users } from "lucide-react"
import Image from "next/image"
import type { Artist } from "@/lib/types"

interface ArtistSelectorProps {
  artists: Artist[]
  selectedArtist: Artist | null
  onArtistSelect: (artist: Artist) => void
  preferredStyle?: string
}

export function ArtistSelector({ artists, selectedArtist, onArtistSelect, preferredStyle }: ArtistSelectorProps) {
  const [showAll, setShowAll] = useState(false)

  // Filtrar artistas por estilo preferido
  const filteredArtists = preferredStyle
    ? artists.filter((artist) =>
        artist.specialties.some((specialty) => specialty.toLowerCase().includes(preferredStyle.toLowerCase())),
      )
    : artists

  const displayedArtists = showAll ? filteredArtists : filteredArtists.slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white urban-subtitle mb-2">SELECCIONA TU ARTISTA</h3>
        <p className="text-gray-400">
          {preferredStyle ? `Artistas especializados en ${preferredStyle}` : "Todos nuestros artistas especializados"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedArtists.map((artist) => (
          <Card
            key={artist.id}
            className={`cursor-pointer transition-all duration-300 overflow-hidden ${
              selectedArtist?.id === artist.id
                ? "border-red-600 bg-red-900/20 shadow-lg shadow-red-600/20"
                : "border-gray-700/50 bg-dark-800/80 hover:border-red-600/50 hover:bg-red-900/10"
            }`}
            onClick={() => onArtistSelect(artist)}
          >
            <CardContent className="p-0">
              {/* Header con imagen */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={artist.image_url || "/placeholder.svg?height=200&width=300"}
                  alt={artist.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                {/* Rating */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 bg-black/70 rounded-full px-2 py-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-white text-sm font-bold">4.9</span>
                  </div>
                </div>

                {/* Disponibilidad */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-600/90 text-white text-xs">Disponible hoy</Badge>
                </div>

                {/* Info básica */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white font-bold text-lg urban-subtitle">{artist.name}</h4>
                  <p className="text-gray-300 text-sm">{artist.years_experience} años de experiencia</p>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6 space-y-4">
                {/* Bio */}
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{artist.bio}</p>

                {/* Especialidades */}
                <div>
                  <h5 className="text-gray-400 text-xs uppercase font-semibold mb-2">Especialidades</h5>
                  <div className="flex flex-wrap gap-2">
                    {artist.specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        className={`text-xs ${
                          preferredStyle && specialty.toLowerCase().includes(preferredStyle.toLowerCase())
                            ? "bg-red-600/20 text-red-400 border border-red-600/50"
                            : "bg-gray-800/50 text-gray-300 border border-gray-700"
                        }`}
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-700/50">
                  <div className="text-center">
                    <div className="text-red-500 font-bold text-lg">25+</div>
                    <div className="text-gray-400 text-xs">Trabajos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-500 font-bold text-lg">$150</div>
                    <div className="text-gray-400 text-xs">Por hora</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-500 font-bold text-lg">2-3h</div>
                    <div className="text-gray-400 text-xs">Próximo slot</div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="space-y-3">
                  <Button
                    className={`w-full font-bold urban-subtitle ${
                      selectedArtist?.id === artist.id
                        ? "bg-red-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-red-600 hover:text-white"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      onArtistSelect(artist)
                    }}
                  >
                    {selectedArtist?.id === artist.id ? "SELECCIONADO" : "SELECCIONAR"}
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-gray-600 text-gray-400 hover:bg-gray-800"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Users className="mr-1 h-3 w-3" />
                      Portfolio
                    </Button>
                    {artist.instagram_handle && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-gray-600 text-gray-400 hover:bg-gray-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Instagram className="mr-1 h-3 w-3" />
                        Instagram
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mostrar más artistas */}
      {filteredArtists.length > 3 && !showAll && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(true)}
            className="border-gray-600 text-gray-400 hover:bg-gray-800"
          >
            Ver todos los artistas ({filteredArtists.length - 3} más)
          </Button>
        </div>
      )}

      {/* Información del artista seleccionado */}
      {selectedArtist && (
        <Card className="bg-red-900/20 border-red-600/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Image
                  src={selectedArtist.image_url || "/placeholder.svg?height=64&width=64"}
                  alt={selectedArtist.name}
                  fill
                  className="rounded-full object-cover border-2 border-red-600"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold text-lg">{selectedArtist.name}</h4>
                <p className="text-red-400 text-sm">Artista seleccionado</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    {selectedArtist.years_experience} años
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    $150/hora
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Disponible hoy
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onArtistSelect(null as any)}
                className="border-gray-600 text-gray-400 hover:bg-gray-800"
              >
                Cambiar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
