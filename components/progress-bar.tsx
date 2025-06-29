"use client"

import { useState, useEffect } from "react"

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  animated?: boolean
  color?: "red" | "green" | "blue" | "yellow"
  size?: "sm" | "md" | "lg"
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  animated = true,
  color = "red",
  size = "md",
}: ProgressBarProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const percentage = Math.min((value / max) * 100, 100)

  const colorClasses = {
    red: "from-red-600 to-red-400",
    green: "from-green-600 to-green-400",
    blue: "from-blue-600 to-blue-400",
    yellow: "from-yellow-600 to-yellow-400",
  }

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  }

  useEffect(() => {
    if (!animated) {
      setAnimatedValue(percentage)
      return
    }

    const duration = 1500
    const steps = 60
    const stepValue = percentage / steps
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      setAnimatedValue(stepValue * currentStep)

      if (currentStep >= steps) {
        clearInterval(interval)
        setAnimatedValue(percentage)
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [percentage, animated])

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm text-gray-400">{label}</span>}
          {showPercentage && <span className="text-sm font-bold text-white">{Math.round(animatedValue)}%</span>}
        </div>
      )}

      <div className={`w-full bg-gray-700 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${sizeClasses[size]} bg-gradient-to-r ${colorClasses[color]} transition-all duration-300 ease-out relative overflow-hidden`}
          style={{ width: `${animatedValue}%` }}
        >
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          )}
        </div>
      </div>
    </div>
  )
}
