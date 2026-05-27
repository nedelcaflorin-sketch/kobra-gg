import { Trophy, Truck, Headphones, ShieldCheck, Users, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <img src="/logo-main.png" alt="Kobra.gg" className="h-20 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Chi Siamo
          </h1>
          <p className="text-xl text-gray-400">
            Il tuo partner gaming di fiducia in Europa
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-kobra-gray rounded-2xl border border-kobra-green/10 p-8">
            <h2 className="text-2xl font-display font-bold text-kobra-green mb-4">La Nostra Storia</h2>
            <p className="text-gray-300 leading-relaxed">
              Kobra.gg nasce dalla passione per il gaming. Siamo un team di gamer appassionati che ha deciso di creare 
              il negozio che avremmo sempre voluto: prezzi bassi, prodotti di qualità, spedizione veloce e un supporto 
              che parla la tua lingua. Dal 2025 serviamo migliaia di clienti in tutta Europa.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Trophy, title: 'Qualità Garantita', desc: 'Tutti i prodotti sono testati e selezionati dal nostro team.' },
              { icon: Truck, title: 'Spedizione Veloce', desc: 'Consegna in 2-5 giorni in tutta l\'UE.' },
              { icon: Headphones, title: 'Supporto 24/7', desc: 'Team italiano pronto ad aiutarti via chat e email.' },
              { icon: ShieldCheck, title: 'Pagamento Sicuro', desc: 'Stripe e SSL per transazioni protette al 100%.' },
              { icon: Users, title: '50.000+ Clienti', desc: 'Una community in continua crescita.' },
              { icon: Zap, title: 'Prezzi da Kobra', desc: 'I migliori prezzi sul mercato, garantiti.' },
            ].map((item) => (
              <div key={item.title} className="bg-kobra-gray rounded-xl border border-kobra-green/10 p-6">
                <item.icon size={32} className="text-kobra-green mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </section>

          <section className="bg-kobra-gray rounded-2xl border border-kobra-green/10 p-8 text-center">
            <h2 className="text-2xl font-display font-bold text-white mb-4">Unisciti alla Community</h2>
            <p className="text-gray-400 mb-6">
              Seguici sui social per offerte esclusive, giveaway e novità dal mondo gaming.
            </p>
            <div className="flex justify-center gap-4">
              {['Instagram', 'TikTok', 'Discord', 'YouTube'].map((social) => (
                <span key={social} className="px-4 py-2 bg-kobra-black rounded-lg text-kobra-green font-semibold text-sm">
                  {social}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
