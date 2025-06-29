"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/loading-spinner"
import { InteractiveCard } from "@/components/interactive-card"
import { AnimatedCounter } from "@/components/animated-counter"
import { ProgressBar } from "@/components/progress-bar"
import { Search, Filter, X, Zap } from "lucide-react"
import type { Portfolio } from "@/lib/types"

interface SimplePortfolioGridProps {
  portfolios: (Portfolio & {
    artist_name?: string
    price_range?: string
    duration_hours?: number
    difficulty?: string
    body_part?: string
    size?: string
  })[]
  artists: Array<{ id: number; name: string }>
}

export function SimplePortfolioGrid({ portfolios, artists }: SimplePortfolioGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedArtist, setSelectedArtist] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSize, setSelectedSize] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [likedItems, setLikedItems] = useState<number[]>([])
  const [loadingProgress, setLoadingProgress] = useState(0)

  const categories = [...new Set(portfolios.map((p) => p.category).filter(Boolean))]
  const sizes = [...new Set(portfolios.map((p) => p.size).filter(Boolean))]

  const filteredPortfolios = useMemo(() => {
    setIsLoading(true)

    // Simular loading
    setTimeout(() => {
      setIsLoading(false)
      setLoadingProgress(100)
    }, 800)

    return portfolios.filter((portfolio) => {
      const matchesSearch =
        searchTerm === "" ||
        portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesArtist = selectedArtist === "all" || portfolio.artist_id.toString() === selectedArtist
      const matchesCategory = selectedCategory === "all" || portfolio.category === selectedCategory
      const matchesSize = selectedSize === "all" || portfolio.size === selectedSize

      return matchesSearch && matchesArtist && matchesCategory && matchesSize
    })
  }, [portfolios, searchTerm, selectedArtist, selectedCategory, selectedSize])

  const clearFilters = () => {
    setSelectedArtist("all")
    setSelectedCategory("all")
    setSelectedSize("all")
    setSearchTerm("")
    setLoadingProgress(0)
  }

  const handleLike = (id: number) => {
    setLikedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const hasActiveFilters =
    selectedArtist !== "all" || selectedCategory !== "all" || selectedSize !== "all" || searchTerm !== ""

  return (
    <div className="space-y-8">
      {/* Header con búsqueda interactiva */}
      <div className="bg-dark-800/50 rounded-xl p-6 border border-red-900/20 hover-glow transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Búsqueda */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 cursor-help" />
            <Input
              type="text"
              placeholder="Buscar trabajos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-gray-700 text-white placeholder-gray-500 cursor-text hover:border-red-600/50 transition-all duration-300"
            />
          </div>

          {/* Botón de filtros interactivo */}
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-red-600 transition-all duration-300 cursor-pointer hover-scale"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filtros
            {hasActiveFilters && (
              <Badge className="ml-2 bg-red-600 text-white text-xs bounce-in">
                {
                  [
                    selectedArtist !== "all",
                    selectedCategory !== "all",
                    selectedSize !== "all",
                    searchTerm !== "",
                  ].filter(Boolean).length
                }
              </Badge>
            )}
          </Button>

          {/* Resultados con contador animado */}
          <div className="text-gray-400 text-sm">
            <AnimatedCounter end={filteredPortfolios.length} /> de <AnimatedCounter end={portfolios.length} /> trabajos
          </div>
        </div>

        {/* Barra de progreso de filtrado */}
        {isLoading && (
          <div className="mt-4">
            <ProgressBar value={loadingProgress} label="Filtrando trabajos" animated={true} color="red" />
          </div>
        )}

        {/* Filtros expandibles con animación */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-700 slide-up">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Artista */}
              <div>
                <label className="block text-gray-400 text-sm mb-2 cursor-help">Artista</label>
                <select
                  value={selectedArtist}
                  onChange={(e) => setSelectedArtist(e.target.value)}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm cursor-pointer hover:border-red-600/50 transition-all duration-300"
                >
                  <option value="all">Todos</option>
                  {artists.map((artist) => (
                    <option key={artist.id} value={artist.id.toString()}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Categoría */}
              <div>
                <label className="block text-gray-400 text-sm mb-2 cursor-help">Estilo</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm cursor-pointer hover:border-red-600/50 transition-all duration-300"
                >
                  <option value="all">Todos</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tamaño */}
              <div>
                <label className="block text-gray-400 text-sm mb-2 cursor-help">Tamaño</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm cursor-pointer hover:border-red-600/50 transition-all duration-300"
                >
                  <option value="all">Todos</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Limpiar */}
              <div className="flex items-end">
                {hasActiveFilters && (
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-600 text-gray-400 hover:bg-gray-800 hover:border-red-600 transition-all duration-300 cursor-pointer hover-scale"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Limpiar
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center py-16">
          <LoadingSpinner size="lg" showProgress={true} duration={800} />
        </div>
      )}

      {/* Grid de trabajos interactivo */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPortfolios.map((portfolio, index) => (
            <div key={portfolio.id} className="slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <InteractiveCard
                id={portfolio.id}
                title={portfolio.title}
                artist_name={portfolio.artist_name}
                image_url={portfolio.image_url}
                category={portfolio.category}
                price_range={portfolio.price_range}
                duration_hours={portfolio.duration_hours}
                difficulty={portfolio.difficulty}
                tags={portfolio.tags}
                onLike={handleLike}
                isLiked={likedItems.includes(portfolio.id)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Mensaje si no hay resultados */}
      {!isLoading && filteredPortfolios.length === 0 && (
        <div className="text-center py-16 bounce-in">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-2xl font-bold text-white mb-4">No se encontraron trabajos</h3>
          <p className="text-gray-400 mb-6">Intenta cambiar los filtros o el término de búsqueda</p>
          <Button
            onClick={clearFilters}
            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer hover-scale btn-interactive"
          >
            <Zap className="mr-2 h-4 w-4" />
            Limpiar Filtros
          </Button>
        </div>
      )}

      {/* Estadísticas interactivas */}
      {!isLoading && filteredPortfolios.length > 0 && (
        <div className="bg-dark-800/30 rounded-xl p-6 border border-gray-700/30 hover-glow transition-all duration-300">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="cursor-help hover-scale transition-transform duration-300">
              <div className="text-2xl font-bold text-red-500">
                <AnimatedCounter end={filteredPortfolios.length} />
              </div>
              <div className="text-gray-400 text-sm">Trabajos Mostrados</div>
              <ProgressBar
                value={(filteredPortfolios.length / portfolios.length) * 100}
                size="sm"
                showPercentage={false}
                color="red"
              />
            </div>
            <div className="cursor-help hover-scale transition-transform duration-300">
              <div className="text-2xl font-bold text-red-500">
                <AnimatedCounter end={[...new Set(filteredPortfolios.map((p) => p.artist_id))].length} />
              </div>
              <div className="text-gray-400 text-sm">Artistas</div>
              <ProgressBar
                value={([...new Set(filteredPortfolios.map((p) => p.artist_id))].length / artists.length) * 100}
                size="sm"
                showPercentage={false}
                color="green"
              />
            </div>
            <div className="cursor-help hover-scale transition-transform duration-300">
              <div className="text-2xl font-bold text-red-500">
                <AnimatedCounter end={[...new Set(filteredPortfolios.map((p) => p.category))].length} />
              </div>
              <div className="text-gray-400 text-sm">Estilos</div>
              <ProgressBar
                value={([...new Set(filteredPortfolios.map((p) => p.category))].length / categories.length) * 100}
                size="sm"
                showPercentage={false}
                color="blue"
              />
            </div>
            <div className="cursor-help hover-scale transition-transform duration-300">
              <div className="text-2xl font-bold text-red-500">
                <AnimatedCounter end={5} suffix=".0" />
              </div>
              <div className="text-gray-400 text-sm">Rating Promedio</div>
              <ProgressBar value={100} size="sm" showPercentage={false} color="yellow" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
