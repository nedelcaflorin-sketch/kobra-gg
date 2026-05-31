import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy | Kobra.gg' }

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-400 mb-10">Ultima modifica: gennaio 2025 — Informativa ai sensi del GDPR (Reg. UE 2016/679)</p>
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Titolare del Trattamento</h2>
            <p>Kobra.gg, Italia. Contatto: <a href="mailto:nedelcaflorin@gmail.com" className="text-kobra-green hover:underline">nedelcaflorin@gmail.com</a></p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Dati Raccolti</h2>
            <p>Raccogliamo i seguenti dati personali:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Dati di contatto: nome, indirizzo email, indirizzo di spedizione, numero di telefono</li>
              <li>Dati di pagamento: gestiti esclusivamente da Stripe (non memorizziamo i dati della carta)</li>
              <li>Dati di navigazione: cookie tecnici e statistici (vedi Cookie Policy)</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Finalità e Base Giuridica</h2>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Evasione degli ordini e spedizione — base: esecuzione del contratto</li>
              <li>Assistenza clienti — base: legittimo interesse</li>
              <li>Obblighi fiscali e legali — base: obbligo di legge</li>
              <li>Marketing (solo con consenso esplicito) — base: consenso</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Condivisione dei Dati</h2>
            <p>Condividiamo i tuoi dati solo con i nostri fornitori di servizi strettamente necessari: corrieri per la spedizione, Stripe per i pagamenti, Vercel per l'hosting. Non vendiamo i tuoi dati a terzi.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Conservazione</h2>
            <p>I dati vengono conservati per il tempo necessario alle finalità indicate e per gli obblighi legali (10 anni per dati di fatturazione).</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. I Tuoi Diritti (GDPR)</h2>
            <p>Hai il diritto di: accesso, rettifica, cancellazione ("diritto all'oblio"), limitazione del trattamento, portabilità dei dati, opposizione al trattamento. Per esercitare questi diritti contattaci a <a href="mailto:nedelcaflorin@gmail.com" className="text-kobra-green hover:underline">nedelcaflorin@gmail.com</a>. Hai anche il diritto di presentare reclamo all'Autorità Garante per la Protezione dei Dati Personali (www.garanteprivacy.it).</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Cookie</h2>
            <p>Utilizziamo cookie tecnici necessari al funzionamento del sito. Per maggiori informazioni consulta la nostra <a href="/cookie/" className="text-kobra-green hover:underline">Cookie Policy</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
