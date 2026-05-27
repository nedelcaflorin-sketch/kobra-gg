export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-gray-300">
          <p>Ultimo aggiornamento: 27 maggio 2025</p>

          <h2 className="text-xl font-bold text-white mt-8">1. Titolare del Trattamento</h2>
          <p>Il titolare del trattamento dei dati personali è Kobra.gg, con sede in Italia.</p>

          <h2 className="text-xl font-bold text-white mt-8">2. Dati Raccolti</h2>
          <p>Raccogliamo i seguenti dati personali:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Dati di contatto (nome, email, indirizzo, telefono)</li>
            <li>Dati di pagamento (gestiti esclusivamente da Stripe)</li>
            <li>Dati di navigazione (cookie tecnici)</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">3. Finalità del Trattamento</h2>
          <p>I dati vengono trattati per:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Evasione degli ordini</li>
            <li>Spedizione dei prodotti</li>
            <li>Assistenza clienti</li>
            <li>Oblighi legali fiscali</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">4. Diritti dell'Interessato</h2>
          <p>Hai diritto di accesso, retifica, cancellazione, limitazione, opposizione e portabilità dei dati. Per esercitare i tuoi diritti, contattaci a support@kobra.gg.</p>

          <h2 className="text-xl font-bold text-white mt-8">5. Conservazione</h2>
          <p>I dati vengono conservati per il tempo necessario alle finalità indicate e per gli obblighi legali (10 anni per fatturazione).</p>
        </div>
      </div>
    </div>
  )
}
