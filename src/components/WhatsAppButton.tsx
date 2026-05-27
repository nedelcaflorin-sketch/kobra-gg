'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/393XXXXXXXXX?text=Ciao%20Kobra.gg!%20Ho%20una%20domanda."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-kobra-green rounded-full shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] hover:scale-110 transition-all duration-300"
    >
      <MessageCircle size={28} className="text-kobra-black" />
    </a>
  )
}
