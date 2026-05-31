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
              <a href="#" className="w-8 h-8 rounded bg-kobra-darkgray flex items-center justify-center hover:bg-kobra-green hover:text-kobra-black transition-all" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-kobra-darkgray flex items-center justify-center hover:bg-kobra-green hover:text-kobra-black transition-all" aria-label="YouTube">
                <Youtube size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-kobra-darkgray flex items-center justify-center hover:bg-kobra-green hover:text-kobra-black transition-all" aria-label="TikTok">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Categorie</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/pc-gaming/" className="hover:text-kobra-green transition-colors">PC Gaming</Link></li>
              <li><Link href="/laptop/" className="hover:text-kobra-green transition-colors">Laptop</Link></li>
              <li><Link href="/accessori/" className="hover:text-kobra-green transition-colors">Accessori</Link></li>
              <li><Link href="/console/" className="hover:text-kobra-green transition-colors">Console</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Assistenza</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/chi-siamo/" className="hover:text-kobra-green transition-colors">Chi Siamo</Link></li>
              <li><Link href="/contatti/" className="hover:text-kobra-green transition-colors">Contatti</Link></li>
              <li><Link href="/spedizioni/" className="hover:text-kobra-green transition-colors">Spedizioni</Link></li>
              <li><Link href="/resi/" className="hover:text-kobra-green transition-colors">Resi e Rimborsi</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legale</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/privacy/" className="hover:text-kobra-green transition-colors">Privacy Policy</Link></li>
              <li><Link href="/termini/" className="hover:text-kobra-green transition-colors">Termini e Condizioni</Link></li>
              <li><Link href="/reso/" className="hover:text-kobra-green transition-colors">Politica di Reso</Link></li>
              <li><Link href="/cookie/" className="hover:text-kobra-green transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-kobra-green/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-500">
              <p>© 2025 Kobra.gg — Tutti i diritti riservati.</p>
              <div className="flex items-center gap-3">
                <a href="mailto:nedelcaflorin@gmail.com" className="flex items-center gap-1 hover:text-kobra-green transition-colors">
                  <Mail size={14} />
                  nedelcaflorin@gmail.com
                </a>
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  Italia
                </span>
                <a href="https://wa.me/393791536175" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-kobra-green transition-colors">
                  <Phone size={14} />
                  +39 379 153 6175
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <CreditCard size={20} className="text-gray-500" />
              <Truck size={20} className="text-gray-500" />
              <ShieldCheck size={20} className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
