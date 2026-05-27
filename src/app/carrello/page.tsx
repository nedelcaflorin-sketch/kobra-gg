'use client'

import Link from 'next/link'
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { useCart } from '@/lib/cart'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, count } = useCart()

  const shipping = total > 50 ? 0 : 5.99

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20">
        <ShoppingCart size={64} className="text-kobra-green/30 mb-6" />
        <h1 className="text-2xl font-display font-bold mb-3">Il tuo carrello è vuoto</h1>
        <p className="text-gray-400 mb-8">Aggiungi qualche prodotto per iniziare.</p>
        <Link
          href="/accessori/"
          className="px-6 py-3 bg-kobra-green text-kobra-black font-bold rounded-lg hover:bg-kobra-green/90"
        >
          Esplora i Prodotti
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold mb-8">Il tuo <span className="text-kobra-green">Carrello</span> ({count})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-kobra-gray rounded-xl border border-kobra-green/10">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg bg-kobra-darkgray" />
                <div className="flex-1">
                  <Link href={`/prodotto/${item.slug}/`} className="font-semibold hover:text-kobra-green">{item.name}</Link>
                  <p className="text-kobra-green font-bold mt-1">{item.price.toFixed(2)}€</p>

                  <div className="flex items-center gap-3 mt-3">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded bg-kobra-darkgray hover:bg-kobra-green/20">
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded bg-kobra-darkgray hover:bg-kobra-green/20">
                      <Plus size={16} />
                    </button>
                    <button onClick={() => removeItem(item.id)} className="ml-auto p-2 text-red-400 hover:text-red-300">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-kobra-gray rounded-xl border border-kobra-green/10 p-6 h-fit">
            <h2 className="text-xl font-bold mb-6">Riepilogo</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotale</span>
                <span>{total.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Spedizione</span>
                <span>{shipping === 0 ? 'Gratis' : `${shipping.toFixed(2)}€`}</span>
              </div>
              <div className="pt-3 border-t border-kobra-green/10 flex justify-between font-bold text-lg">
                <span>Totale</span>
                <span className="text-kobra-green">{(total + shipping).toFixed(2)}€</span>
              </div>
            </div>

            <Link
              href="/checkout/"
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4 bg-kobra-green text-kobra-black font-bold rounded-lg hover:bg-kobra-green/90 transition-all"
            >
              Procedi al Pagamento
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
