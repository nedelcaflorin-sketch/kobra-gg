import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Politica di Reso | Kobra.gg' }

export default function ResiPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display font-black text-white mb-2">Politica di Reso</h1>
        <p className="text-gray-400 mb-10">Conforme alla Direttiva UE 2011/83/UE e al D.Lgs. 206/2005</p>
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Diritto di Recesso — 14 Giorni</h2>
            <p>Hai il diritto di recedere dal contratto di acquisto entro <strong className="text-white">14 giorni</strong> dalla ricezione del prodotto, senza dover fornire alcuna motivazione.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Condizioni</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Prodotto integro e in condizioni originali</li>
              <li>Confezione originale integra con tutti gli accessori</li>
              <li>Richiesta inviata entro 14 giorni dalla ricezione</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Come fare un Reso</h2>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>Contatta <a href="mailto:kobra.gg.support@gmail.com" className="text-kobra-green hover:underline">kobra.gg.support@gmail.com</a> con il numero ordine</li>
              <li>Attendi le istruzioni (risposta entro 48h)</li>
              <li>Spedisci il prodotto all'indirizzo indicato</li>
              <li>Ricevi il rimborso entro 14 giorni lavorativi</li>
            </ol>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Rimborso</h2>
            <p>Il rimborso avviene con lo stesso metodo di pagamento usato all'acquisto, entro 14 giorni lavorativi dalla ricezione del reso.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
