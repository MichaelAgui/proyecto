"use client"

import { useState, useEffect } from "react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  showProgress?: boolean
  duration?: number
  onComplete?: () => void
}

export function LoadingSpinner({
  size = "md",
  showProgress = false,
  duration = 3000,
  onComplete,
}: LoadingSpinnerProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  useEffect(() => {
    if (!showProgress) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (duration / 50)
        if (newProgress >= 100) {
          setIsComplete(true)
          onComplete?.()
          return 100
        }
        return newProgress
      })
    }, 50)

    return () => clearInterval(interval)
  }, [showProgress, duration, onComplete])

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
        <div
          className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"
          style={{
            animationDuration: isComplete ? "0.5s" : "1s",
            transform: isComplete ? "rotate(360deg)" : undefined,
          }}
        ></div>
      </div>

      {showProgress && (
        <div className="text-center">
          <div className="text-red-400 font-bold text-lg">{Math.round(progress)}%</div>
          <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}
