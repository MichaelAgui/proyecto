"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Heart, Share2, Calendar, Clock, DollarSign } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface InteractiveCardProps {
  id: number
  title: string
  artist_name?: string
  image_url: string
  category?: string
  price_range?: string
  duration_hours?: number
  difficulty?: string
  tags: string[]
  onLike?: (id: number) => void
  isLiked?: boolean
}

export function InteractiveCard({
  id,
  title,
  artist_name,
  image_url,
  category,
  price_range,
  duration_hours,
  difficulty,
  tags,
  onLike,
  isLiked = false,
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10)
  const [views, setViews] = useState(Math.floor(Math.random() * 200) + 50)
  const [isLiking, setIsLiking] = useState(false)

  const handleLike = () => {
    if (isLiking) return
    setIsLiking(true)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
    onLike?.(id)
    setTimeout(() => setIsLiking(false), 300)
  }

  const handleView = () => {
    setViews((prev) => prev + 1)
  }

  return (
    <Card
      className="bg-dark-800/80 border border-gray-700/50 overflow-hidden hover:border-red-600/50 transition-all duration-300 group cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-600/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer" }}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image_url || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          style={{ cursor: "zoom-in" }}
        />

        {/* Overlay interactivo */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Estadísticas en tiempo real */}
          <div className="absolute top-4 right-4 space-y-2">
            <div className="bg-black/70 rounded-full px-3 py-1 flex items-center gap-2 text-white text-sm">
              <Eye className="h-3 w-3 text-red-500" />
              <span className="font-bold">{views.toLocaleString()}</span>
            </div>
            <div className="bg-black/70 rounded-full px-3 py-1 flex items-center gap-2 text-white text-sm">
              <Heart className={`h-3 w-3 ${isLiked ? "text-red-500 fill-current" : "text-gray-400"}`} />
              <span className="font-bold">{likes}</span>
            </div>
          </div>

          {/* Acciones interactivas */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex gap-3">
              <Button
                size="sm"
                className="bg-red-600/80 hover:bg-red-600 text-white backdrop-blur-sm"
                onClick={handleView}
                style={{ cursor: "pointer" }}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={handleLike}
                className={`backdrop-blur-sm transition-all duration-300 ${
                  isLiked ? "bg-red-600 text-white" : "bg-gray-700/80 hover:bg-red-600 text-white"
                } ${isLiking ? "scale-125" : "scale-100"}`}
                style={{ cursor: "pointer" }}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              </Button>
              <Button
                size="sm"
                className="bg-gray-700/80 hover:bg-gray-700 text-white backdrop-blur-sm"
                style={{ cursor: "pointer" }}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Info detallada */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
            {artist_name && <p className="text-red-400 text-sm mb-2">por {artist_name}</p>}

            <div className="flex items-center justify-between text-white text-sm">
              {duration_hours && (
                <div className="flex items-center gap-1 bg-black/50 rounded px-2 py-1">
                  <Clock className="h-3 w-3" />
                  {duration_hours}h
                </div>
              )}
              {price_range && (
                <div className="flex items-center gap-1 bg-black/50 rounded px-2 py-1">
                  <DollarSign className="h-3 w-3" />
                  {price_range}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3">
          {category && (
            <Badge className="bg-red-600/90 text-white text-xs font-semibold animate-pulse">{category}</Badge>
          )}
        </div>

        {difficulty && (
          <div className="absolute top-3 right-3">
            <Badge
              variant="outline"
              className={`text-xs border transition-all duration-300 ${
                difficulty === "Fácil"
                  ? "border-green-500 text-green-400 hover:bg-green-500/20"
                  : difficulty === "Medio"
                    ? "border-yellow-500 text-yellow-400 hover:bg-yellow-500/20"
                    : difficulty === "Difícil"
                      ? "border-orange-500 text-orange-400 hover:bg-orange-500/20"
                      : "border-red-500 text-red-400 hover:bg-red-500/20"
              }`}
            >
              {difficulty}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-white text-lg leading-tight hover:text-red-400 transition-colors cursor-pointer">
            {title}
          </h3>
          {artist_name && (
            <p className="text-red-400 text-sm font-medium cursor-pointer hover:text-red-300 transition-colors">
              por {artist_name}
            </p>
          )}
        </div>

        {/* Tags interactivos */}
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-gray-600/50 text-gray-400 text-xs hover:border-red-600/50 hover:text-red-400 transition-all cursor-pointer"
              style={{ cursor: "pointer" }}
            >
              #{tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="border-gray-600/50 text-gray-500 text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Precio y acción */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
          {price_range && <div className="text-red-400 font-bold text-sm">{price_range}</div>}
          <Button
            asChild
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 hover:scale-105 transition-all duration-200"
            style={{ cursor: "pointer" }}
          >
            <Link href="/agendamiento">
              <Calendar className="mr-1 h-3 w-3" />
              Agendar
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
