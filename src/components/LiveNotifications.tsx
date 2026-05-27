'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, User, CheckCircle } from 'lucide-react'

interface Notification {
  id: number
  name: string
  product: string
  time: string
}

export default function LiveNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [visible, setVisible] = useState(false)

  const names = ['Marco', 'Luca', 'Giulia', 'Anna', 'Davide', 'Sofia', 'Matteo', 'Elena']
  const products = ['Cuffie RGB Kobra X1', 'Mouse Pro 7200', 'Tastiera K95', 'Power Bank 20000mAh', 'Controller Wireless']
  const cities = ['Milano', 'Roma', 'Torino', 'Napoli', 'Bologna', 'Firenze', 'Verona', 'Padova']

  useEffect(() => {
    const showNotification = () => {
      const newNotification: Notification = {
        id: Date.now(),
        name: names[Math.floor(Math.random() * names.length)],
        product: products[Math.floor(Math.random() * products.length)],
        time: `${Math.floor(Math.random() * 10) + 1} min fa`,
      }

      setNotifications([newNotification])
      setVisible(true)

      setTimeout(() => {
        setVisible(false)
      }, 4000)
    }

    const interval = setInterval(showNotification, 8000)
    showNotification()

    return () => clearInterval(interval)
  }, [])

  if (!visible || notifications.length === 0) return null

  return (
    <div className="fixed bottom-24 left-6 z-50 transition-all duration-500 transform translate-x-0">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="bg-kobra-gray border border-kobra-green/20 rounded-xl p-4 shadow-lg shadow-kobra-green/10 max-w-xs"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-kobra-green/10 flex items-center justify-center shrink-0">
              <ShoppingCart size={18} className="text-kobra-green" />
            </div>
            <div>
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">{notif.name}</span> ha acquistato{' '}
                <span className="text-kobra-green font-medium">{notif.product}</span>
              </p>
              <div className="flex items-center gap-1 mt-1">
                <CheckCircle size={12} className="text-kobra-green" />
                <span className="text-xs text-gray-500">{notif.time}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
