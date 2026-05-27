export default function ReturnsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold mb-8">Reso e Rimborsi</h1>

        <div className="space-y-6 text-gray-300">
          <h2 className="text-xl font-bold text-white mt-8">Diritto di Recesso</h2>
          <p>Hai diritto di recedere dall'acquisto entro 30 giorni dalla ricezione del prodotto, senza dover fornire alcuna motivazione.</p>

          <h2 className="text-xl font-bold text-white mt-8">Condizioni per il Reso</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Il prodotto deve essere integro e non usato</li>
            <li>Deve essere restituito nella confezione originale</li>
            <li>Deve includere tutti gli accessori e i manuali</li>
            <li>La richiesta di reso deve essere effettuata entro 30 giorni</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">Come Effettuare un Reso</h2>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Invia una email a support@kobra.gg con oggetto "Richiesta Reso" e il numero ordine</li>
            <li>Riceverai le istruzioni e l'etichetta di reso gratuita</li>
            <li>Imballa il prodotto e applica l'etichetta</li>
            <li>Consegna il pacco al corriere indicato</li>
          </ol>

          <h2 className="text-xl font-bold text-white mt-8">Rimborso</h2>
          <p>Il rimborso verrà effettuato entro 14 giorni lavorativi dalla ricezione del prodotto restituito, utilizzando lo stesso metodo di pagamento dell'acquisto originale.</p>

          <h2 className="text-xl font-bold text-white mt-8">Eccezioni</h2>
          <p>Non è possibile effettuare il reso per prodotti danneggiati dall'utente o per articoli personalizzati su richiesta.</p>
        </div>
      </div>
    </div>
  )
}
