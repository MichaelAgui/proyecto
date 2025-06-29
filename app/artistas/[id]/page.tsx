import { notFound } from "next/navigation"
import { mockArtists, mockPortfolios } from "@/lib/mock-data"
import { ArtistPortfolio } from "@/components/artist-portfolio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Instagram, Mail, Phone, Star, Award, Clock, MapPin, Users, Palette, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ArtistPageProps {
  params: {
    id: string
  }
}

export default function ArtistPage({ params }: ArtistPageProps) {
  const artistId = Number.parseInt(params.id)
  const artist = mockArtists.find((a) => a.id === artistId)

  if (!artist) {
    notFound()
  }

  const artistPortfolios = mockPortfolios.filter((p) => p.artist_id === artistId)
  const totalWorks = artistPortfolios.length
  const categories = [...new Set(artistPortfolios.map((p) => p.category).filter(Boolean))]

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Botón de regreso */}
        <div className="mb-8">
          <Button asChild variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
            <Link href="/portafolios">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Portafolios
            </Link>
          </Button>
        </div>

        {/* Header del Artista */}
        <div className="mb-12">
          <Card className="bg-black border-2 border-red-600/30 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                {/* Banner de fondo */}
                <div className="h-48 bg-gradient-to-r from-red-900/20 via-black to-red-900/20"></div>

                {/* Contenido del perfil */}
                <div className="relative px-8 pb-8">
                  {/* Foto de perfil */}
                  <div className="absolute -top-16 left-8">
                    <div className="relative w-32 h-32 rounded-full border-4 border-red-600 overflow-hidden bg-black">
                      <Image
                        src={artist.image_url || "/placeholder.svg?height=128&width=128"}
                        alt={artist.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Información principal */}
                  <div className="pt-20">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <h1 className="urban-title text-4xl md:text-5xl font-bold text-white mb-4 street-shadow">
                          {artist.name.toUpperCase()}
                        </h1>

                        {artist.bio && (
                          <p className="urban-text text-lg text-red-400 mb-6 leading-relaxed max-w-3xl">{artist.bio}</p>
                        )}

                        {/* Especialidades */}
                        <div className="mb-6">
                          <h3 className="urban-text text-red-400 font-semibold mb-3 uppercase">Especialidades</h3>
                          <div className="flex flex-wrap gap-2">
                            {artist.specialties.map((specialty) => (
                              <Badge
                                key={specialty}
                                className="bg-red-600/20 text-red-400 border border-red-600/50 urban-text uppercase font-semibold"
                              >
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Contacto */}
                        <div className="flex flex-wrap gap-4">
                          {artist.email && (
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                            >
                              <a href={`mailto:${artist.email}`}>
                                <Mail className="mr-2 h-4 w-4" />
                                Email
                              </a>
                            </Button>
                          )}
                          {artist.phone && (
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                            >
                              <a href={`tel:${artist.phone}`}>
                                <Phone className="mr-2 h-4 w-4" />
                                Llamar
                              </a>
                            </Button>
                          )}
                          {artist.instagram_handle && (
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                            >
                              <a
                                href={`https://instagram.com/${artist.instagram_handle}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Instagram className="mr-2 h-4 w-4" />@{artist.instagram_handle}
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Estadísticas */}
                      <div className="lg:w-80">
                        <div className="grid grid-cols-2 gap-4">
                          <Card className="bg-black border border-red-600/30 text-center p-4">
                            <div className="text-2xl font-bold text-red-500 urban-title">{totalWorks}</div>
                            <div className="text-red-400 urban-text text-sm uppercase">Trabajos</div>
                          </Card>
                          <Card className="bg-black border border-red-600/30 text-center p-4">
                            <div className="text-2xl font-bold text-red-500 urban-title">
                              {artist.years_experience || 5}+
                            </div>
                            <div className="text-red-400 urban-text text-sm uppercase">Años</div>
                          </Card>
                          <Card className="bg-black border border-red-600/30 text-center p-4">
                            <div className="flex items-center justify-center gap-1 text-red-500">
                              <Star className="h-5 w-5 fill-current" />
                              <span className="text-2xl font-bold urban-title">5.0</span>
                            </div>
                            <div className="text-red-400 urban-text text-sm uppercase">Rating</div>
                          </Card>
                          <Card className="bg-black border border-red-600/30 text-center p-4">
                            <div className="text-2xl font-bold text-red-500 urban-title">{categories.length}</div>
                            <div className="text-red-400 urban-text text-sm uppercase">Estilos</div>
                          </Card>
                        </div>

                        {/* Botón de agendar */}
                        <Button
                          asChild
                          size="lg"
                          className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold urban-subtitle py-3"
                        >
                          <Link href={`/agendamiento?artist=${artistId}`}>
                            <Calendar className="mr-2 h-5 w-5" />
                            AGENDAR CON {artist.name.split(" ")[0].toUpperCase()}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Información adicional */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Experiencia */}
          <Card className="bg-black border border-red-600/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center">
                  <Award className="h-5 w-5 text-red-400" />
                </div>
                <h3 className="urban-text text-white font-semibold uppercase">Experiencia</h3>
              </div>
              <p className="urban-text text-red-400 text-sm leading-relaxed">
                {artist.years_experience || 5}+ años de experiencia en el arte del tatuaje, especializado en{" "}
                {artist.specialties.join(", ").toLowerCase()}.
              </p>
            </CardContent>
          </Card>

          {/* Horarios */}
          <Card className="bg-black border border-red-600/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-red-400" />
                </div>
                <h3 className="urban-text text-white font-semibold uppercase">Horarios</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-red-400">Lun - Vie:</span>
                  <span className="text-white">10:00 - 19:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-400">Sábados:</span>
                  <span className="text-white">10:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-400">Domingos:</span>
                  <span className="text-white">Cerrado</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ubicación */}
          <Card className="bg-black border border-red-600/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-red-400" />
                </div>
                <h3 className="urban-text text-white font-semibold uppercase">Ubicación</h3>
              </div>
              <p className="urban-text text-red-400 text-sm leading-relaxed">
                Estudio InSkpire
                <br />
                Calle Principal #123
                <br />
                Ciudad, País
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Portafolio del Artista */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="urban-title text-3xl md:text-4xl font-bold text-white mb-2 street-shadow">
                PORTAFOLIO DE <span className="text-red-600">{artist.name.split(" ")[0].toUpperCase()}</span>
              </h2>
              <p className="urban-text text-red-400">
                {totalWorks} trabajos realizados • {categories.length} estilos diferentes
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-red-400" />
              <span className="urban-text text-red-400 text-sm">
                {Math.floor(Math.random() * 500) + 200}+ clientes satisfechos
              </span>
            </div>
          </div>

          {artistPortfolios.length > 0 ? (
            <ArtistPortfolio portfolios={artistPortfolios} artist={artist} />
          ) : (
            <Card className="bg-black border border-red-600/30 text-center py-16">
              <CardContent>
                <Palette className="h-16 w-16 text-red-400 mx-auto mb-4" />
                <h3 className="urban-subtitle text-xl text-white mb-2">Portafolio en Construcción</h3>
                <p className="urban-text text-red-400 mb-6">
                  {artist.name} está preparando su portafolio. ¡Pronto podrás ver sus increíbles trabajos!
                </p>
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-bold urban-subtitle">
                  <Link href={`/agendamiento?artist=${artistId}`}>
                    <Calendar className="mr-2 h-4 w-4" />
                    AGENDA UNA CONSULTA
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* CTA Final */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-red-900/20 via-black to-red-900/20 border border-red-600/30">
            <CardContent className="p-8">
              <h3 className="urban-title text-3xl font-bold text-white mb-4 street-shadow">
                ¿LISTO PARA TU <span className="text-red-600">PRÓXIMO TATUAJE</span>?
              </h3>
              <p className="urban-text text-red-400 mb-6 max-w-2xl mx-auto">
                Agenda una consulta gratuita con {artist.name} para discutir tu idea y crear algo único juntos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold urban-subtitle px-8"
                >
                  <Link href={`/agendamiento?artist=${artistId}`}>
                    <Calendar className="mr-2 h-5 w-5" />
                    AGENDAR CONSULTA GRATUITA
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white font-bold urban-subtitle px-8"
                >
                  <Link href="/portafolios">
                    <Palette className="mr-2 h-5 w-5" />
                    VER OTROS ARTISTAS
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
