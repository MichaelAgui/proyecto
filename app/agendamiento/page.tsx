"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EnhancedCalendar } from "@/components/enhanced-calendar"
import { ArtistSelector } from "@/components/artist-selector"
import { PriceCalculator } from "@/components/price-calculator"
import { LoadingSpinner } from "@/components/loading-spinner"
import { AnimatedCounter } from "@/components/animated-counter"
import { ProgressBar } from "@/components/progress-bar"
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Star,
  Shield,
  Award,
  Camera,
  Clock,
  MapPin,
  Heart,
  Zap,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { mockArtists } from "@/lib/mock-data"
import type { Artist } from "@/lib/types"

interface FormData {
  // Información personal
  clientName: string
  clientEmail: string
  clientPhone: string

  // Información del tatuaje
  tattooDescription: string
  tattooStyle: string
  tattooSize: string
  bodyPart: string
  isFirstTattoo: boolean
  budgetRange: string
  referenceImages: string[]

  // Cita
  selectedArtist: Artist | null
  selectedDate: Date | null
  selectedTime: string | null
  estimatedDuration: number
  consultationType: string

  // Adicional
  notes: string
}

export default function AgendamientoPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formProgress, setFormProgress] = useState(0)
  const [estimatedPrice, setEstimatedPrice] = useState({ min: 300, max: 600, estimated: 450 })
  const { toast } = useToast()

  const [formData, setFormData] = useState<FormData>({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    tattooDescription: "",
    tattooStyle: "",
    tattooSize: "",
    bodyPart: "",
    isFirstTattoo: false,
    budgetRange: "",
    referenceImages: [],
    selectedArtist: null,
    selectedDate: null,
    selectedTime: null,
    estimatedDuration: 3,
    consultationType: "presencial",
    notes: "",
  })

  const totalSteps = 5
  const stepTitles = [
    "Información Personal",
    "Detalles del Tatuaje",
    "Seleccionar Artista",
    "Fecha y Hora",
    "Confirmación",
  ]

  // Actualizar progreso
  useEffect(() => {
    setFormProgress((currentStep / totalSteps) * 100)
  }, [currentStep])

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.clientName && formData.clientEmail && formData.clientPhone)
      case 2:
        return !!(formData.tattooDescription && formData.tattooStyle && formData.tattooSize)
      case 3:
        return !!formData.selectedArtist
      case 4:
        return !!(formData.selectedDate && formData.selectedTime)
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Simular envío
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsSubmitted(true)
      toast({
        title: "¡Cita Agendada!",
        description: "Tu solicitud ha sido enviada. Te contactaremos pronto para confirmar.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al agendar tu cita. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-black border-red-600 shadow-2xl">
            <CardContent className="p-12">
              <div className="text-center space-y-8">
                {/* Success Animation */}
                <div className="relative">
                  <div className="w-32 h-32 mx-auto bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
                    <CheckCircle className="h-16 w-16 text-white animate-bounce" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                </div>

                {/* Success Message */}
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl font-bold text-white urban-title">
                    ¡SOLICITUD <span className="text-red-500">ENVIADA!</span>
                  </h1>
                  <p className="text-xl text-white leading-relaxed max-w-2xl mx-auto">
                    Hemos recibido tu solicitud de cita. Nuestro equipo se pondrá en contacto contigo dentro de las
                    próximas <span className="text-red-400 font-bold">24 horas</span> para confirmar los detalles.
                  </p>
                </div>

                {/* Resumen Elegante */}
                <Card className="bg-black border-red-600 text-left max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                        <Heart className="h-5 w-5 text-white" />
                      </div>
                      Resumen de tu Solicitud
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-red-400" />
                          <div>
                            <p className="text-red-400 text-sm">Cliente</p>
                            <p className="text-white font-semibold">{formData.clientName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Award className="h-5 w-5 text-red-400" />
                          <div>
                            <p className="text-red-400 text-sm">Artista</p>
                            <p className="text-white font-semibold">{formData.selectedArtist?.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-red-400" />
                          <div>
                            <p className="text-red-400 text-sm">Fecha y Hora</p>
                            <p className="text-white font-semibold">
                              {formData.selectedDate?.toLocaleDateString("es-ES")} - {formData.selectedTime}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Sparkles className="h-5 w-5 text-red-400" />
                          <div>
                            <p className="text-red-400 text-sm">Estilo</p>
                            <p className="text-white font-semibold">{formData.tattooStyle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-red-400" />
                          <div>
                            <p className="text-red-400 text-sm">Tamaño</p>
                            <p className="text-white font-semibold">{formData.tattooSize}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Zap className="h-5 w-5 text-red-400" />
                          <div>
                            <p className="text-red-400 text-sm">Precio Estimado</p>
                            <p className="text-red-400 font-bold text-xl">${estimatedPrice.estimated}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => {
                      setIsSubmitted(false)
                      setCurrentStep(1)
                      setFormData({
                        clientName: "",
                        clientEmail: "",
                        clientPhone: "",
                        tattooDescription: "",
                        tattooStyle: "",
                        tattooSize: "",
                        bodyPart: "",
                        isFirstTattoo: false,
                        budgetRange: "",
                        referenceImages: [],
                        selectedArtist: null,
                        selectedDate: null,
                        selectedTime: null,
                        estimatedDuration: 3,
                        consultationType: "presencial",
                        notes: "",
                      })
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 text-lg"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Agendar Otra Cita
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-red-600 text-white hover:bg-red-600 hover:border-red-600 py-4 px-8 rounded-xl transition-all duration-300 text-lg"
                    onClick={() => (window.location.href = "/portafolios")}
                  >
                    <Star className="mr-2 h-5 w-5" />
                    Ver Portafolios
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 urban-title street-shadow">
              AGENDA TU <span className="text-red-500">CITA</span>
            </h1>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed">
            Reserva tu sesión con uno de nuestros{" "}
            <span className="text-red-400 font-semibold">artistas especializados</span>. Proceso simple, rápido y
            profesional.
          </p>
        </div>

        {/* Enhanced Progress Section */}
        <div className="max-w-5xl mx-auto mb-12">
          <Card className="bg-black border-red-600 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">
                      Paso {currentStep} de {totalSteps}
                    </p>
                    <p className="text-red-400 text-sm">{stepTitles[currentStep - 1]}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-2xl">{Math.round(formProgress)}%</p>
                  <p className="text-red-400 text-sm">Completado</p>
                </div>
              </div>

              <ProgressBar value={formProgress} size="lg" color="red" animated={true} />

              {/* Step Indicators */}
              <div className="flex justify-between mt-8">
                {stepTitles.map((title, index) => (
                  <div key={index} className="flex flex-col items-center max-w-24">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        index + 1 <= currentStep
                          ? "bg-red-600 text-white shadow-lg"
                          : "bg-black border-2 border-red-600 text-red-400"
                      }`}
                    >
                      {index + 1 <= currentStep ? <CheckCircle className="h-6 w-6" /> : <span>{index + 1}</span>}
                    </div>
                    <span className="text-xs text-red-400 mt-2 text-center leading-tight">{title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="bg-black border-red-600 shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-white flex items-center gap-3 urban-subtitle text-2xl">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    {stepTitles[currentStep - 1]}
                  </CardTitle>
                  <CardDescription className="text-red-400 text-lg">
                    {currentStep === 1 && "Comencemos con tu información básica para personalizar tu experiencia"}
                    {currentStep === 2 && "Cuéntanos sobre tu visión y el tatuaje de tus sueños"}
                    {currentStep === 3 && "Elige el artista perfecto que hará realidad tu proyecto"}
                    {currentStep === 4 && "Selecciona la fecha y hora que mejor se adapte a tu agenda"}
                    {currentStep === 5 && "Revisa y confirma todos los detalles de tu cita"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Paso 1: Información Personal */}
                  {currentStep === 1 && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="clientName" className="text-white text-base font-semibold">
                            <User className="inline h-5 w-5 mr-2 text-red-400" />
                            Nombre Completo *
                          </Label>
                          <Input
                            id="clientName"
                            value={formData.clientName}
                            onChange={(e) => updateFormData("clientName", e.target.value)}
                            className="bg-black border-red-600 text-white h-12 text-lg rounded-xl transition-all duration-300 focus:border-red-500 focus:ring-red-500"
                            placeholder="Tu nombre completo"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="clientEmail" className="text-white text-base font-semibold">
                            <Mail className="inline h-5 w-5 mr-2 text-red-400" />
                            Email *
                          </Label>
                          <Input
                            id="clientEmail"
                            type="email"
                            value={formData.clientEmail}
                            onChange={(e) => updateFormData("clientEmail", e.target.value)}
                            className="bg-black border-red-600 text-white h-12 text-lg rounded-xl transition-all duration-300 focus:border-red-500 focus:ring-red-500"
                            placeholder="tu@email.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="clientPhone" className="text-white text-base font-semibold">
                          <Phone className="inline h-5 w-5 mr-2 text-red-400" />
                          Teléfono *
                        </Label>
                        <Input
                          id="clientPhone"
                          value={formData.clientPhone}
                          onChange={(e) => updateFormData("clientPhone", e.target.value)}
                          className="bg-black border-red-600 text-white h-12 text-lg rounded-xl transition-all duration-300 focus:border-red-500 focus:ring-red-500"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-white text-base font-semibold">
                          <Clock className="inline h-5 w-5 mr-2 text-red-400" />
                          Tipo de Consulta
                        </Label>
                        <Select
                          value={formData.consultationType}
                          onValueChange={(value) => updateFormData("consultationType", value)}
                        >
                          <SelectTrigger className="bg-black border-red-600 text-white h-12 text-lg rounded-xl transition-all duration-300 focus:border-red-500">
                            <SelectValue placeholder="Selecciona el tipo de consulta" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-red-600 rounded-xl">
                            <SelectItem value="presencial" className="text-white text-lg">
                              Consulta Presencial
                            </SelectItem>
                            <SelectItem value="virtual" className="text-white text-lg">
                              Consulta Virtual
                            </SelectItem>
                            <SelectItem value="directa" className="text-white text-lg">
                              Cita Directa (ya tengo el diseño)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Paso 2: Detalles del Tatuaje */}
                  {currentStep === 2 && (
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <Label htmlFor="tattooDescription" className="text-white text-base font-semibold">
                          <MessageSquare className="inline h-5 w-5 mr-2 text-red-400" />
                          Descripción del Tatuaje *
                        </Label>
                        <Textarea
                          id="tattooDescription"
                          value={formData.tattooDescription}
                          onChange={(e) => updateFormData("tattooDescription", e.target.value)}
                          className="bg-black border-red-600 text-white min-h-[140px] text-lg rounded-xl transition-all duration-300 focus:border-red-500 focus:ring-red-500 resize-none"
                          placeholder="Describe tu idea de tatuaje con el mayor detalle posible... ¿Qué estilo te gusta? ¿Qué elementos quieres incluir? ¿Tienes alguna inspiración específica?"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="text-white text-base font-semibold">
                            <Sparkles className="inline h-5 w-5 mr-2 text-red-400" />
                            Estilo de Tatuaje *
                          </Label>
                          <Select
                            value={formData.tattooStyle}
                            onValueChange={(value) => updateFormData("tattooStyle", value)}
                          >
                            <SelectTrigger className="bg-black border-red-600 text-white h-12 text-lg rounded-xl transition-all duration-300 focus:border-red-500">
                              <SelectValue placeholder="Selecciona un estilo" />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-red-600 rounded-xl">
                              <SelectItem value="Realismo" className="text-white text-lg">
                                Realismo
                              </SelectItem>
                              <SelectItem value="Tradicional" className="text-white text-lg">
                                Tradicional
                              </SelectItem>
                              <SelectItem value="Neo-tradicional" className="text-white text-lg">
                                Neo-tradicional
                              </SelectItem>
                              <SelectItem value="Geométrico" className="text-white text-lg">
                                Geométrico
                              </SelectItem>
                              <SelectItem value="Blackwork" className="text-white text-lg">
                                Blackwork
                              </SelectItem>
                              <SelectItem value="Japonés" className="text-white text-lg">
                                Japonés
                              </SelectItem>
                              <SelectItem value="Fine Line" className="text-white text-lg">
                                Fine Line
                              </SelectItem>
                              <SelectItem value="Acuarela" className="text-white text-lg">
                                Acuarela
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-white text-base font-semibold">
                            <MapPin className="inline h-5 w-5 mr-2 text-red-400" />
                            Tamaño *
                          </Label>
                          <Select
                            value={formData.tattooSize}
                            onValueChange={(value) => updateFormData("tattooSize", value)}
                          >
                            <SelectTrigger className="bg-black border-red-600 text-white h-12 text-lg rounded-xl transition-all duration-300 focus:border-red-500">
                              <SelectValue placeholder="Selecciona el tamaño" />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-red-600 rounded-xl">
                              <SelectItem value="Pequeño" className="text-white text-lg">
                                Pequeño (hasta 5cm)
                              </SelectItem>
                              <SelectItem value="Mediano" className="text-white text-lg">
                                Mediano (5-15cm)
                              </SelectItem>
                              <SelectItem value="Grande" className="text-white text-lg">
                                Grande (15-25cm)
                              </SelectItem>
                              <SelectItem value="Extra Grande" className="text-white text-lg">
                                Extra Grande (25cm+)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="text-white text-base font-semibold">
                            <MapPin className="inline h-5 w-5 mr-2 text-red-400" />
                            Parte del Cuerpo
                          </Label>
                          <Select
                            value={formData.bodyPart}
                            onValueChange={(value) => updateFormData("bodyPart", value)}
                          >
                            <SelectTrigger className="bg-black border-red-600 text-white h-12 text-lg rounded-xl transition-all duration-300 focus:border-red-500">
                              <SelectValue placeholder="¿Dónde será el tatuaje?" />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-red-600 rounded-xl">
                              <SelectItem value="Brazo" className="text-white text-lg">
                                Brazo
                              </SelectItem>
                              <SelectItem value="Antebrazo" className="text-white text-lg">
                                Antebrazo
                              </SelectItem>
                              <SelectItem value="Hombro" className="text-white text-lg">
                                Hombro
                              </SelectItem>
                              <SelectItem value="Espalda" className="text-white text-lg">
                                Espalda
                              </SelectItem>
                              <SelectItem value="Pecho" className="text-white text-lg">
                                Pecho
                              </SelectItem>
                              <SelectItem value="Pierna" className="text-white text-lg">
                                Pierna
                              </SelectItem>
                              <SelectItem value="Otro" className="text-white text-lg">
                                Otro
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-white text-base font-semibold">
                            <Zap className="inline h-5 w-5 mr-2 text-red-400" />
                            Presupuesto Aproximado
                          </Label>
                          <Select
                            value={formData.budgetRange}
                            onValueChange={(value) => updateFormData("budgetRange", value)}
                          >
                            <SelectTrigger className="bg-black border-red-600 text-white h-12 text-lg rounded-xl transition-all duration-300 focus:border-red-500">
                              <SelectValue placeholder="Rango de presupuesto" />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-red-600 rounded-xl">
                              <SelectItem value="100-300" className="text-white text-lg">
                                $100 - $300
                              </SelectItem>
                              <SelectItem value="300-600" className="text-white text-lg">
                                $300 - $600
                              </SelectItem>
                              <SelectItem value="600-1000" className="text-white text-lg">
                                $600 - $1,000
                              </SelectItem>
                              <SelectItem value="1000-1500" className="text-white text-lg">
                                $1,000 - $1,500
                              </SelectItem>
                              <SelectItem value="1500+" className="text-white text-lg">
                                $1,500+
                              </SelectItem>
                              <SelectItem value="flexible" className="text-white text-lg">
                                Flexible
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Card className="bg-black border-red-600">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id="isFirstTattoo"
                              checked={formData.isFirstTattoo}
                              onChange={(e) => updateFormData("isFirstTattoo", e.target.checked)}
                              className="w-5 h-5 rounded border-red-600 bg-black text-red-600 focus:ring-red-500"
                            />
                            <Label htmlFor="isFirstTattoo" className="text-white text-lg">
                              <Heart className="inline h-5 w-5 mr-2 text-red-400" />
                              Este será mi primer tatuaje
                            </Label>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="space-y-3">
                        <Label className="text-white text-base font-semibold">
                          <Camera className="inline h-5 w-5 mr-2 text-red-400" />
                          Imágenes de Referencia
                        </Label>
                        <div className="border-2 border-dashed border-red-600 rounded-xl p-8 text-center bg-black transition-all duration-300 hover:border-red-500">
                          <Camera className="h-16 w-16 text-red-400 mx-auto mb-4" />
                          <p className="text-white mb-2 text-lg">Arrastra imágenes aquí o haz clic para seleccionar</p>
                          <p className="text-sm text-red-400 mb-4">PNG, JPG hasta 10MB cada una</p>
                          <Button
                            variant="outline"
                            className="border-2 border-red-600 text-white hover:bg-red-600 hover:border-red-600 rounded-xl px-6 py-3 transition-all duration-300"
                          >
                            <Camera className="mr-2 h-4 w-4" />
                            Seleccionar Archivos
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Paso 3: Seleccionar Artista */}
                  {currentStep === 3 && (
                    <ArtistSelector
                      artists={mockArtists}
                      selectedArtist={formData.selectedArtist}
                      onArtistSelect={(artist) => updateFormData("selectedArtist", artist)}
                      preferredStyle={formData.tattooStyle}
                    />
                  )}

                  {/* Paso 4: Fecha y Hora */}
                  {currentStep === 4 && (
                    <EnhancedCalendar
                      selectedDate={formData.selectedDate}
                      onDateSelect={(date) => updateFormData("selectedDate", date)}
                      selectedTime={formData.selectedTime}
                      onTimeSelect={(time) => updateFormData("selectedTime", time)}
                      artistId={formData.selectedArtist?.id}
                      estimatedDuration={formData.estimatedDuration}
                    />
                  )}

                  {/* Paso 5: Confirmación */}
                  {currentStep === 5 && (
                    <div className="space-y-8">
                      <div className="text-center">
                        <h3 className="text-3xl font-bold text-white urban-subtitle mb-4">
                          CONFIRMA TU <span className="text-red-500">CITA</span>
                        </h3>
                        <p className="text-red-400 text-lg">Revisa todos los detalles antes de enviar tu solicitud</p>
                      </div>

                      {/* Resumen completo */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Información personal */}
                        <Card className="bg-black border-red-600">
                          <CardHeader>
                            <CardTitle className="text-white flex items-center gap-3">
                              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                              </div>
                              Información Personal
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-red-400">Nombre:</span>
                              <span className="text-white font-semibold">{formData.clientName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-red-400">Email:</span>
                              <span className="text-white font-semibold">{formData.clientEmail}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-red-400">Teléfono:</span>
                              <span className="text-white font-semibold">{formData.clientPhone}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-red-400">Tipo:</span>
                              <span className="text-white font-semibold">{formData.consultationType}</span>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Información del tatuaje */}
                        <Card className="bg-black border-red-600">
                          <CardHeader>
                            <CardTitle className="text-white flex items-center gap-3">
                              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-white" />
                              </div>
                              Detalles del Tatuaje
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-red-400">Estilo:</span>
                              <span className="text-white font-semibold">{formData.tattooStyle}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-red-400">Tamaño:</span>
                              <span className="text-white font-semibold">{formData.tattooSize}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-red-400">Ubicación:</span>
                              <span className="text-white font-semibold">{formData.bodyPart || "No especificada"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-red-400">Presupuesto:</span>
                              <span className="text-white font-semibold">{formData.budgetRange || "Flexible"}</span>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Artista y cita */}
                        <Card className="bg-black border-red-600">
                          <CardHeader>
                            <CardTitle className="text-white flex items-center gap-3">
                              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                                <Award className="h-4 w-4 text-white" />
                              </div>
                              Artista y Cita
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-red-400">Artista:</span>
                              <span className="text-white font-semibold">{formData.selectedArtist?.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-red-400">Fecha:</span>
                              <span className="text-white font-semibold">
                                {formData.selectedDate?.toLocaleDateString("es-ES")}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-red-400">Hora:</span>
                              <span className="text-white font-semibold">{formData.selectedTime}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-red-400">Duración:</span>
                              <span className="text-white font-semibold">{formData.estimatedDuration}h estimadas</span>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Precio estimado */}
                        <Card className="bg-red-600 border-red-600">
                          <CardHeader>
                            <CardTitle className="text-white flex items-center gap-3">
                              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                                <Zap className="h-4 w-4 text-red-600" />
                              </div>
                              Precio Estimado
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-center">
                              <div className="text-4xl font-bold text-white mb-2">
                                $<AnimatedCounter end={estimatedPrice.estimated} />
                              </div>
                              <div className="text-sm text-white">
                                Rango: ${estimatedPrice.min} - ${estimatedPrice.max}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Descripción del tatuaje */}
                      <Card className="bg-black border-red-600">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                              <MessageSquare className="h-4 w-4 text-white" />
                            </div>
                            Descripción del Proyecto
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white leading-relaxed text-lg">{formData.tattooDescription}</p>
                        </CardContent>
                      </Card>

                      {/* Notas adicionales */}
                      <div className="space-y-3">
                        <Label htmlFor="notes" className="text-white text-base font-semibold">
                          <MessageSquare className="inline h-5 w-5 mr-2 text-red-400" />
                          Notas Adicionales (Opcional)
                        </Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => updateFormData("notes", e.target.value)}
                          className="bg-black border-red-600 text-white text-lg rounded-xl transition-all duration-300 focus:border-red-500 focus:ring-red-500 resize-none"
                          placeholder="Cualquier información adicional que consideres importante..."
                        />
                      </div>

                      {/* Términos y condiciones */}
                      <Card className="bg-black border-red-600">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              id="terms"
                              className="w-5 h-5 rounded border-red-600 bg-black text-red-600 focus:ring-red-500 mt-1"
                              required
                            />
                            <Label htmlFor="terms" className="text-white leading-relaxed">
                              <Shield className="inline h-4 w-4 mr-2 text-red-400" />
                              Acepto los términos y condiciones. Entiendo que esta es una solicitud de cita y que el
                              precio final se determinará en la consulta personal. El depósito será requerido para
                              confirmar la cita.
                            </Label>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Enhanced Navigation */}
                  <div className="flex justify-between pt-8 border-t border-red-600">
                    <Button
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      variant="outline"
                      className="border-2 border-red-600 text-white hover:bg-red-600 hover:border-red-600 disabled:opacity-50 px-6 py-3 rounded-xl transition-all duration-300 text-lg"
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Anterior
                    </Button>

                    {currentStep < totalSteps ? (
                      <Button
                        onClick={nextStep}
                        disabled={!validateStep(currentStep)}
                        className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 px-6 py-3 rounded-xl shadow-lg transition-all duration-300 text-lg"
                      >
                        Siguiente
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !validateStep(currentStep)}
                        className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 px-8 py-3 rounded-xl shadow-lg transition-all duration-300 text-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <LoadingSpinner size="sm" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-5 w-5" />
                            Confirmar Cita
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-6">
              {/* Calculadora de precio */}
              {formData.tattooStyle && formData.tattooSize && (
                <PriceCalculator
                  selectedStyle={formData.tattooStyle}
                  selectedSize={formData.tattooSize}
                  estimatedHours={formData.estimatedDuration}
                  artistRate={formData.selectedArtist ? 150 : 150}
                  onPriceChange={setEstimatedPrice}
                />
              )}

              {/* Proceso */}
              <Card className="bg-black border-red-600 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    Proceso de Agendamiento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { step: 1, title: "Solicitud", desc: "Completa el formulario" },
                    { step: 2, title: "Confirmación", desc: "Te contactamos en 24h" },
                    { step: 3, title: "Consulta", desc: "Diseño y presupuesto final" },
                    { step: 4, title: "¡Tu tatuaje!", desc: "Sesión de tatuaje" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold">{item.title}</p>
                        <p className="text-red-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Garantías */}
              <Card className="bg-black border-red-600 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    Nuestras Garantías
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { icon: Shield, text: "Consulta inicial gratuita" },
                    { icon: Award, text: "Garantía de calidad 100%" },
                    { icon: Star, text: "Artistas certificados" },
                    { icon: CheckCircle, text: "Protocolos de higiene estrictos" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-red-400" />
                      <span className="text-white">{item.text}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Contacto directo */}
              <Card className="bg-black border-red-600 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    ¿Prefieres Llamar?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white mb-4">También puedes contactarnos directamente:</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-red-600 rounded-lg">
                      <Phone className="h-5 w-5 text-white" />
                      <span className="text-white font-semibold">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-600 rounded-lg">
                      <Mail className="h-5 w-5 text-white" />
                      <span className="text-white font-semibold">info@inskpire.com</span>
                    </div>
                  </div>
                  <p className="text-sm text-red-400 mt-4 text-center">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Horarios: Lun-Sáb 10:00 AM - 8:00 PM
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
