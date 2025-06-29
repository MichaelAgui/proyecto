"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Eye, Heart, Share2, Calendar, Clock, Tag, ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Portfolio, Artist } from "@/lib/types"

interface ArtistPortfolioProps {
  portfolios: Portfolio[]
  artist: Artist
}

export function ArtistPortfolio({ portfolios, artist }: ArtistPortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])

  const categories = [...new Set(portfolios.map((p) => p.category).filter(Boolean))]

  const filteredPortfolios =
    selectedCategory === "all" ? portfolios : portfolios.filter((p) => p.category === selectedCategory)

  const currentImageIndex = selectedImage ? filteredPortfolios.findIndex((p) => p.id === selectedImage) : -1
  const currentPortfolio = currentImageIndex >= 0 ? filteredPortfolios[currentImageIndex] : null

  const navigateImage = (direction: "prev" | "next") => {
    if (currentImageIndex === -1) return
    const newIndex =
      direction === "prev"
        ? currentImageIndex > 0
          ? currentImageIndex - 1
          : filteredPortfolios.length - 1
        : currentImageIndex < filteredPortfolios.length - 1
          ? currentImageIndex + 1
          : 0
    setSelectedImage(filteredPortfolios[newIndex].id)
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-8">
      {/* Filtros por categoría */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            onClick={() => setSelectedCategory("all")}
            variant={selectedCategory === "all" ? "default" : "outline"}
            className={
              selectedCategory === "all"
                ? "bg-red-600 text-white"
                : "border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
            }
          >
            Todos ({portfolios.length})
          </Button>
          {categories.map((category) => {
            const count = portfolios.filter((p) => p.category === category).length
            return (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-red-600 text-white"
                    : "border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                }
              >
                {category} ({count})
              </Button>
            )
          })}
        </div>
      )}

      {/* Grid de trabajos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPortfolios.map((portfolio) => {
          const isFavorite = favorites.includes(portfolio.id)

          return (
            <Card
              key={portfolio.id}
              className="bg-black border border-red-600/30 overflow-hidden hover:border-red-600/70 transition-all duration-300 group"
            >
              {/* Imagen */}
              <div className="relative h-80 overflow-hidden">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer h-full" onClick={() => setSelectedImage(portfolio.id)}>
                      <Image
                        src={portfolio.image_url || "/placeholder.svg"}
                        alt={portfolio.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </DialogTrigger>
                </Dialog>

                {/* Overlay con acciones */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-red-600/80 hover:bg-red-600 text-white"
                      onClick={() => setSelectedImage(portfolio.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => toggleFavorite(portfolio.id)}
                      className={`${isFavorite ? "bg-red-600 text-white" : "bg-black/50 text-white hover:bg-red-600"}`}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                    </Button>
                    <Button size="sm" className="bg-black/50 hover:bg-red-600 text-white">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Badge de categoría */}
                {portfolio.category && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-600/90 text-white font-bold urban-text uppercase text-xs">
                      {portfolio.category}
                    </Badge>
                  </div>
                )}

                {/* Badge de favorito */}
                {isFavorite && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-red-600/90 text-white font-bold urban-text uppercase text-xs">
                      <Heart className="h-3 w-3 mr-1 fill-current" />
                      FAV
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                {/* Título */}
                <h3 className="urban-subtitle text-lg font-bold text-white mb-2 uppercase">{portfolio.title}</h3>

                {/* Descripción */}
                {portfolio.description && (
                  <p className="text-red-400 mb-4 text-sm urban-text leading-relaxed line-clamp-2">
                    {portfolio.description}
                  </p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {portfolio.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-red-600/50 text-red-400 urban-text uppercase text-xs"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                  {portfolio.tags.length > 3 && (
                    <Badge variant="outline" className="border-red-600/50 text-red-400 urban-text uppercase text-xs">
                      +{portfolio.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Metadata */}
                <div className="flex justify-between items-center text-xs text-red-400 urban-text uppercase mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(portfolio.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {Math.floor(Math.random() * 500) + 100}
                  </div>
                </div>

                {/* Botón de agendar */}
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold urban-subtitle"
                >
                  <Link href={`/agendamiento?artist=${artist.id}`}>
                    <Calendar className="mr-2 h-4 w-4" />
                    AGENDAR SIMILAR
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-6xl w-full h-[90vh] bg-black border-red-600/30 p-0">
          {currentPortfolio && (
            <div className="flex h-full">
              {/* Imagen principal */}
              <div className="flex-1 relative">
                <Image
                  src={currentPortfolio.image_url || "/placeholder.svg"}
                  alt={currentPortfolio.title}
                  fill
                  className="object-contain"
                />

                {/* Navegación */}
                <Button
                  onClick={() => navigateImage("prev")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-600 text-white"
                  size="icon"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  onClick={() => navigateImage("next")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-600 text-white"
                  size="icon"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Cerrar */}
                <Button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-red-600 text-white"
                  size="icon"
                >
                  <X className="h-6 w-6" />
                </Button>

                {/* Contador */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm urban-text">
                  {currentImageIndex + 1} / {filteredPortfolios.length}
                </div>
              </div>

              {/* Panel de información */}
              <div className="w-80 bg-black p-6 overflow-y-auto border-l border-red-600/30">
                <div className="space-y-6">
                  <div>
                    <h2 className="urban-subtitle text-xl font-bold text-white mb-2">{currentPortfolio.title}</h2>
                    {currentPortfolio.description && (
                      <p className="text-red-400 urban-text leading-relaxed">{currentPortfolio.description}</p>
                    )}
                  </div>

                  {/* Info del artista */}
                  <div className="flex items-center gap-3 p-3 bg-red-600/10 rounded-lg border border-red-600/30">
                    <div className="relative w-12 h-12">
                      <Image
                        src={artist.image_url || "/placeholder.svg?height=48&width=48"}
                        alt={artist.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white font-semibold urban-text">{artist.name}</p>
                      {artist.instagram_handle && (
                        <p className="text-red-400 text-sm urban-text">@{artist.instagram_handle}</p>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="text-red-400 urban-text uppercase font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentPortfolio.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-red-600/20 text-red-400 border border-red-600/50 urban-text uppercase text-xs"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Botón de agendar */}
                  <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white font-bold urban-subtitle">
                    <Link href={`/agendamiento?artist=${artist.id}`}>
                      <Calendar className="mr-2 h-4 w-4" />
                      AGENDAR CON {artist.name.split(" ")[0].toUpperCase()}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Mensaje si no hay trabajos */}
      {filteredPortfolios.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="urban-subtitle text-2xl text-white mb-4">No hay trabajos en esta categoría</h3>
          <p className="urban-text text-red-400 mb-6">Intenta seleccionar otra categoría o ver todos los trabajos</p>
          <Button
            onClick={() => setSelectedCategory("all")}
            className="bg-red-600 hover:bg-red-700 text-white font-bold urban-subtitle"
          >
            Ver Todos los Trabajos
          </Button>
        </div>
      )}
    </div>
  )
}
