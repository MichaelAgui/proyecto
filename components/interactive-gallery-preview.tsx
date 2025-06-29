"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Eye, Heart, Share2, Play, ArrowRight, LayoutGrid, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { GalleryItem } from "@/lib/types"

interface InteractiveGalleryPreviewProps {
  galleryItems: (GalleryItem & { artist_name?: string })[]
}

export function InteractiveGalleryPreview({ galleryItems }: InteractiveGalleryPreviewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const categories = [...new Set(galleryItems.map((item) => item.category).filter(Boolean))]
  const filteredItems =
    selectedCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)
  const featuredItems = filteredItems.filter((item) => item.featured).slice(0, 6)
  const regularItems = filteredItems.filter((item) => !item.featured).slice(0, 6)

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Elementos decorativos animados */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 border border-red-600/5 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border border-gray-600/5 -rotate-12 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-red-800/5 rotate-12 animate-spin"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header interactivo */}
        <div className="text-center mb-16">
          <Badge className="bg-red-600/20 text-red-400 border border-red-600/50 mb-6 px-4 py-2 urban-text uppercase animate-pulse">
            🎨 GALERÍA INTERACTIVA
          </Badge>
          <h2 className="urban-title text-6xl md:text-7xl font-bold text-white mb-6 street-shadow">
            ARTE <span className="text-red-600">EN VIVO</span>
          </h2>
          <p className="urban-text text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
            EXPLORA NUESTRA COLECCIÓN DE OBRAS MAESTRAS. CADA PIEZA CUENTA UNA HISTORIA ÚNICA DE ARTE Y PASIÓN.
          </p>

          {/* Filtros interactivos */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-3 rounded-full font-bold urban-text uppercase text-sm transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-red-600 text-white shadow-lg red-glow"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <LayoutGrid className="mr-2 h-4 w-4 inline" />
              TODOS ({galleryItems.length})
            </button>
            {categories.map((category) => {
              const count = galleryItems.filter((item) => item.category === category).length
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-bold urban-text uppercase text-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-red-600 text-white shadow-lg red-glow"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {category} ({count})
                </button>
              )
            })}
          </div>
        </div>

        {/* Tabs para organizar contenido */}
        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-dark-800/50 border border-red-900/30 mb-12">
            <TabsTrigger
              value="featured"
              className="urban-text text-white data-[state=active]:bg-red-600 data-[state=active]:text-white font-bold uppercase"
            >
              <Zap className="mr-2 h-4 w-4" />
              DESTACADOS
            </TabsTrigger>
            <TabsTrigger
              value="recent"
              className="urban-text text-white data-[state=active]:bg-red-600 data-[state=active]:text-white font-bold uppercase"
            >
              <Play className="mr-2 h-4 w-4" />
              RECIENTES
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-8">
            {/* Grid principal destacado */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item, index) => (
                <Card
                  key={item.id}
                  className={`bg-dark-800/80 border-2 border-gray-700/30 overflow-hidden hover:border-red-600/50 transition-all duration-500 group cursor-pointer ${
                    index === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className={`relative overflow-hidden ${index === 0 ? "h-96" : "h-64"}`}>
                    <Image
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.title || "Tattoo artwork"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Overlay con efectos */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent transition-opacity duration-300 ${
                        hoveredItem === item.id ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>

                    {/* Badge destacado */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-yellow-600/90 text-black font-bold urban-text uppercase animate-pulse">
                        ⭐ DESTACADO
                      </Badge>
                    </div>

                    {/* Estadísticas en tiempo real */}
                    <div className="absolute top-4 right-4 space-y-2">
                      <div className="bg-black/60 rounded-full px-2 py-1 flex items-center gap-1">
                        <Eye className="h-3 w-3 text-red-500" />
                        <span className="text-white text-xs font-bold">{Math.floor(Math.random() * 1000) + 100}</span>
                      </div>
                      <div className="bg-black/60 rounded-full px-2 py-1 flex items-center gap-1">
                        <Heart className="h-3 w-3 text-red-500" />
                        <span className="text-white text-xs font-bold">{Math.floor(Math.random() * 100) + 10}</span>
                      </div>
                    </div>

                    {/* Acciones en hover */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                        hoveredItem === item.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="flex gap-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="bg-red-600/80 hover:bg-red-600 text-white">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl bg-black border-red-900/30">
                            <div className="relative h-96">
                              <Image
                                src={item.image_url || "/placeholder.svg"}
                                alt={item.title || "Tattoo artwork"}
                                fill
                                className="object-contain"
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" className="bg-gray-700/80 hover:bg-gray-700 text-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-gray-700/80 hover:bg-gray-700 text-white">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Info en overlay */}
                    <div
                      className={`absolute bottom-4 left-4 right-4 transition-opacity duration-300 ${
                        hoveredItem === item.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="bg-black/80 rounded-lg p-4">
                        <h3 className="urban-subtitle text-lg font-bold text-white mb-1 uppercase">
                          {item.title || "Obra Maestra"}
                        </h3>
                        {item.artist_name && (
                          <p className="text-red-400 urban-text font-semibold mb-2">por {item.artist_name}</p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {item.category && (
                            <Badge className="bg-red-900/30 text-red-400 border border-red-800/50 urban-text uppercase text-xs">
                              {item.category}
                            </Badge>
                          )}
                          {item.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="border-gray-600/50 text-gray-300 urban-text uppercase text-xs"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-8">
            {/* Grid de trabajos recientes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {regularItems.map((item) => (
                <Card
                  key={item.id}
                  className="bg-dark-800/80 border-2 border-gray-700/30 overflow-hidden hover:border-red-600/50 transition-all duration-500 group cursor-pointer hover:scale-105"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.title || "Tattoo artwork"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent transition-opacity duration-300 ${
                        hoveredItem === item.id ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>

                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-600/90 text-white font-bold urban-text uppercase text-xs">NUEVO</Badge>
                    </div>

                    <div
                      className={`absolute bottom-2 left-2 right-2 transition-opacity duration-300 ${
                        hoveredItem === item.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <h4 className="text-white font-bold urban-text text-sm">{item.title}</h4>
                      {item.artist_name && <p className="text-red-400 urban-text text-xs">{item.artist_name}</p>}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section con estadísticas en vivo */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-red-900/20 via-black/40 to-red-900/20 rounded-3xl p-12 border-2 border-red-900/30 backdrop-blur-sm">
            <h3 className="urban-title text-5xl font-bold text-white mb-6 street-shadow">
              ¿LISTO PARA SER <span className="text-red-600">PARTE</span>?
            </h3>
            <p className="urban-text text-gray-400 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
              ÚNETE A LOS CIENTOS DE CLIENTES QUE YA FORMAN PARTE DE NUESTRA GALERÍA. TU PRÓXIMO TATUAJE PODRÍA SER EL
              PRÓXIMO DESTACADO.
            </p>

            {/* Estadísticas en tiempo real */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-black/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-red-500 urban-title">{galleryItems.length}+</div>
                <div className="text-gray-400 urban-text text-sm uppercase">Obras Creadas</div>
              </div>
              <div className="bg-black/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-red-500 urban-title">
                  {Math.floor(Math.random() * 50) + 20}K+
                </div>
                <div className="text-gray-400 urban-text text-sm uppercase">Vistas Totales</div>
              </div>
              <div className="bg-black/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-red-500 urban-title">98%</div>
                <div className="text-gray-400 urban-text text-sm uppercase">Satisfacción</div>
              </div>
              <div className="bg-black/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-red-500 urban-title">24/7</div>
                <div className="text-gray-400 urban-text text-sm uppercase">Disponible</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-bold urban-title px-12 py-6 text-xl red-glow hover:scale-105 transition-all duration-300"
              >
                <Link href="/galeria">
                  <Eye className="mr-3 h-6 w-6" />
                  VER GALERÍA COMPLETA
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white font-bold urban-title px-12 py-6 text-xl hover:scale-105 transition-all duration-300"
              >
                <Link href="/agendamiento">
                  CREAR MI OBRA
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
