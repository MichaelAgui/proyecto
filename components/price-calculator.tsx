"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ProgressBar } from "@/components/progress-bar"
import { AnimatedCounter } from "@/components/animated-counter"
import { DollarSign, Clock, Calculator } from "lucide-react"

interface PriceCalculatorProps {
  selectedStyle?: string
  selectedSize?: string
  estimatedHours?: number
  artistRate?: number
  onPriceChange?: (price: { min: number; max: number; estimated: number }) => void
}

export function PriceCalculator({
  selectedStyle = "Realismo",
  selectedSize = "Mediano",
  estimatedHours = 3,
  artistRate = 150,
  onPriceChange,
}: PriceCalculatorProps) {
  const [complexity, setComplexity] = useState([3])
  const [colorWork, setColorWork] = useState([2])
  const [detailLevel, setDetailLevel] = useState([3])
  const [calculatedPrice, setCalculatedPrice] = useState({ min: 300, max: 600, estimated: 450 })

  // Precios base por estilo y tamaño
  const basePrices = {
    Realismo: { small: [150, 400], medium: [400, 800], large: [800, 1500], xlarge: [1500, 3000] },
    Tradicional: { small: [100, 300], medium: [300, 600], large: [600, 1200], xlarge: [1200, 2000] },
    Geométrico: { small: [120, 350], medium: [350, 700], large: [700, 1300], xlarge: [1300, 2200] },
    Blackwork: { small: [130, 380], medium: [380, 750], large: [750, 1400], xlarge: [1400, 2500] },
    Japonés: { small: [200, 500], medium: [500, 1000], large: [1000, 2000], xlarge: [2000, 3500] },
    "Fine Line": { small: [80, 250], medium: [250, 500], large: [500, 900], xlarge: [900, 1500] },
    Acuarela: { small: [150, 400], medium: [400, 800], large: [800, 1500], xlarge: [1500, 2800] },
    "Neo-tradicional": { small: [120, 350], medium: [350, 700], large: [700, 1300], xlarge: [1300, 2300] },
  }

  const sizeMap = {
    Pequeño: "small",
    Mediano: "medium",
    Grande: "large",
    "Extra Grande": "xlarge",
  }

  useEffect(() => {
    const styleKey = selectedStyle as keyof typeof basePrices
    const sizeKey = sizeMap[selectedSize as keyof typeof sizeMap] as keyof (typeof basePrices)[typeof styleKey]

    if (basePrices[styleKey] && basePrices[styleKey][sizeKey]) {
      const [baseMin, baseMax] = basePrices[styleKey][sizeKey]

      // Factores de ajuste
      const complexityFactor = 0.8 + (complexity[0] / 5) * 0.4 // 0.8 - 1.2
      const colorFactor = 1 + (colorWork[0] / 5) * 0.3 // 1.0 - 1.3
      const detailFactor = 0.9 + (detailLevel[0] / 5) * 0.3 // 0.9 - 1.2

      const adjustedMin = Math.round(baseMin * complexityFactor * colorFactor * detailFactor)
      const adjustedMax = Math.round(baseMax * complexityFactor * colorFactor * detailFactor)
      const estimated = Math.round((adjustedMin + adjustedMax) / 2)

      const newPrice = { min: adjustedMin, max: adjustedMax, estimated }
      setCalculatedPrice(newPrice)
      onPriceChange?.(newPrice)
    }
  }, [selectedStyle, selectedSize, complexity, colorWork, detailLevel, onPriceChange])

  const complexityLabels = ["Muy Simple", "Simple", "Moderado", "Complejo", "Muy Complejo"]
  const colorLabels = ["Solo Negro", "Poco Color", "Color Moderado", "Muchos Colores", "Full Color"]
  const detailLabels = ["Mínimo", "Bajo", "Moderado", "Alto", "Extremo"]

  return (
    <Card className="bg-dark-800/80 border-red-900/30">
      <CardContent className="p-6 space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white urban-subtitle mb-2">
            <Calculator className="inline mr-2 h-5 w-5" />
            CALCULADORA DE PRECIO
          </h3>
          <p className="text-gray-400 text-sm">Ajusta los parámetros para obtener una estimación personalizada</p>
        </div>

        {/* Información base */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-black/30 rounded-lg">
          <div>
            <div className="text-gray-400 text-xs uppercase">Estilo</div>
            <div className="text-white font-semibold">{selectedStyle}</div>
          </div>
          <div>
            <div className="text-gray-400 text-xs uppercase">Tamaño</div>
            <div className="text-white font-semibold">{selectedSize}</div>
          </div>
        </div>

        {/* Controles de ajuste */}
        <div className="space-y-6">
          {/* Complejidad */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-gray-400 text-sm font-semibold">Complejidad del Diseño</label>
              <Badge className="bg-red-600/20 text-red-400 text-xs">{complexityLabels[complexity[0] - 1]}</Badge>
            </div>
            <Slider value={complexity} onValueChange={setComplexity} max={5} min={1} step={1} className="w-full" />
            <ProgressBar value={(complexity[0] / 5) * 100} size="sm" showPercentage={false} color="red" />
          </div>

          {/* Trabajo de color */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-gray-400 text-sm font-semibold">Trabajo de Color</label>
              <Badge className="bg-blue-600/20 text-blue-400 text-xs">{colorLabels[colorWork[0] - 1]}</Badge>
            </div>
            <Slider value={colorWork} onValueChange={setColorWork} max={5} min={1} step={1} className="w-full" />
            <ProgressBar value={(colorWork[0] / 5) * 100} size="sm" showPercentage={false} color="blue" />
          </div>

          {/* Nivel de detalle */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-gray-400 text-sm font-semibold">Nivel de Detalle</label>
              <Badge className="bg-yellow-600/20 text-yellow-400 text-xs">{detailLabels[detailLevel[0] - 1]}</Badge>
            </div>
            <Slider value={detailLevel} onValueChange={setDetailLevel} max={5} min={1} step={1} className="w-full" />
            <ProgressBar value={(detailLevel[0] / 5) * 100} size="sm" showPercentage={false} color="yellow" />
          </div>
        </div>

        {/* Resultado del precio */}
        <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-600/30 rounded-lg p-6">
          <div className="text-center space-y-4">
            <div>
              <div className="text-gray-400 text-sm uppercase mb-2">Precio Estimado</div>
              <div className="text-4xl font-bold text-red-400 urban-title">
                $<AnimatedCounter end={calculatedPrice.estimated} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-gray-400 text-xs uppercase">Mínimo</div>
                <div className="text-xl font-bold text-white">
                  $<AnimatedCounter end={calculatedPrice.min} />
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-xs uppercase">Máximo</div>
                <div className="text-xl font-bold text-white">
                  $<AnimatedCounter end={calculatedPrice.max} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{estimatedHours}h estimadas</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                <span>${artistRate}/hora</span>
              </div>
            </div>
          </div>
        </div>

        {/* Factores de precio */}
        <div className="bg-black/30 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3 text-sm">Factores que Afectan el Precio:</h4>
          <div className="space-y-2 text-xs text-gray-400">
            <div className="flex justify-between">
              <span>• Complejidad del diseño</span>
              <span className="text-red-400">+{Math.round((0.8 + (complexity[0] / 5) * 0.4 - 1) * 100)}%</span>
            </div>
            <div className="flex justify-between">
              <span>• Trabajo de color</span>
              <span className="text-blue-400">+{Math.round((1 + (colorWork[0] / 5) * 0.3 - 1) * 100)}%</span>
            </div>
            <div className="flex justify-between">
              <span>• Nivel de detalle</span>
              <span className="text-yellow-400">+{Math.round((0.9 + (detailLevel[0] / 5) * 0.3 - 1) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-500 text-center">
          * Este es un precio estimado. El precio final se determinará en la consulta personal.
        </div>
      </CardContent>
    </Card>
  )
}
