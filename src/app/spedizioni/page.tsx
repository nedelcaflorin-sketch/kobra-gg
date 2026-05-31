import type { Metadata } from 'next'
import { Truck, Clock, Globe, Package } from 'lucide-react'

export const metadata: Metadata = { title: 'Informazioni Spedizioni | Kobra.gg' }

export default function SpedizioniPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display font-black text-white mb-2">Informazioni Spedizioni</h1>
        <p className="text-gray-400 mb-10">Tutto quello che devi sapere sulla consegna dei tuoi ordini</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {[
            { icon: Clock, title: 'Tempi di Consegna', desc: '3–15 giorni lavorativi dalla conferma ordine' },
            { icon: Globe, title: 'Spedizione EU', desc: 'Spediamo in Italia, Germania, Francia, Spagna, Olanda, Belgio, Austria e altri paesi UE' },
            { icon: Package, title: 'Tracking', desc: 'Riceverai il codice di tracciamento via email appena il tuo ordine viene spedito' },
            { icon: Truck, title: 'Costo Spedizione', desc: 'Calcolato al checkout in base al paese di destinazione e al peso del prodotto' },
          ].map((item) => (
            <div key={item.title} className="p-5 bg-kobra-gray rounded-xl border border-kobra-green/10 flex gap-4">
              <item.icon size={24} className="text-kobra-green flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Modello Dropshipping</h2>
            <p>Kobra.gg opera secondo un modello <strong className="text-white">dropshipping</strong>: i prodotti vengono spediti direttamente dai nostri fornitori al tuo indirizzo. Questo ci permette di offrire una vasta gamma di prodotti a prezzi competitivi, senza intermediari.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Tempi Stimati per Paese</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-kobra-green/10 rounded-lg overflow-hidden">
                <thead className="bg-kobra-black">
                  <tr>
                    <th className="text-left p-3 text-gray-400">Paese</th>
                    <th className="text-left p-3 text-gray-400">Giorni lavorativi</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Italia', '5–12 giorni'],
                    ['Germania', '7–14 giorni'],
                    ['Francia', '7–14 giorni'],
                    ['Spagna', '7–15 giorni'],
                    ['Altri paesi UE', '8–15 giorni'],
                  ].map(([paese, giorni]) => (
                    <tr key={paese} className="border-t border-kobra-green/10">
                      <td className="p-3">{paese}</td>
                      <td className="p-3 text-kobra-green">{giorni}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-3">I tempi sono stimati e possono variare in base alla disponibilità del prodotto e al corriere.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Problemi con la Spedizione?</h2>
            <p>Se il tuo ordine non arriva entro i tempi previsti o hai problemi con il tracking, contattaci a <a href="mailto:kobra.gg.support@gmail.com" className="text-kobra-green hover:underline">kobra.gg.support@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
