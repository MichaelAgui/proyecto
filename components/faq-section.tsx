"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "¿Cuánto tiempo tarda en sanar un tatuaje?",
    answer:
      "Un tatuaje típicamente tarda entre 2-4 semanas en sanar completamente. Los primeros 3-5 días son los más críticos para el cuidado. Durante este tiempo es importante seguir las instrucciones de cuidado al pie de la letra.",
    category: "Cuidados",
  },
  {
    id: 2,
    question: "¿Cuál es el precio promedio de un tatuaje?",
    answer:
      "Los precios varían según el tamaño, complejidad y artista. Nuestros precios van desde $120 para diseños pequeños hasta $2000+ para piezas grandes y complejas. Ofrecemos consultas gratuitas para dar presupuestos exactos.",
    category: "Precios",
  },
  {
    id: 3,
    question: "¿Puedo traer mi propio diseño?",
    answer:
      "¡Por supuesto! Nuestros artistas pueden trabajar con tu diseño o modificarlo para adaptarlo mejor a tu anatomía y preferencias. También podemos crear diseños completamente personalizados.",
    category: "Diseño",
  },
  {
    id: 4,
    question: "¿Qué debo hacer antes de mi cita?",
    answer:
      "Asegúrate de comer bien, estar hidratado, evitar alcohol 24h antes, y traer una identificación válida. También es recomendable usar ropa cómoda que permita acceso fácil al área a tatuar.",
    category: "Preparación",
  },
  {
    id: 5,
    question: "¿Duele mucho hacerse un tatuaje?",
    answer:
      "El dolor varía según la persona y la ubicación del tatuaje. Algunas áreas son más sensibles que otras. Nuestros artistas están capacitados para hacer el proceso lo más cómodo posible.",
    category: "Proceso",
  },
  {
    id: 6,
    question: "¿Cuántas sesiones necesito para un tatuaje grande?",
    answer:
      "Depende del tamaño y complejidad. Los tatuajes grandes pueden requerir 2-6 sesiones, espaciadas por 2-4 semanas para permitir la cicatrización entre sesiones.",
    category: "Proceso",
  },
]

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <section className="py-20 bg-dark-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-red-600/20 text-red-400 border border-red-600/50 mb-6 px-4 py-2 uppercase font-semibold">
            <HelpCircle className="mr-2 h-4 w-4" />
            Preguntas Frecuentes
          </Badge>
          <h2 className="urban-title text-5xl md:text-6xl font-bold text-white mb-4 street-shadow">
            RESOLVEMOS TUS <span className="text-red-600">DUDAS</span>
          </h2>
          <p className="urban-text text-lg text-gray-400 max-w-2xl mx-auto">
            Las respuestas a las preguntas más comunes sobre tatuajes y nuestros servicios
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <Card
              key={faq.id}
              className="bg-dark-800/80 border border-gray-700/50 hover:border-red-600/50 transition-all duration-300"
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="border-red-600/50 text-red-400 text-xs">
                        {faq.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-white text-lg">{faq.question}</h3>
                  </div>
                  <div className="ml-4">
                    {openFAQ === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-red-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {openFAQ === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-700/50 pt-4">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">¿No encontraste lo que buscabas?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+1-555-123-4567"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Llámanos: +1 (555) 123-4567
            </a>
            <a
              href="mailto:info@inskpire.com"
              className="border border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Envíanos un Email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
