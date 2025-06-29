"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock, CalendarIcon } from "lucide-react"

interface TimeSlot {
  time: string
  available: boolean
  price?: number
}

interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isAvailable: boolean
  slots: TimeSlot[]
}

interface EnhancedCalendarProps {
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
  selectedTime: string | null
  onTimeSelect: (time: string) => void
  artistId?: number
  estimatedDuration?: number
}

export function EnhancedCalendar({
  selectedDate,
  onDateSelect,
  selectedTime,
  onTimeSelect,
  artistId,
  estimatedDuration = 2,
}: EnhancedCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [availableSlots, setAvailableSlots] = useState<{ [key: string]: TimeSlot[] }>({})
  const [isLoading, setIsLoading] = useState(false)

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  // Generar días del calendario
  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days: CalendarDay[] = []
    const today = new Date()

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)

      const dateKey = date.toISOString().split("T")[0]
      const slots = availableSlots[dateKey] || []

      days.push({
        date,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === today.toDateString(),
        isSelected: selectedDate?.toDateString() === date.toDateString(),
        isAvailable: date >= today && slots.some((slot) => slot.available),
        slots,
      })
    }

    return days
  }

  // Simular carga de slots disponibles
  useEffect(() => {
    setIsLoading(true)

    // Simular API call
    setTimeout(() => {
      const slots: { [key: string]: TimeSlot[] } = {}
      const today = new Date()

      for (let i = 0; i < 30; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        const dateKey = date.toISOString().split("T")[0]

        // Generar slots aleatorios
        const timeSlots: TimeSlot[] = [
          { time: "09:00", available: Math.random() > 0.3, price: 150 },
          { time: "11:00", available: Math.random() > 0.4, price: 150 },
          { time: "13:00", available: Math.random() > 0.5, price: 150 },
          { time: "15:00", available: Math.random() > 0.3, price: 150 },
          { time: "17:00", available: Math.random() > 0.6, price: 150 },
        ]

        slots[dateKey] = timeSlots
      }

      setAvailableSlots(slots)
      setIsLoading(false)
    }, 1000)
  }, [currentMonth, artistId])

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(currentMonth.getMonth() + (direction === "next" ? 1 : -1))
    setCurrentMonth(newMonth)
  }

  const handleDateClick = (day: CalendarDay) => {
    if (day.isAvailable && day.isCurrentMonth) {
      onDateSelect(day.date)
    }
  }

  const selectedDateSlots = selectedDate ? availableSlots[selectedDate.toISOString().split("T")[0]] || [] : []

  return (
    <div className="space-y-6">
      {/* Header del calendario */}
      <Card className="bg-dark-800/80 border-red-900/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white urban-subtitle">
              <CalendarIcon className="inline mr-2 h-5 w-5" />
              SELECCIONA FECHA
            </h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("prev")}
                className="border-gray-600 text-gray-400 hover:bg-gray-800"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-white font-bold urban-text min-w-[150px] text-center">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("next")}
                className="border-gray-600 text-gray-400 hover:bg-gray-800"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-gray-400 text-sm font-semibold py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Días del calendario */}
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays().map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(day)}
                disabled={!day.isAvailable || !day.isCurrentMonth}
                className={`
                  aspect-square p-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${day.isCurrentMonth ? "text-white" : "text-gray-600"}
                  ${day.isToday ? "ring-2 ring-red-500" : ""}
                  ${day.isSelected ? "bg-red-600 text-white" : ""}
                  ${day.isAvailable && day.isCurrentMonth && !day.isSelected ? "hover:bg-gray-700 cursor-pointer" : ""}
                  ${!day.isAvailable || !day.isCurrentMonth ? "cursor-not-allowed opacity-50" : ""}
                `}
              >
                <div className="flex flex-col items-center">
                  <span>{day.date.getDate()}</span>
                  {day.isAvailable && day.isCurrentMonth && (
                    <div className="w-1 h-1 bg-green-500 rounded-full mt-1"></div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Leyenda */}
          <div className="flex items-center justify-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400">Disponible</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span className="text-gray-400">Seleccionado</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <span className="text-gray-400">No disponible</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Horarios disponibles */}
      {selectedDate && (
        <Card className="bg-dark-800/80 border-red-900/30">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white urban-subtitle mb-4">
              <Clock className="inline mr-2 h-5 w-5" />
              HORARIOS DISPONIBLES
            </h3>
            <p className="text-gray-400 mb-4">
              {selectedDate.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-700 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : selectedDateSlots.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {selectedDateSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && onTimeSelect(slot.time)}
                    disabled={!slot.available}
                    className={`
                      p-3 rounded-lg border-2 transition-all duration-200 text-sm font-semibold
                      ${
                        selectedTime === slot.time
                          ? "border-red-600 bg-red-600/20 text-red-400"
                          : slot.available
                            ? "border-gray-600 text-gray-300 hover:border-red-600/50 hover:bg-red-600/10 cursor-pointer"
                            : "border-gray-700 text-gray-600 cursor-not-allowed"
                      }
                    `}
                  >
                    <div className="flex flex-col items-center">
                      <span>{slot.time}</span>
                      {slot.available ? (
                        <Badge className="mt-1 bg-green-600/20 text-green-400 text-xs">Disponible</Badge>
                      ) : (
                        <Badge className="mt-1 bg-red-600/20 text-red-400 text-xs">Ocupado</Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-2">No hay horarios disponibles</div>
                <p className="text-sm text-gray-600">Selecciona otra fecha</p>
              </div>
            )}

            {selectedTime && (
              <div className="mt-6 p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">Horario seleccionado:</p>
                    <p className="text-red-400">
                      {selectedTime} -{" "}
                      {new Date(`2000-01-01 ${selectedTime}`).getTime() + estimatedDuration * 60 * 60 * 1000}
                    </p>
                  </div>
                  <Badge className="bg-green-600 text-white">{estimatedDuration}h estimadas</Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
