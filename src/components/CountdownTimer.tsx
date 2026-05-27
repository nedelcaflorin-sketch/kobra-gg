'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  hours?: number
  minutes?: number
  seconds?: number
}

export default function CountdownTimer({ hours = 23, minutes = 59, seconds = 59 }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours, minutes, seconds })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        }
        
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const format = (num: number) => num.toString().padStart(2, '0')

  return (
    <div className="flex items-center gap-2">
      {[
        { value: timeLeft.hours, label: 'ore' },
        { value: timeLeft.minutes, label: 'min' },
        { value: timeLeft.seconds, label: 'sec' },
      ].map((item, index) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-kobra-black border border-kobra-green/30 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-kobra-green">{format(item.value)}</span>
            </div>
            <span className="text-xs text-gray-500 mt-1">{item.label}</span>
          </div>
          {index < 2 && <span className="text-kobra-green text-xl font-bold">:</span>}
        </div>
      ))}
    </div>
  )
}
