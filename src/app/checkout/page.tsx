'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart'
import { Lock, CreditCard, Truck, Package } from 'lucide-react'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const shipping = total > 50 ? 0 : 5.99
  const finalTotal = total + shipping

  const handleCheckout = async () => {
    if (!email) {
      alert('Inserisci la tua email')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          email,
        }),
      })

      const data = await res.json()

      if (data.url) {
        clearCart()
        window.location.href = data.url
      } else {
        alert('Errore: ' + data.error)
      }
    } catch (err: any) {
      alert('Errore: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package size={64} className="text-kobra-green/30 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Carrello vuoto</h1>
          <p className="text-gray-400">Aggiungi prodotti prima di procedere.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <img src="/logo-main.png" alt="Kobra.gg" className="h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-display font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Left: Order Summary -->
          <div className="bg-kobra-gray rounded-xl border border-kobra-green/10 p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Package size={20} className="text-kobra-green" />
              Riepilogo Ordine
            </h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-kobra-green/10">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-kobra-green">{(item.price * item.quantity).toFixed(2)} €</p>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotale</span>
                <span>{total.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Spedizione</span>
                <span>{shipping === 0 ? 'Gratis' : `${shipping.toFixed(2)} €`}</span>
              </div>
              <div className="pt-2 border-t border-kobra-green/10 flex justify-between font-bold text-lg">
                <span>Totale</span>
                <span className="text-kobra-green">{finalTotal.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          <!-- Right: Payment -->
          <div className="space-y-6">
            <div className="bg-kobra-gray rounded-xl border border-kobra-green/10 p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-kobra-green" />
                Dati di contatto
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nome@email.com"
                    className="w-full px-4 py-3 bg-kobra-black border border-kobra-green/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-kobra-green"
                  />
                </div>
              </div>
            </div>

            <div className="bg-kobra-gray rounded-xl border border-kobra-green/10 p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Truck size={20} className="text-kobra-green" />
                Spedizione
              </h2>
              <p className="text-sm text-gray-400">
                Inserisci l'indirizzo di spedizione nel prossimo passaggio su Stripe.
              </p>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-kobra-green text-kobra-black font-bold rounded-lg hover:bg-kobra-green/90 transition-all disabled:opacity-50"
            >
              <Lock size={18} />
              {loading ? 'Caricamento...' : `Paga ${finalTotal.toFixed(2)} €`}
            </button>

            <p className="text-center text-xs text-gray-500">
              Sarai reindirizzato a Stripe per completare il pagamento in sicurezza.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
