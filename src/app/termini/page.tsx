import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Termini e Condizioni | Kobra.gg' }

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display font-black text-white mb-2">Termini e Condizioni</h1>
        <p className="text-gray-400 mb-10">Ultima modifica: gennaio 2025</p>
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Informazioni Generali</h2>
            <p>Il sito Kobra.gg è un negozio online di accessori gaming. Accedendo e acquistando su questo sito, accetti i presenti Termini e Condizioni. Ti invitiamo a leggerli attentamente prima di effettuare un ordine.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Prodotti e Prezzi</h2>
            <p>I prezzi sono espressi in Euro (€) e includono l'IVA applicabile. Ci riserviamo il diritto di modificare i prezzi in qualsiasi momento. Il prezzo applicato sarà quello indicato al momento della conferma dell'ordine.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Ordini e Contratto</h2>
            <p>Inviando un ordine, l'utente fa un'offerta d'acquisto vincolante. Il contratto si considera concluso al momento della conferma via email. Ci riserviamo il diritto di rifiutare ordini in caso di indisponibilità dei prodotti o sospetta frode.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Pagamento</h2>
            <p>Accettiamo pagamenti tramite carta di credito/debito, elaborati in modo sicuro da Stripe. Kobra.gg non memorizza i dati della tua carta di pagamento. Il pagamento deve essere effettuato integralmente al momento dell'ordine.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Spedizione e Consegna</h2>
            <p>Spediamo in tutta Europa. I tempi di consegna stimati sono di 3-15 giorni lavorativi dalla conferma dell'ordine. Essendo un servizio dropshipping, i prodotti vengono spediti direttamente dai nostri fornitori. Non siamo responsabili di ritardi causati da corrieri o eventi di forza maggiore.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Diritto di Recesso (14 giorni)</h2>
            <p>Ai sensi del D.Lgs. 206/2005 (Codice del Consumo), hai il diritto di recedere dal contratto entro 14 giorni dalla ricezione del prodotto, senza dover fornire alcuna motivazione. Per esercitare il diritto di recesso, contattaci a <a href="mailto:nedelcaflorin@gmail.com" className="text-kobra-green hover:underline">nedelcaflorin@gmail.com</a>. Consulta la nostra <a href="/resi/" className="text-kobra-green hover:underline">Politica di Reso</a> per i dettagli.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Garanzia Legale</h2>
            <p>I prodotti venduti sono coperti dalla garanzia legale di conformità prevista dal D.Lgs. 206/2005 per 2 anni dall'acquisto.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Limitazione di Responsabilità</h2>
            <p>Kobra.gg non sarà responsabile per danni indiretti, incidentali o consequenziali derivanti dall'uso dei prodotti acquistati o dall'utilizzo del sito web.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Risoluzione delle Controversie</h2>
            <p>Le parti si impegnano a tentare una soluzione amichevole per qualsiasi controversia. La piattaforma ODR dell'UE è disponibile su <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-kobra-green hover:underline">ec.europa.eu/consumers/odr</a>.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. Legge Applicabile</h2>
            <p>I presenti Termini sono regolati dalla legge italiana. La giurisdizione competente è quella italiana.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">11. Contatti</h2>
            <p>Per domande: <a href="mailto:nedelcaflorin@gmail.com" className="text-kobra-green hover:underline">nedelcaflorin@gmail.com</a> — WhatsApp: <a href="https://wa.me/393791536175" target="_blank" rel="noopener noreferrer" className="text-kobra-green hover:underline">+39 379 153 6175</a></p>
          </section>
        </div>
      </div>
    </div>
  )
}
