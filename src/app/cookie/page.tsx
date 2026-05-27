export default function CookiePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold mb-8">Cookie Policy</h1>

        <div className="space-y-6 text-gray-300">
          <p>Ultimo aggiornamento: 27 maggio 2025</p>

          <h2 className="text-xl font-bold text-white mt-8">Cosa sono i Cookie</h2>
          <p>I cookie sono piccoli file di testo che i siti web memorizzano sul tuo dispositivo per migliorare l'esperienza di navigazione.</p>

          <h2 className="text-xl font-bold text-white mt-8">Cookie che Utilizziamo</h2>
          <table className="w-full text-sm border border-kobra-green/10 rounded-lg overflow-hidden">
            <thead className="bg-kobra-gray">
              <tr>
                <th className="text-left p-3">Cookie</th>
                <th className="text-left p-3">Tipo</th>
                <th className="text-left p-3">Scopo</th>
                <th className="text-left p-3">Durata</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-kobra-green/10">
              <tr>
                <td className="p-3">session</td>
                <td className="p-3">Tecnico</td>
                <td className="p-3">Mantiene la sessione di navigazione</td>
                <td className="p-3">Sessione</td>
              </tr>
              <tr>
                <td className="p-3">cart</td>
                <td className="p-3">Tecnico</td>
                <td className="p-3">Memorizza il carrello</td>
                <td className="p-3">30 giorni</td>
              </tr>
              <tr>
                <td className="p-3">language</td>
                <td className="p-3">Tecnico</td>
                <td className="p-3">Memorizza la lingua preferita</td>
                <td className="p-3">1 anno</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-xl font-bold text-white mt-8">Come Gestire i Cookie</h2>
          <p>Puoi gestire o disattivare i cookie dalle impostazioni del tuo browser. Tieni presente che la disattivazione dei cookie tecnici potrebbe compromettere il funzionamento del sito.</p>
        </div>
      </div>
    </div>
  )
}
