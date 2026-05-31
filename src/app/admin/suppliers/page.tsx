'use client'

import { useState } from 'react'
import { Plus, Globe, Key, CheckCircle, XCircle } from 'lucide-react'
import { defaultSuppliers } from '@/lib/suppliers'

export default function AdminSuppliersPage() {
  const [suppliers, setSuppliers] = useState(defaultSuppliers)

  const toggleSupplier = (id: string) => {
    setSuppliers(prev => prev.map(s =>
      s.id === id ? { ...s, active: !s.active } : s
    ))
  }

  return (
    <div className="py-10 px-6">
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold">Fornitori Dropshipping</h1>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-kobra-green text-kobra-black font-bold rounded-lg hover:bg-kobra-green/90 text-sm"
          >
            <Plus size={16} />
            Aggiungi Fornitore
          </button>
        </div>

        <div className="space-y-4">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="bg-kobra-gray rounded-xl border border-kobra-green/10 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${supplier.active ? 'bg-kobra-green' : 'bg-gray-500'}`} />
                  <div>
                    <h3 className="text-lg font-bold">{supplier.name}</h3>
                    <p className="text-sm text-gray-400">{supplier.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {supplier.active ? (
                    <CheckCircle size={20} className="text-kobra-green" />
                  ) : (
                    <XCircle size={20} className="text-gray-500" />
                  )}
                  <button
                    onClick={() => toggleSupplier(supplier.id)}
                    className={`relative inline-flex w-12 h-6 rounded-full transition-colors ${
                      supplier.active ? 'bg-kobra-green' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform mt-0.5 ${
                        supplier.active ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {supplier.active && (
                <div className="mt-4 pt-4 border-t border-kobra-green/10 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Globe size={16} />
                    API: {supplier.apiUrl || 'Non configurato'}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Key size={16} />
                    Key: {supplier.apiKey ? '****' : 'Non impostata'}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-kobra-black border border-kobra-green/20 rounded-xl p-6">
          <h3 className="font-bold mb-3">Come funziona il dropshipping</h3>
          <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
            <li>Cliente ordina sul tuo sito e paga con Stripe</li>
            <li>Il sistema salva l&apos;ordine in stato &quot;pagato&quot;</li>
            <li>Inoltri l&apos;ordine manualmente al fornitore (Eprolo)</li>
            <li>Il fornitore spedisce direttamente al cliente</li>
            <li>Inserisci il tracking nell&apos;admin e aggiorna lo stato</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
