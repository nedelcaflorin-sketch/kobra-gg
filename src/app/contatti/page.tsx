import type { Metadata } from 'next'
import { Mail, MessageCircle, Clock } from 'lucide-react'

export const metadata: Metadata = { title: 'Contatti | Kobra.gg' }

export default function ContattiPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display font-black text-white mb-2">Contatti</h1>
        <p className="text-gray-400 mb-12">Siamo qui per aiutarti. Rispondiamo entro 24-48 ore lavorative.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-kobra-gray rounded-xl border border-kobra-green/10 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-kobra-green/10 flex items-center justify-center">
              <Mail size={22} className="text-kobra-green" />
            </div>
            <h3 className="font-bold text-white mb-2">Email</h3>
            <a href="mailto:nedelcaflorin@gmail.com" className="text-kobra-green hover:underline text-sm break-all">
              nedelcaflorin@gmail.com
            </a>
          </div>
          <div className="p-6 bg-kobra-gray rounded-xl border border-kobra-green/10 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-kobra-green/10 flex items-center justify-center">
              <MessageCircle size={22} className="text-kobra-green" />
            </div>
            <h3 className="font-bold text-white mb-2">WhatsApp</h3>
            <a href="https://wa.me/393791536175" target="_blank" rel="noopener noreferrer" className="text-kobra-green hover:underline text-sm">
              +39 379 153 6175
            </a>
          </div>
          <div className="p-6 bg-kobra-gray rounded-xl border border-kobra-green/10 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-kobra-green/10 flex items-center justify-center">
              <Clock size={22} className="text-kobra-green" />
            </div>
            <h3 className="font-bold text-white mb-2">Orari</h3>
            <p className="text-gray-400 text-sm">Lun–Ven 9:00–18:00</p>
            <p className="text-gray-500 text-xs mt-1">Risposta entro 24–48h</p>
          </div>
        </div>

        <div className="bg-kobra-gray rounded-xl border border-kobra-green/10 p-8">
          <h2 className="text-xl font-bold text-white mb-4">Contattaci</h2>
          <p className="text-gray-400 mb-6">
            Scrivi direttamente a{' '}
            <a href="mailto:nedelcaflorin@gmail.com" className="text-kobra-green hover:underline font-medium">
              nedelcaflorin@gmail.com
            </a>{' '}
            oppure scrivici su{' '}
            <a href="https://wa.me/393791536175" target="_blank" rel="noopener noreferrer" className="text-kobra-green hover:underline font-medium">
              WhatsApp (+39 379 153 6175)
            </a>{' '}
            indicando:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm mb-6">
            <li>Il tuo numero d&apos;ordine</li>
            <li>Il tuo nome e cognome</li>
            <li>La descrizione del problema o della richiesta</li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:nedelcaflorin@gmail.com"
              className="inline-block px-6 py-3 bg-kobra-green text-kobra-black font-bold rounded-lg hover:bg-kobra-green/90 transition-all text-sm"
            >
              Invia Email
            </a>
            <a
              href="https://wa.me/393791536175"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 border border-kobra-green/30 text-kobra-green font-bold rounded-lg hover:bg-kobra-green/10 transition-all text-sm"
            >
              Apri WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
