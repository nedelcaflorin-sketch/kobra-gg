import Link from 'next/link'
import { Mail, MapPin, Phone, CreditCard, Truck, ShieldCheck, Instagram, Youtube, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-kobra-gray border-t border-kobra-green/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src="/logo-main.png" alt="Kobra.gg" className="h-10 w-auto mb-4" />
            <p className="text-sm text-gray-400 mb-4">
              Gaming gear ai prezzi da Kobra. Spedizione in tutta Europa.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded bg-kobra-darkgray flex items-center justify-center hover:bg-kobra-green hover:text-kobra-black transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-kobra-darkgray flex items-center justify-center hover:bg-kobra-green hover:text-kobra-black transition-all">
                <Youtube size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-kobra-darkgray flex items-center justify-center hover:bg-kobra-green hover:text-kobra-black transition-all">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Categorie</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/pc-gaming/" className="hover:text-kobra-green">PC Gaming</Link></li>
              <li><Link href="/laptop/" className="hover:text-kobra-green">Laptop</Link></li>
              <li><Link href="/accessori/" className="hover:text-kobra-green">Accessori</Link></li>
              <li><Link href="/console/" className="hover:text-kobra-green">Console</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Assistenza</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/chi-siamo/" className="hover:text-kobra-green">Chi Siamo</Link></li>
              <li><Link href="/privacy/" className="hover:text-kobra-green">Privacy Policy</Link></li>
              <li><Link href="/termini/" className="hover:text-kobra-green">Termini e Condizioni</Link></li>
              <li><Link href="/reso/" className="hover:text-kobra-green">Reso e Rimborsi</Link></li>
              <li><Link href="/cookie/" className="hover:text-kobra-green">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contatti</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-kobra-green" />
                support@kobra.gg
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-kobra-green" />
                Italia, Spedizione EU
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-kobra-green" />
                WhatsApp Support
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-kobra-green/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2025 Kobra.gg — Tutti i diritti riservati.</p>
          <div className="flex items-center gap-4">
            <CreditCard size={20} className="text-gray-500" />
            <Truck size={20} className="text-gray-500" />
            <ShieldCheck size={20} className="text-gray-500" />
          </div>
        </div>
      </div>
    </footer>
  )
}
