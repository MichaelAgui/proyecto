import { mockArtists, mockTestimonials } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Instagram, Calendar, Award, Users, Heart, Shield, Palette } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function QuienesSomosPage() {
  const artists = mockArtists
  const testimonials = mockTestimonials.slice(0, 6)

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Quiénes Somos</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Somos un colectivo de artistas apasionados por transformar la piel en lienzo. En Inskpire, cada trazo
              cuenta una historia y cada diseño refleja la esencia única de quien lo lleva.
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Fundado en 2018, Inskpire nació de la visión de crear un espacio donde el arte del tatuaje pudiera
                  florecer sin límites. Comenzamos como un pequeño estudio con grandes sueños y la determinación de
                  elevar los estándares de calidad en la industria.
                </p>
                <p>
                  Hoy, somos reconocidos como uno de los estudios más prestigiosos de la región, con artistas
                  especializados en una amplia gama de estilos y técnicas. Nuestro compromiso con la excelencia y la
                  innovación nos ha permitido crear miles de obras únicas.
                </p>
                <p>
                  Cada día trabajamos para inspirar y ser inspirados, creando no solo tatuajes, sino experiencias
                  memorables que nuestros clientes atesorarán para toda la vida.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/Mandala.jpg?height=400&width=600"
                alt="Inskpire Studio Interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Nuestros Valores</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Los principios que guían cada decisión y cada trazo en nuestro estudio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-slate-800/80 border-slate-700 text-center">
              <CardContent className="p-6">
                <Palette className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Creatividad</h3>
                <p className="text-gray-400">
                  Cada diseño es único y personalizado, reflejando la visión artística y los deseos del cliente.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/80 border-slate-700 text-center">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Seguridad</h3>
                <p className="text-gray-400">
                  Seguimos los más altos estándares de higiene y seguridad para garantizar tu bienestar.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/80 border-slate-700 text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Excelencia</h3>
                <p className="text-gray-400">
                  Nos esforzamos por superar las expectativas en cada proyecto que emprendemos.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/80 border-slate-700 text-center">
              <CardContent className="p-6">
                <Heart className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Pasión</h3>
                <p className="text-gray-400">El amor por nuestro arte se refleja en cada detalle de nuestro trabajo.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nuestro Equipo */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Conoce a Nuestro Equipo</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Artistas talentosos con años de experiencia y pasión por crear arte excepcional
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artists.map((artist) => (
              <Card
                key={artist.id}
                className="bg-slate-800/80 border-slate-700 hover:bg-slate-700/80 transition-all duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className="relative w-40 h-40 mx-auto mb-6">
                    <Image
                      src={artist.image_url || "/placeholder.svg?height=160&width=160"}
                      alt={artist.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{artist.name}</h3>
                  <p className="text-purple-400 font-medium mb-4">{artist.years_experience} años de experiencia</p>
                  <p className="text-gray-300 mb-6 text-sm leading-relaxed">{artist.bio}</p>

                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {artist.specialties.map((specialty) => (
                      <Badge key={specialty} className="bg-purple-600/20 text-purple-300 border-purple-600/30">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    {artist.instagram_handle && (
                      <Link
                        href={`https://instagram.com/${artist.instagram_handle.replace("@", "")}`}
                        className="flex items-center justify-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <Instagram className="h-4 w-4" />
                        {artist.instagram_handle}
                      </Link>
                    )}
                    <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Link href="/agendamiento">
                        <Calendar className="mr-2 h-4 w-4" />
                        Agendar con {artist.name.split(" ")[0]}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Lo que Dicen Nuestros Clientes</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Las experiencias reales de quienes confiaron en nosotros para crear su arte corporal
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-slate-800/80 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic leading-relaxed">"{testimonial.comment}"</p>
                  <div className="border-t border-slate-700 pt-4">
                    <div className="text-white font-semibold">{testimonial.client_name}</div>
                    {testimonial.artist_name && (
                      <div className="text-sm text-purple-400">Cliente de {testimonial.artist_name}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <Users className="h-16 w-16 mx-auto mb-4 text-purple-300" />
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-gray-200">Clientes Satisfechos</div>
            </div>
            <div>
              <Palette className="h-16 w-16 mx-auto mb-4 text-purple-300" />
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-gray-200">Tatuajes Realizados</div>
            </div>
            <div>
              <Award className="h-16 w-16 mx-auto mb-4 text-purple-300" />
              <div className="text-4xl font-bold mb-2">6</div>
              <div className="text-gray-200">Años de Experiencia</div>
            </div>
            <div>
              <Star className="h-16 w-16 mx-auto mb-4 text-purple-300" />
              <div className="text-4xl font-bold mb-2">5.0</div>
              <div className="text-gray-200">Calificación Promedio</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">¿Listo para Formar Parte de Nuestra Historia?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a los cientos de clientes que han confiado en nosotros para crear su arte corporal. Tu historia
            comienza con una consulta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 px-8 py-3">
              <Link href="/agendamiento">
                <Calendar className="mr-2 h-5 w-5" />
                Agenda tu Consulta Gratuita
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3"
            >
              <Link href="/portafolios">Explora Nuestro Trabajo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
