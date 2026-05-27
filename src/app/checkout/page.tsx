'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { CreditCard, Lock, Truck, ShieldCheck } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_live_51TbpboJ7xbjJn8pAYIY49KcxA5akzIFmmvgJ8r89vts5k5ZfNdwh579oz5U8dyIfJYucDAElkTt7KUHkzsFEO94j00iAQtFMQh')

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError('')

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      })

      if (submitError) {
        setError(submitError.message || 'Errore nel pagamento')
      }
    } catch (err: any) {
      setError(err.message || 'Errore sconosciuto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-kobra-gray rounded-xl border border-kobra-green/10 p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <CreditCard size={20} className="text-kobra-green" />
          Dati della carta
        </h2>

        <div className="p-4 bg-kobra-black rounded-lg border border-kobra-green/20">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#ffffff',
                  '::placeholder': { color: '#6b7280' },
                },
              },
            }}
          />
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
        {loading ? 'Elaborazione...' : 'Paga Ora'}
      </button>

      <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <ShieldCheck size={14} /> SSL Sicuro
        </span>
        <span className="flex items-center gap-1">
          <Lock size={14} /> Stripe
        </span>
      </div>
    </form>
  )
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <img src="/logo-main.png" alt="Kobra.gg" className="h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-display font-bold text-white">Checkout</h1>
          <p className="text-gray-400 mt-2">Completa il pagamento in sicurezza</p>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  )
}
