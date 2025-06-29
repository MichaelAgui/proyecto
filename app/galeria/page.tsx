import { mockGallery } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function GaleriaPage() {
  const galleryItems = mockGallery
  const categories = [...new Set(galleryItems.map((item) => item.category).filter(Boolean))]
  const featuredItems = galleryItems.filter((item) => item.featured)
  const regularItems = galleryItems.filter((item) => !item.featured)

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Galería de Arte</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre la increíble variedad de estilos y técnicas de nuestros artistas. Cada pieza representa horas de
            dedicación y pasión por el arte del tatuaje.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
            <Filter className="mr-2 h-4 w-4" />
            Todos
          </Button>
          {categories.map((category) => (
            <Button key={category} variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-700">
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Section */}
        {featuredItems.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Trabajos Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredItems.map((item) => (
                <Card
                  key={item.id}
                  className="bg-slate-800/80 border-slate-700 overflow-hidden hover:scale-105 transition-all duration-300 group"
                >
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.title || "Tattoo artwork"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-yellow-500/90 text-black font-semibold">Destacado</Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="p-6">
                    {item.title && <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>}
                    {item.description && <p className="text-gray-400 mb-3 text-sm">{item.description}</p>}
                    {item.artist_name && <p className="text-purple-400 font-medium mb-3">por {item.artist_name}</p>}
                    <div className="flex flex-wrap gap-2">
                      {item.category && (
                        <Badge className="bg-purple-600/20 text-purple-300 border-purple-600/30">{item.category}</Badge>
                      )}
                      {item.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="border-slate-600 text-gray-300 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {regularItems.map((item) => (
            <Card
              key={item.id}
              className="bg-slate-800/80 border-slate-700 overflow-hidden hover:scale-105 transition-all duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.title || "Tattoo artwork"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="p-4">
                {item.title && <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>}
                {item.artist_name && <p className="text-purple-400 text-sm mb-2">por {item.artist_name}</p>}
                <div className="flex flex-wrap gap-1">
                  {item.category && (
                    <Badge className="bg-purple-600/20 text-purple-300 border-purple-600/30 text-xs">
                      {item.category}
                    </Badge>
                  )}
                  {item.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="border-slate-600 text-gray-300 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">¿Te Gustó lo que Viste?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Cada tatuaje en nuestra galería comenzó como una idea. Permítenos ayudarte a convertir tu visión en una obra
            de arte permanente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
              <Link href="/agendamiento">
                <Calendar className="mr-2 h-5 w-5" />
                Agenda tu Consulta
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-900"
            >
              <Link href="/portafolios">Ver Portafolios</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
