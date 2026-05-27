'use client'

import Link from 'next/link'
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Cuffie Gaming RGB Kobra X1',
      price: 29.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200',
    },
  ])

  const updateQty = (id: number, delta: number) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ))
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping

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
        <h1 className="text-3xl font-display font-bold mb-8">Il tuo <span className="text-kobra-green">Carrello</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-kobra-gray rounded-xl border border-kobra-green/10">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg bg-kobra-darkgray" />
                <div className="flex-1">
                  <Link href={`/prodotto/${item.id}/`} className="font-semibold hover:text-kobra-green">{item.name}</Link>
                  <p className="text-kobra-green font-bold mt-1">{item.price.toFixed(2)}€</p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="p-1 rounded bg-kobra-darkgray hover:bg-kobra-green/20"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="p-1 rounded bg-kobra-darkgray hover:bg-kobra-green/20"
                    >
                      <Plus size={16} />
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto p-2 text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-kobra-gray rounded-xl border border-kobra-green/10 p-6 h-fit">
            <h2 className="text-xl font-bold mb-6">Riepilogo</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotale</span>
                <span>{subtotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Spedizione</span>
                <span>{shipping === 0 ? 'Gratis' : `${shipping.toFixed(2)}€`}</span>
              </div>
              <div className="pt-3 border-t border-kobra-green/10 flex justify-between font-bold text-lg">
                <span>Totale</span>
                <span className="text-kobra-green">{total.toFixed(2)}€</span>
              </div>
            </div>

            <Link
              href="/checkout/"
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4 bg-kobra-green text-kobra-black font-bold rounded-lg hover:bg-kobra-green/90 transition-all"
            >
              Procedi al Pagamento
              <ArrowRight size={20} />
            </Link>

            <p className="text-xs text-gray-500 text-center mt-4">
              {shipping > 0 && `Aggiungi altri ${(50 - subtotal).toFixed(2)}€ per la spedizione gratuita!`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
