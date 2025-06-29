"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    title: "Cuidados Post-Tatuaje: Guía Completa",
    excerpt:
      "Todo lo que necesitas saber para cuidar tu nuevo tatuaje correctamente y asegurar una cicatrización perfecta.",
    author: "Equipo Inskpire",
    date: "2023-12-01",
    category: "Cuidados",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "5 min",
  },
  {
    id: 2,
    title: "Tendencias en Tatuajes 2024",
    excerpt: "Descubre los estilos que marcarán tendencia este año y cómo nuestros artistas los interpretan.",
    author: "Sofia Rodriguez",
    date: "2023-11-28",
    category: "Tendencias",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "7 min",
  },
  {
    id: 3,
    title: "Preparación para tu Primer Tatuaje",
    excerpt:
      "Consejos esenciales para quienes se tatúan por primera vez. Desde la elección del diseño hasta el día de la cita.",
    author: "Carlos Mendoza",
    date: "2023-11-25",
    category: "Consejos",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "6 min",
  },
]

export function BlogSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-dark-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-red-600/20 text-red-400 border border-red-600/50 mb-6 px-4 py-2 uppercase font-semibold">
            <BookOpen className="mr-2 h-4 w-4" />
            Blog & Consejos
          </Badge>
          <h2 className="urban-title text-5xl md:text-6xl font-bold text-white mb-4 street-shadow">
            APRENDE CON <span className="text-red-600">NOSOTROS</span>
          </h2>
          <p className="urban-text text-lg text-gray-400 max-w-2xl mx-auto">
            Consejos, tendencias y guías de nuestros expertos para que tengas la mejor experiencia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card
              key={post.id}
              className="bg-dark-800/80 border border-gray-700/50 overflow-hidden hover:border-red-600/50 transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-600/90 text-white text-xs font-semibold">{post.category}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="border-white/50 text-white text-xs bg-black/50">
                    {post.readTime}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-white text-lg leading-tight group-hover:text-red-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-600 text-gray-400 hover:bg-red-600 hover:text-white hover:border-red-600"
                >
                  <Link href={`/blog/${post.id}`}>
                    Leer Más
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-bold urban-subtitle px-8 py-3"
          >
            <Link href="/blog">
              Ver Todos los Artículos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
