import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Resi e Rimborsi | Kobra.gg' }

export default function ResiPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display font-black text-white mb-2">Resi e Rimborsi</h1>
        <p className="text-gray-400 mb-10">Politica di reso conforme alla Direttiva UE 2011/83/UE e al D.Lgs. 206/2005</p>
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Diritto di Recesso — 14 Giorni</h2>
            <p>Ai sensi della normativa europea vigente, hai il diritto di recedere dal contratto di acquisto entro <strong className="text-white">14 giorni</strong> dalla ricezione del prodotto, senza dover fornire alcuna motivazione e senza costi aggiuntivi.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Condizioni per il Reso</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Il prodotto deve essere integro e in condizioni originali</li>
              <li>Deve essere restituito nella confezione originale, sigillata o integra</li>
              <li>Deve includere tutti gli accessori, manuali e componenti originali</li>
              <li>La richiesta deve essere inviata entro 14 giorni dalla ricezione</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Come Effettuare un Reso</h2>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>Invia una email a <a href="mailto:nedelcaflorin@gmail.com" className="text-kobra-green hover:underline">nedelcaflorin@gmail.com</a> con oggetto <strong className="text-white">"Richiesta Reso"</strong> e il numero del tuo ordine.</li>
              <li>Il nostro team ti risponderà entro 48 ore con le istruzioni e l'indirizzo di reso.</li>
              <li>Imballa accuratamente il prodotto e spediscilo all'indirizzo indicato (le spese di spedizione del reso sono a carico del cliente, salvo prodotto difettoso).</li>
              <li>Una volta ricevuto e verificato il prodotto, procederemo con il rimborso.</li>
            </ol>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Tempi e Modalità di Rimborso</h2>
            <p>Il rimborso verrà effettuato entro <strong className="text-white">14 giorni lavorativi</strong> dalla ricezione del prodotto restituito, utilizzando lo stesso metodo di pagamento dell'acquisto originale (carta di credito/debito via Stripe).</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Prodotti Difettosi o Errati</h2>
            <p>Se hai ricevuto un prodotto difettoso o diverso da quello ordinato, contattaci immediatamente. In questo caso, le spese di reso sono a nostro carico e provvederemo alla sostituzione o al rimborso completo.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Eccezioni al Diritto di Recesso</h2>
            <p>Non è possibile effettuare il reso per: prodotti danneggiati dall'utente, articoli personalizzati su richiesta, o prodotti sigillati che non possono essere restituiti per motivi igienici una volta aperti.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Contatti</h2>
            <p>Per qualsiasi richiesta: <a href="mailto:nedelcaflorin@gmail.com" className="text-kobra-green hover:underline">nedelcaflorin@gmail.com</a></p>
          </section>
        </div>
      </div>
    </div>
  )
}
