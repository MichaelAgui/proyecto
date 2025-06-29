import { mockArtists, mockGallery, mockTestimonials, mockPortfolios } from "@/lib/mock-data"
import { FadeInSection, SlideInLeft, ScaleIn } from "@/components/page-transition"
import { BlogSection } from "@/components/blog-section"
import { FAQSection } from "@/components/faq-section"
import { AnimatedCounter } from "@/components/animated-counter"
import { TypingText } from "@/components/typing-text"
import { ProgressBar } from "@/components/progress-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Calendar,
  Users,
  Award,
  Palette,
  Zap,
  ArrowRight,
  Eye,
  TrendingUp,
  Clock,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const artists = mockArtists
  const gallery = mockGallery.filter((item) => item.featured).slice(0, 6)
  const testimonials = mockTestimonials.filter((t) => t.featured).slice(0, 3)
  const recentWorks = mockPortfolios.slice(0, 8)
  const featuredWorks = mockPortfolios
    .filter((work) => work.category === "Realismo" || work.category === "Japonés" || work.category === "Blackwork")
    .slice(0, 6)

  const typingTexts = ["ARTE URBANO EN TU PIEL", "CULTURA DE LA CALLE", "EXPRESIÓN PERSONAL", "ARTE QUE PERDURA"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-dark-900 to-steel-950">
      {/* Hero Section Súper Interactivo */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden cursor-crosshair">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Inskpire Studio"
            fill
            className="object-cover hover-scale transition-transform duration-700"
            priority
          />
        </div>

        <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
          <FadeInSection>
            <h1 className="urban-title text-7xl md:text-8xl lg:text-9xl font-bold mb-6 text-white street-shadow text-glow hover-lift cursor-pointer">
              INS<span className="text-red-600 text-gradient">K</span>PIRE
            </h1>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="urban-subtitle text-xl md:text-3xl mb-8 text-red-500 street-shadow min-h-[3rem]">
              <TypingText
                texts={typingTexts}
                speed={150}
                deleteSpeed={100}
                pauseDuration={2000}
                className="text-gradient"
              />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.4}>
            <p className="urban-text text-lg md:text-xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Estudio de tatuajes donde la cultura de la calle se encuentra con el arte. Con más de{" "}
              <span className="text-red-400 font-bold cursor-help hover:text-red-300 transition-colors">
                <AnimatedCounter end={mockPortfolios.length} /> trabajos realizados
              </span>{" "}
              y{" "}
              <span className="text-red-400 font-bold cursor-help hover:text-red-300 transition-colors">
                <AnimatedCounter end={artists.length} /> artistas especializados
              </span>
              .
            </p>
          </FadeInSection>

          <FadeInSection delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-xl font-bold urban-subtitle btn-interactive pulse-red"
              >
                <Link href="/agendamiento">
                  <Zap className="mr-2 h-6 w-6" />
                  AGENDA AHORA
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-gray-400 text-gray-300 hover:bg-gray-800 hover:text-white px-12 py-6 text-xl font-bold urban-subtitle btn-interactive"
              >
                <Link href="/portafolios">
                  VER <AnimatedCounter end={mockPortfolios.length} />+ TRABAJOS
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </div>
          </FadeInSection>

          {/* Indicadores de confianza interactivos */}
          <FadeInSection delay={0.8}>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2 cursor-help hover:text-green-400 transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Disponible hoy</span>
              </div>
              <div className="flex items-center gap-2 cursor-help hover:text-yellow-400 transition-colors">
                <Star className="h-4 w-4 text-yellow-500 fill-current hover-rotate" />
                <span>
                  5.0 estrellas (<AnimatedCounter end={200} />+ reviews)
                </span>
              </div>
              <div className="flex items-center gap-2 cursor-help hover:text-red-400 transition-colors">
                <Award className="h-4 w-4 text-red-500 hover-scale" />
                <span>
                  <AnimatedCounter end={6} />+ años de experiencia
                </span>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Stats Section Súper Interactivo */}
      <section className="py-20 bg-dark-900/50">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <ScaleIn delay={0.1}>
                <div className="group card-interactive p-6 rounded-xl bg-dark-800/30 border border-gray-700/50">
                  <Users className="h-16 w-16 mx-auto mb-4 text-red-600 hover-scale cursor-pointer" />
                  <div className="urban-title text-4xl font-bold mb-2 text-gray-200">
                    <AnimatedCounter end={500} suffix="+" />
                  </div>
                  <div className="urban-text text-gray-400 uppercase tracking-wide">Clientes Satisfechos</div>
                  <ProgressBar value={85} size="sm" showPercentage={false} color="green" />
                </div>
              </ScaleIn>

              <ScaleIn delay={0.2}>
                <div className="group card-interactive p-6 rounded-xl bg-dark-800/30 border border-gray-700/50">
                  <Palette className="h-16 w-16 mx-auto mb-4 text-red-600 hover-scale cursor-pointer" />
                  <div className="urban-title text-4xl font-bold mb-2 text-gray-200">
                    <AnimatedCounter end={mockPortfolios.length} suffix="+" />
                  </div>
                  <div className="urban-text text-gray-400 uppercase tracking-wide">Obras Realizadas</div>
                  <ProgressBar value={92} size="sm" showPercentage={false} color="blue" />
                </div>
              </ScaleIn>

              <ScaleIn delay={0.3}>
                <div className="group card-interactive p-6 rounded-xl bg-dark-800/30 border border-gray-700/50">
                  <Award className="h-16 w-16 mx-auto mb-4 text-red-600 hover-scale cursor-pointer" />
                  <div className="urban-title text-4xl font-bold mb-2 text-gray-200">
                    <AnimatedCounter end={artists.length} />
                  </div>
                  <div className="urban-text text-gray-400 uppercase tracking-wide">Artistas Expertos</div>
                  <ProgressBar value={100} size="sm" showPercentage={false} color="yellow" />
                </div>
              </ScaleIn>

              <ScaleIn delay={0.4}>
                <div className="group card-interactive p-6 rounded-xl bg-dark-800/30 border border-gray-700/50">
                  <Star className="h-16 w-16 mx-auto mb-4 text-red-600 hover-scale cursor-pointer" />
                  <div className="urban-title text-4xl font-bold mb-2 text-gray-200">
                    <AnimatedCounter end={5} suffix=".0" />
                  </div>
                  <div className="urban-text text-gray-400 uppercase tracking-wide">Rating Promedio</div>
                  <ProgressBar value={100} size="sm" showPercentage={false} color="red" />
                </div>
              </ScaleIn>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Featured Works Section Interactivo */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="text-center mb-16">
              <Badge className="bg-red-600/20 text-red-400 border border-red-600/50 mb-6 px-4 py-2 urban-text uppercase cursor-help hover-glow">
                <TrendingUp className="mr-2 h-4 w-4" />
                TRABAJOS DESTACADOS
              </Badge>
              <h2 className="urban-title text-5xl md:text-6xl font-bold text-white mb-4 street-shadow text-glow cursor-pointer hover-lift">
                OBRAS <span className="text-red-600 text-gradient">MAESTRAS</span>
              </h2>
              <p className="urban-text text-lg text-gray-400 max-w-3xl mx-auto">
                Descubre algunos de nuestros trabajos más impresionantes y la diversidad de estilos que dominamos
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWorks.map((work, index) => (
              <ScaleIn key={work.id} delay={0.1 + index * 0.1}>
                <Card className="bg-dark-800/80 border border-gray-700/50 overflow-hidden card-interactive group">
                  <div className="relative h-80 overflow-hidden cursor-zoom-in">
                    <Image
                      src={work.image_url || "/placeholder.svg"}
                      alt={work.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-600/90 text-white font-bold urban-text uppercase text-xs animate-pulse cursor-help">
                        {work.category}
                      </Badge>
                    </div>

                    {work.difficulty && (
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant="outline"
                          className={`text-xs border transition-all duration-300 cursor-help hover-scale ${
                            work.difficulty === "Fácil"
                              ? "border-green-500 text-green-400 hover:bg-green-500/10"
                              : work.difficulty === "Medio"
                                ? "border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
                                : work.difficulty === "Difícil"
                                  ? "border-orange-500 text-orange-400 hover:bg-orange-500/10"
                                  : "border-red-500 text-red-400 hover:bg-red-500/10"
                          }`}
                        >
                          {work.difficulty}
                        </Badge>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-bold urban-text mb-2 text-lg cursor-pointer hover:text-red-400 transition-colors">
                        {work.title}
                      </h3>
                      {work.artist_name && (
                        <p className="text-red-400 urban-text text-sm mb-2 cursor-pointer hover:text-red-300 transition-colors">
                          por {work.artist_name}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-white text-sm">
                        {work.duration_hours && (
                          <div className="flex items-center gap-1 bg-black/50 rounded px-2 py-1 cursor-help hover:bg-black/70 transition-colors">
                            <Clock className="h-3 w-3" />
                            {work.duration_hours}h
                          </div>
                        )}
                        {work.price_range && (
                          <div className="flex items-center gap-1 bg-black/50 rounded px-2 py-1 cursor-help hover:bg-black/70 transition-colors">
                            <DollarSign className="h-3 w-3" />
                            {work.price_range}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </ScaleIn>
            ))}
          </div>

          <FadeInSection delay={0.8}>
            <div className="text-center mt-12">
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-bold urban-subtitle px-10 py-4 btn-interactive pulse-red"
              >
                <Link href="/portafolios">
                  <Eye className="mr-2 h-5 w-5" />
                  VER TODOS LOS TRABAJOS (<AnimatedCounter end={mockPortfolios.length} />)
                </Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Artists Section Compacto e Interactivo */}
      <section className="py-20 bg-gradient-to-r from-dark-900 to-black">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="urban-title text-5xl md:text-6xl font-bold text-white mb-4 street-shadow text-glow cursor-pointer hover-lift">
                NUESTROS <span className="text-red-600 text-gradient">ARTISTAS</span>
              </h2>
              <p className="urban-text text-lg text-gray-400 max-w-2xl mx-auto">
                Maestros especializados en diferentes estilos y técnicas
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {artists.map((artist, index) => (
              <ScaleIn key={artist.id} delay={0.1 + index * 0.1}>
                <Card className="bg-dark-800/80 border border-red-900/30 card-interactive group overflow-hidden">
                  <CardContent className="p-4 text-center">
                    <div className="relative w-20 h-20 mx-auto mb-3 cursor-pointer">
                      <Image
                        src={artist.image_url || "/placeholder.svg?height=80&width=80"}
                        alt={artist.name}
                        fill
                        className="rounded-full object-cover border-2 border-gray-600 group-hover:border-red-600 transition-colors hover-scale"
                      />
                    </div>
                    <h3 className="urban-subtitle text-sm font-bold text-white mb-1 uppercase cursor-pointer hover:text-red-400 transition-colors">
                      {artist.name.split(" ")[0]}
                    </h3>
                    <p className="text-red-500 urban-text font-semibold mb-2 text-xs cursor-help">
                      <AnimatedCounter end ={artist.years_experience} /> años
                    </p>
                    <div className="text-xs text-gray-400 mb-3 cursor-help">{artist.specialties[0]}</div>
                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-1 btn-interactive"
                    >
                      <Link href="/portafolios">Ver Trabajos</Link>
                    </Button>
                  </CardContent>
                </Card>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Mejorado e Interactivo */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="urban-title text-5xl md:text-6xl font-bold text-white mb-4 street-shadow text-glow cursor-pointer hover-lift">
                TESTIMONIOS <span className="text-red-600 text-gradient">REALES</span>
              </h2>
              <p className="urban-text text-lg text-gray-400 max-w-2xl mx-auto">
                La experiencia de nuestros clientes habla por sí sola
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <SlideInLeft key={testimonial.id} delay={0.2 + index * 0.1}>
                <Card className="bg-dark-800/80 border border-gray-700/50 card-interactive h-full group">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 cursor-pointer hover-scale transition-transform duration-200 ${
                            i < testimonial.rating ? "text-red-500 fill-current" : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 italic leading-relaxed urban-text flex-1 cursor-help">
                      "{testimonial.comment}"
                    </p>
                    <div className="border-t border-red-900/30 pt-4">
                      <div className="urban-subtitle text-white font-bold uppercase cursor-pointer hover:text-red-400 transition-colors">
                        {testimonial.client_name}
                      </div>
                      {testimonial.artist_name && (
                        <div className="text-sm text-red-500 urban-text uppercase font-semibold cursor-pointer hover:text-red-300 transition-colors">
                          Cliente de {testimonial.artist_name}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </SlideInLeft>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Final Súper Interactivo */}
      <section className="py-20 bg-gradient-to-r from-red-900 via-red-800 to-red-900 cursor-crosshair">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="urban-title text-5xl md:text-6xl font-bold text-white mb-6 street-shadow text-glow cursor-pointer hover-lift">
              ¿LISTO PARA EL <span className="text-black text-gradient">ARTE</span>?
            </h2>
            <p className="urban-text text-lg text-gray-200 mb-8 max-w-3xl mx-auto font-semibold">
              Con más de <AnimatedCounter end={mockPortfolios.length} /> trabajos realizados,{" "}
              <AnimatedCounter end={artists.length} /> artistas especializados y <AnimatedCounter end={500} />+ clientes
              satisfechos, somos tu mejor opción para crear arte único en tu piel.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Button
                asChild
                size="lg"
                className="bg-black text-red-500 hover:bg-gray-900 px-12 py-6 text-xl font-bold urban-title border-4 border-black hover:border-red-600 btn-interactive pulse-red"
              >
                <Link href="/agendamiento">
                  <Calendar className="mr-3 h-7 w-7" />
                  RESERVA YA
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-4 border-white text-white hover:bg-white hover:text-red-900 px-12 py-6 text-xl font-bold urban-title btn-interactive"
              >
                <Link href="/portafolios">
                  VER <AnimatedCounter end={mockPortfolios.length} />+ TRABAJOS
                </Link>
              </Button>
            </div>

            {/* Garantías Interactivas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-sm">
              <div className="bg-black/30 rounded-lg p-4 card-interactive cursor-help">
                <div className="text-white font-bold mb-1">✓ Consulta Gratuita</div>
                <div className="text-gray-300">Sin compromiso</div>
                <ProgressBar value={100} size="sm" showPercentage={false} color="green" />
              </div>
              <div className="bg-black/30 rounded-lg p-4 card-interactive cursor-help">
                <div className="text-white font-bold mb-1">✓ Garantía de Calidad</div>
                <div className="text-gray-300">100% satisfacción</div>
                <ProgressBar value={100} size="sm" showPercentage={false} color="blue" />
              </div>
              <div className="bg-black/30 rounded-lg p-4 card-interactive cursor-help">
                <div className="text-white font-bold mb-1">✓ Higiene Total</div>
                <div className="text-gray-300">Protocolos estrictos</div>
                <ProgressBar value={100} size="sm" showPercentage={false} color="yellow" />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}
