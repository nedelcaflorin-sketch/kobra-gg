'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Lock, CreditCard } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_live_51TbpboJ7xbjJn8pAYIY49KcxA5akzIFmmvgJ8r89vts5k5ZfNdwh579oz5U8dyIfJYucDAElkTt7KUHkzsFEO94j00iAQtFMQh')

function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError('')

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    })

    if (submitError) {
      setError(submitError.message || 'Errore nel pagamento')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-kobra-gray rounded-xl border border-kobra-green/10 p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <CreditCard size={20} className="text-kobra-green" />
          Dati di pagamento
        </h2>
        <div className="p-4 bg-kobra-black rounded-lg border border-kobra-green/20">
          <PaymentElement />
        </div>
      </div>

      <div className="bg-kobra-gray rounded-xl border border-kobra-green/10 p-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Totale</span>
          <span className="text-2xl font-bold text-kobra-green">{amount.toFixed(2)} €</span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-kobra-green text-kobra-black font-bold rounded-lg hover:bg-kobra-green/90 transition-all disabled:opacity-50"
      >
        <Lock size={18} />
        {loading ? 'Elaborazione...' : `Paga ${amount.toFixed(2)} €`}
      </button>
    </form>
  )
}

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('')
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('kobra-cart') || '[]')
    const total = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    setAmount(total)

    if (total > 0) {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) setClientSecret(data.clientSecret)
        })
    }
  }, [])

  if (!clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <img src="/logo-main.png" alt="Kobra.gg" className="h-16 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-400">Caricamento pagamento...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <img src="/logo-main.png" alt="Kobra.gg" className="h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-display font-bold text-white">Checkout</h1>
          <p className="text-gray-400 mt-2">Completa il pagamento in sicurezza</p>
        </div>

        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm amount={amount} />
        </Elements>
      </div>
    </div>
  )
}
