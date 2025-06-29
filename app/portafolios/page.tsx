import { mockPortfolios, mockArtists } from "@/lib/mock-data"
import { SimplePortfolioGrid } from "@/components/simple-portfolio-grid"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Palette } from "lucide-react"
import Link from "next/link"

export default function PortfoliosPage() {
  const totalWorks = mockPortfolios.length
  const totalArtists = mockArtists.length
  const categories = [...new Set(mockPortfolios.map((p) => p.category).filter(Boolean))]

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header mejorado y más limpio */}
        <div className="text-center mb-12">
          <Badge className="bg-red-600/20 text-red-400 border border-red-600/50 mb-6 px-4 py-2 uppercase font-semibold">
            <TrendingUp className="mr-2 h-4 w-4" />
            Galería Profesional
          </Badge>

          <h1 className="urban-title text-6xl md:text-7xl font-bold text-white mb-6 street-shadow">
            PORT<span className="text-red-600">FOLIOS</span>
          </h1>

          <p className="urban-text text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Explora nuestra colección completa de trabajos realizados. Cada pieza representa horas de dedicación y
            maestría artística de nuestro equipo de especialistas.
          </p>

          {/* Estadísticas principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="bg-dark-800/50 rounded-xl p-4 border border-red-900/20">
              <div className="text-2xl font-bold text-red-500 urban-title">{totalWorks}</div>
              <div className="text-gray-400 urban-text text-sm uppercase">Trabajos</div>
            </div>
            <div className="bg-dark-800/50 rounded-xl p-4 border border-red-900/20">
              <div className="text-2xl font-bold text-red-500 urban-title">{totalArtists}</div>
              <div className="text-gray-400 urban-text text-sm uppercase">Artistas</div>
            </div>
            <div className="bg-dark-800/50 rounded-xl p-4 border border-red-900/20">
              <div className="text-2xl font-bold text-red-500 urban-title">{categories.length}</div>
              <div className="text-gray-400 urban-text text-sm uppercase">Estilos</div>
            </div>
            <div className="bg-dark-800/50 rounded-xl p-4 border border-red-900/20">
              <div className="text-2xl font-bold text-red-500 urban-title">5.0</div>
              <div className="text-gray-400 urban-text text-sm uppercase">Rating</div>
            </div>
          </div>
        </div>

        {/* Grid simplificado */}
        <SimplePortfolioGrid portfolios={mockPortfolios} artists={mockArtists} />

        {/* CTA Section mejorado */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-red-900/20 via-black/40 to-red-900/20 rounded-2xl p-8 border border-red-900/30">
            <h2 className="urban-title text-4xl font-bold text-white mb-4 street-shadow">
              ¿ENCONTRASTE TU <span className="text-red-600">INSPIRACIÓN</span>?
            </h2>
            <p className="urban-text text-gray-400 mb-6 max-w-2xl mx-auto">
              Cada tatuaje en nuestra galería representa horas de dedicación y maestría artística. Agenda una consulta
              personalizada para discutir tu visión.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-bold urban-subtitle px-8 py-3"
              >
                <Link href="/agendamiento">
                  <Users className="mr-2 h-5 w-5" />
                  AGENDA CONSULTA GRATUITA
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white font-bold urban-subtitle px-8 py-3"
              >
                <Link href="/galeria">
                  <Palette className="mr-2 h-5 w-5" />
                  VER GALERÍA COMPLETA
                </Link>
              </Button>
            </div>

            {/* Testimonial rápido */}
            <div className="bg-black/30 rounded-xl p-6 max-w-xl mx-auto mt-8 border border-gray-800/50">
              <div className="flex items-center justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 text-red-500 fill-current">
                    ⭐
                  </div>
                ))}
              </div>
              <p className="text-gray-300 italic urban-text text-sm">
                "La calidad del trabajo y la atención al detalle superaron todas mis expectativas. Definitivamente el
                mejor estudio de la ciudad."
              </p>
              <p className="text-red-400 urban-text font-semibold mt-2 text-sm">- Cliente Verificado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
