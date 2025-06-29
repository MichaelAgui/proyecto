"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  Calendar,
  Eye,
  Heart,
  Share2,
  Search,
  Filter,
  LayoutGrid,
  List,
  SortAsc,
  SortDesc,
  Clock,
  MapPin,
  Star,
  Instagram,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Bookmark,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Portfolio } from "@/lib/types"

interface AdvancedPortfolioGridProps {
  portfolios: (Portfolio & {
    artist_name?: string
    instagram_handle?: string
    artist_image?: string
    specialties?: string[]
  })[]
  artists: Array<{ id: number; name: string }>
}

type ViewMode = "grid" | "list" | "masonry"
type SortOption = "date" | "popularity" | "artist" | "category"

export function AdvancedPortfolioGrid({ portfolios, artists }: AdvancedPortfolioGridProps) {
  const [selectedArtist, setSelectedArtist] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortBy, setSortBy] = useState<SortOption>("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Obtener categorías y tags únicos
  const { categories, allTags } = useMemo(() => {
    const cats = [...new Set(portfolios.map((p) => p.category).filter(Boolean))]
    const tags = [...new Set(portfolios.flatMap((p) => p.tags))]
    return { categories: cats, allTags: tags }
  }, [portfolios])

  // Filtrar y ordenar portafolios
  const filteredAndSortedPortfolios = useMemo(() => {
    const filtered = portfolios.filter((portfolio) => {
      const matchesArtist = selectedArtist === "all" || portfolio.artist_id.toString() === selectedArtist
      const matchesCategory = selectedCategory === "all" || portfolio.category === selectedCategory
      const matchesSearch =
        searchTerm === "" ||
        portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => portfolio.tags.includes(tag))

      return matchesArtist && matchesCategory && matchesSearch && matchesTags
    })

    // Ordenar
    filtered.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "date":
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          break
        case "popularity":
          comparison = Math.random() - 0.5 // Simulado
          break
        case "artist":
          comparison = (a.artist_name || "").localeCompare(b.artist_name || "")
          break
        case "category":
          comparison = (a.category || "").localeCompare(b.category || "")
          break
      }
      return sortOrder === "desc" ? -comparison : comparison
    })

    return filtered
  }, [portfolios, selectedArtist, selectedCategory, searchTerm, selectedTags, sortBy, sortOrder])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const clearAllFilters = () => {
    setSelectedArtist("all")
    setSelectedCategory("all")
    setSearchTerm("")
    setSelectedTags([])
  }

  const currentImageIndex = selectedImage ? filteredAndSortedPortfolios.findIndex((p) => p.id === selectedImage) : -1
  const currentPortfolio = currentImageIndex >= 0 ? filteredAndSortedPortfolios[currentImageIndex] : null

  const navigateImage = (direction: "prev" | "next") => {
    if (currentImageIndex === -1) return
    const newIndex =
      direction === "prev"
        ? currentImageIndex > 0
          ? currentImageIndex - 1
          : filteredAndSortedPortfolios.length - 1
        : currentImageIndex < filteredAndSortedPortfolios.length - 1
          ? currentImageIndex + 1
          : 0
    setSelectedImage(filteredAndSortedPortfolios[newIndex].id)
  }

  return (
    <div className="space-y-8">
      {/* Header con controles avanzados */}
      <div className="bg-dark-800/50 rounded-2xl p-8 border-2 border-red-900/20">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Búsqueda */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar por título, descripción o tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-black/50 border-gray-700 text-white placeholder-gray-500 urban-text h-12"
              />
            </div>
          </div>

          {/* Controles de vista y ordenamiento */}
          <div className="flex gap-4">
            <div className="flex bg-black/50 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="text-white"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="text-white"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex bg-black/50 rounded-lg p-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-white urban-text text-sm px-3 py-1 rounded"
              >
                <option value="date">Fecha</option>
                <option value="popularity">Popularidad</option>
                <option value="artist">Artista</option>
                <option value="category">Categoría</option>
              </select>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="text-white"
              >
                {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Filtros en tabs */}
        <Tabs defaultValue="filters" className="mt-6">
          <TabsList className="bg-black/50 border-gray-700">
            <TabsTrigger value="filters" className="urban-text text-white data-[state=active]:bg-red-600">
              <Filter className="h-4 w-4 mr-2" />
              FILTROS
            </TabsTrigger>
            <TabsTrigger value="tags" className="urban-text text-white data-[state=active]:bg-red-600">
              TAGS
            </TabsTrigger>
            <TabsTrigger value="stats" className="urban-text text-white data-[state=active]:bg-red-600">
              ESTADÍSTICAS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="filters" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Filtro por Artista */}
              <div>
                <label className="block text-gray-400 urban-text uppercase font-semibold mb-3">Artista</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedArtist("all")}
                    className={`filter-button ${selectedArtist === "all" ? "active" : "inactive"}`}
                  >
                    Todos ({portfolios.length})
                  </button>
                  {artists.map((artist) => {
                    const count = portfolios.filter((p) => p.artist_id === artist.id).length
                    return (
                      <button
                        key={artist.id}
                        onClick={() => setSelectedArtist(artist.id.toString())}
                        className={`filter-button ${selectedArtist === artist.id.toString() ? "active" : "inactive"}`}
                      >
                        {artist.name.split(" ")[0]} ({count})
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Filtro por Categoría */}
              <div>
                <label className="block text-gray-400 urban-text uppercase font-semibold mb-3">Estilo</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`filter-button ${selectedCategory === "all" ? "active" : "inactive"}`}
                  >
                    Todos
                  </button>
                  {categories.map((category) => {
                    const count = portfolios.filter((p) => p.category === category).length
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`filter-button ${selectedCategory === category ? "active" : "inactive"}`}
                      >
                        {category} ({count})
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tags" className="mt-4">
            <div>
              <label className="block text-gray-400 urban-text uppercase font-semibold mb-3">
                Tags Populares ({selectedTags.length} seleccionados)
              </label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {allTags.slice(0, 20).map((tag) => {
                  const count = portfolios.filter((p) => p.tags.includes(tag)).length
                  const isSelected = selectedTags.includes(tag)
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-xs urban-text font-semibold transition-all ${
                        isSelected
                          ? "bg-red-600 text-white"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      #{tag} ({count})
                    </button>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-500 urban-title">{filteredAndSortedPortfolios.length}</div>
                <div className="text-gray-400 urban-text text-sm uppercase">Resultados</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-500 urban-title">{categories.length}</div>
                <div className="text-gray-400 urban-text text-sm uppercase">Estilos</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-500 urban-title">{artists.length}</div>
                <div className="text-gray-400 urban-text text-sm uppercase">Artistas</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-500 urban-title">{favorites.length}</div>
                <div className="text-gray-400 urban-text text-sm uppercase">Favoritos</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Filtros activos y botón limpiar */}
        {(selectedArtist !== "all" || selectedCategory !== "all" || searchTerm !== "" || selectedTags.length > 0) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-gray-400 urban-text text-sm uppercase">Filtros activos:</span>
            {selectedArtist !== "all" && (
              <Badge className="bg-red-600/20 text-red-400 border border-red-600/50">
                Artista: {artists.find((a) => a.id.toString() === selectedArtist)?.name}
              </Badge>
            )}
            {selectedCategory !== "all" && (
              <Badge className="bg-red-600/20 text-red-400 border border-red-600/50">Estilo: {selectedCategory}</Badge>
            )}
            {searchTerm && (
              <Badge className="bg-red-600/20 text-red-400 border border-red-600/50">Búsqueda: {searchTerm}</Badge>
            )}
            {selectedTags.map((tag) => (
              <Badge key={tag} className="bg-red-600/20 text-red-400 border border-red-600/50">
                #{tag}
              </Badge>
            ))}
            <Button
              onClick={clearAllFilters}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <X className="h-3 w-3 mr-1" />
              Limpiar
            </Button>
          </div>
        )}
      </div>

      {/* Grid de resultados */}
      <div
        className={
          viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-6"
        }
      >
        {filteredAndSortedPortfolios.map((portfolio) => {
          const artist = artists.find((a) => a.id === portfolio.artist_id)
          const isFavorite = favorites.includes(portfolio.id)

          return (
            <Card
              key={portfolio.id}
              className={`bg-dark-800/80 border-2 border-gray-700/30 overflow-hidden hover:border-red-600/50 transition-all duration-300 group ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              {/* Imagen */}
              <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 h-32" : "h-80"}`}>
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

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Overlay con acciones */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-red-600/80 hover:bg-red-600 text-white">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => toggleFavorite(portfolio.id)}
                      className={`${
                        isFavorite ? "bg-red-600 text-white" : "bg-gray-700/80 text-white"
                      } hover:bg-red-600`}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                    </Button>
                    <Button size="sm" className="bg-gray-700/80 hover:bg-gray-700 text-white">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-gray-700/80 hover:bg-gray-700 text-white">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {portfolio.category && (
                    <Badge className="bg-red-600/90 text-white font-bold urban-text uppercase text-xs">
                      {portfolio.category}
                    </Badge>
                  )}
                  {isFavorite && (
                    <Badge className="bg-yellow-600/90 text-black font-bold urban-text uppercase text-xs">
                      <Heart className="h-3 w-3 mr-1 fill-current" />
                      FAV
                    </Badge>
                  )}
                </div>

                {/* Info del artista en overlay */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {artist && (
                    <div className="flex items-center gap-2 bg-black/80 rounded-lg p-2">
                      <div className="relative w-8 h-8">
                        <Image
                          src={portfolio.artist_image || "/placeholder.svg?height=32&width=32"}
                          alt={artist.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Link href={`/artistas/${artist.id}`} className="hover:text-red-300 transition-colors">
                          <p className="text-white text-xs urban-text font-semibold">{artist.name}</p>
                        </Link>
                        {portfolio.instagram_handle && (
                          <p className="text-red-400 text-xs urban-text">{portfolio.instagram_handle}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Eye className="h-3 w-3" />
                          {Math.floor(Math.random() * 500) + 100}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Heart className="h-3 w-3" />
                          {Math.floor(Math.random() * 50) + 10}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                {/* Título y descripción */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="urban-subtitle text-lg font-bold text-white uppercase flex-1">{portfolio.title}</h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm">4.{Math.floor(Math.random() * 9) + 1}</span>
                  </div>
                </div>

                {portfolio.description && (
                  <p className="text-gray-400 mb-4 text-sm urban-text leading-relaxed line-clamp-2">
                    {portfolio.description}
                  </p>
                )}

                {/* Especialidades del artista */}
                {portfolio.specialties && portfolio.specialties.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {portfolio.specialties.slice(0, 2).map((specialty) => (
                        <Badge
                          key={specialty}
                          className="bg-gray-800/50 text-gray-300 border border-gray-700 urban-text uppercase text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {portfolio.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-gray-600/50 text-gray-400 urban-text uppercase text-xs font-semibold cursor-pointer hover:border-red-600/50 hover:text-red-400"
                      onClick={() => toggleTag(tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                  {portfolio.tags.length > 3 && (
                    <Badge variant="outline" className="border-gray-600/50 text-gray-500 urban-text uppercase text-xs">
                      +{portfolio.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Metadata */}
                <div className="flex justify-between items-center text-xs text-gray-500 urban-text uppercase mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(portfolio.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Estudio
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  <Button
                    asChild
                    size="sm"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold urban-subtitle"
                  >
                    <Link href="/agendamiento">
                      <Calendar className="mr-2 h-4 w-4" />
                      AGENDAR
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-6xl w-full h-[90vh] bg-black border-red-900/30 p-0">
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  size="icon"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  onClick={() => navigateImage("next")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  size="icon"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Contador */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm urban-text">
                  {currentImageIndex + 1} / {filteredAndSortedPortfolios.length}
                </div>
              </div>

              {/* Panel de información */}
              <div className="w-80 bg-dark-900 p-6 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <h2 className="urban-subtitle text-xl font-bold text-white mb-2">{currentPortfolio.title}</h2>
                    {currentPortfolio.description && (
                      <p className="text-gray-400 urban-text leading-relaxed">{currentPortfolio.description}</p>
                    )}
                  </div>

                  {/* Info del artista */}
                  {currentPortfolio.artist_name && (
                    <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                      <div className="relative w-12 h-12">
                        <Image
                          src={currentPortfolio.artist_image || "/placeholder.svg?height=48&width=48"}
                          alt={currentPortfolio.artist_name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white font-semibold urban-text">{currentPortfolio.artist_name}</p>
                        {currentPortfolio.instagram_handle && (
                          <p className="text-red-400 text-sm urban-text">{currentPortfolio.instagram_handle}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div>
                    <h3 className="text-gray-400 urban-text uppercase font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentPortfolio.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-red-900/30 text-red-400 border border-red-800/50 urban-text uppercase text-xs"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Estadísticas */}
                  <div>
                    <h3 className="text-gray-400 urban-text uppercase font-semibold mb-2">Estadísticas</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/30 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-red-500 urban-title">
                          {Math.floor(Math.random() * 500) + 100}
                        </div>
                        <div className="text-gray-400 urban-text text-xs uppercase">Vistas</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-red-500 urban-title">
                          {Math.floor(Math.random() * 50) + 10}
                        </div>
                        <div className="text-gray-400 urban-text text-xs uppercase">Likes</div>
                      </div>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="space-y-3">
                    <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white font-bold urban-subtitle">
                      <Link href="/agendamiento">
                        <Calendar className="mr-2 h-4 w-4" />
                        AGENDAR CON ESTE ARTISTA
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      <Link href={`/artistas/${currentPortfolio.artist_id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        VER PERFIL COMPLETO
                      </Link>
                    </Button>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        onClick={() => toggleFavorite(currentPortfolio.id)}
                        variant="outline"
                        size="sm"
                        className={`${
                          favorites.includes(currentPortfolio.id)
                            ? "border-red-600 text-red-600"
                            : "border-gray-600 text-gray-400"
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${favorites.includes(currentPortfolio.id) ? "fill-current" : ""}`} />
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-400">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-400">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Mensaje si no hay resultados */}
      {filteredAndSortedPortfolios.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="urban-subtitle text-2xl text-white mb-4">No se encontraron trabajos</h3>
          <p className="urban-text text-gray-400 mb-6">Intenta cambiar los filtros o el término de búsqueda</p>
          <Button onClick={clearAllFilters} className="bg-red-600 hover:bg-red-700 text-white font-bold urban-subtitle">
            Limpiar Todos los Filtros
          </Button>
        </div>
      )}
    </div>
  )
}
