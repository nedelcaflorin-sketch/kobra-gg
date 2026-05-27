import Link from 'next/link'
import { ArrowRight, Flame, ChevronRight, Star, Zap, Trophy } from 'lucide-react'
import ProductGrid from '@/components/ProductGrid'
import CountdownTimer from '@/components/CountdownTimer'
import LiveNotifications from '@/components/LiveNotifications'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-kobra-black">
      <LiveNotifications />

      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-kobra-green/5 via-kobra-black to-kobra-black"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-kobra-green/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-kobra-cyan/10 rounded-full blur-[120px] animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kobra-green/10 border border-kobra-green/30">
                <Flame size={16} className="text-kobra-green" />
                <span className="text-sm text-kobra-green font-bold tracking-wider uppercase">Offerta Lampo</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black leading-tight">
                <span className="text-white">DOMINA IL</span>
                <br />
                <span className="text-kobra-green text-glow-green">GIOCO</span>
              </h1>

              <p className="text-lg text-gray-400 max-w-lg mx-auto lg:mx-0">
                Equipaggiamento gaming professionale. Prezzi da Kobra, qualità da campione.
              </p>

              <div className="bg-kobra-gray/50 rounded-xl border border-kobra-green/20 p-4 inline-block">
                <p className="text-sm text-gray-400 mb-2">L'offerta scade tra:</p>
                <CountdownTimer />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/accessori/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-kobra-green text-kobra-black font-bold rounded-lg hover:bg-kobra-green/90 transition-all shadow-[0_0_30px_rgba(57,255,20,0.3)]"
                >
                  Esplora
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/pc-gaming/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-kobra-green/30 text-kobra-green font-bold rounded-lg hover:bg-kobra-green/10 transition-all"
                >
                  PC Gaming
                </Link>
              </div>

              <div className="flex items-center gap-6 justify-center lg:justify-start pt-4">
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-kobra-green fill-kobra-green" />
                  <span className="text-sm text-gray-400">4.9/5 Trustpilot</span>
                </div>
                <div className="w-px h-4 bg-kobra-green/20"></div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">50.000+ clienti</span>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-kobra-green/20 rounded-full blur-[80px]"></div>
              <img
                src="/logo-main.png"
                alt="Kobra.gg"
                className="relative w-full max-w-md drop-shadow-[0_0_60px_rgba(57,255,20,0.4)] animate-pulse"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-kobra-black to-transparent"></div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-kobra-green rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                In <span className="text-kobra-green">tendenza</span>
              </h2>
            </div>
            <Link href="/accessori/" className="text-sm text-kobra-green hover:text-kobra-green/80 flex items-center gap-1 transition-colors">
              Vedi tutti <ChevronRight size={16} />
            </Link>
          </div>
          <ProductGrid bestsellerOnly={true} limit={6} />
        </div>
      </section>

      <section className="py-16 bg-kobra-gray/10 border-y border-kobra-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Clienti soddisfatti' },
              { value: '4.9', label: 'Rating medio' },
              { value: '2-5g', label: 'Spedizione EU' },
              { value: '30gg', label: 'Reso gratuito' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-display font-black text-kobra-green">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-kobra-gray rounded-2xl border border-kobra-green/10 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Trophy size={24} className="text-kobra-green" />
                  <span className="text-sm text-kobra-green font-bold uppercase tracking-wider">Programma Fedeltà</span>
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-4">
                  Guadagna punti con ogni acquisto
                </h2>
                <p className="text-gray-400 mb-6">
                  Per ogni euro speso ricevi 1 punto. Accumula e riscatta sconti esclusivi, prodotti gratuiti e accesso anticipato alle offerte.
                </p>
                <div className="space-y-3">
                  {[
                    { icon: Zap, text: '1 punto per ogni € speso' },
                    { icon: Star, text: 'Sconti esclusivi dai 100 punti' },
                    { icon: Trophy, text: 'Accesso VIP alle offerte flash' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <item.icon size={18} className="text-kobra-green" />
                      <span className="text-sm text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-kobra-black rounded-xl border border-kobra-green/20 p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2">I tuoi punti attuali</p>
                  <p className="text-5xl font-display font-black text-kobra-green">0</p>
                  <p className="text-sm text-gray-500 mt-2">Inizia a fare acquisti per accumulare punti!</p>
                  <Link
                    href="/register/"
                    className="inline-block mt-4 px-6 py-3 bg-kobra-green text-kobra-black font-bold rounded-lg hover:bg-kobra-green/90 transition-all"
                  >
                    Registrati Ora
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
