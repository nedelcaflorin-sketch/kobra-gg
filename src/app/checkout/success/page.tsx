'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, Mail } from 'lucide-react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [orderId, setOrderId] = useState<number | null>(null)

  useEffect(() => {
    if (!sessionId) return
    // Fetch orders to find the one matching the session
    fetch('/api/orders')
      .then((r) => r.json())
      .then((data: { orders?: Array<{ id: number; stripe_session_id: string }> }) => {
        const matched = data.orders?.find(
          (o) => o.stripe_session_id === sessionId
        )
        if (matched) setOrderId(matched.id)
      })
      .catch(() => null)
  }, [sessionId])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-kobra-green/10 border border-kobra-green/30 flex items-center justify-center">
          <CheckCircle size={48} className="text-kobra-green" />
        </div>

        <h1 className="text-3xl font-display font-black text-white mb-3">
          Ordine Confermato!
        </h1>

        {orderId && (
          <p className="text-kobra-green font-mono text-lg mb-2">
            #{String(orderId).padStart(4, '0')}
          </p>
        )}

        <p className="text-gray-400 mb-8 leading-relaxed">
          Grazie per il tuo acquisto su Kobra.gg!<br />
          Ti abbiamo inviato una email di conferma con i dettagli del tuo ordine.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-kobra-gray rounded-xl border border-kobra-green/10 flex items-center gap-3">
            <Package size={20} className="text-kobra-green flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm font-semibold text-white">Spedizione</p>
              <p className="text-xs text-gray-400">3-15 giorni lavorativi</p>
            </div>
          </div>
          <div className="p-4 bg-kobra-gray rounded-xl border border-kobra-green/10 flex items-center gap-3">
            <Mail size={20} className="text-kobra-green flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm font-semibold text-white">Email di conferma</p>
              <p className="text-xs text-gray-400">Controlla la tua casella</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-kobra-green text-kobra-black font-bold rounded-lg hover:bg-kobra-green/90 transition-all"
          >
            Continua lo Shopping
          </Link>
          <Link
            href="/contatti/"
            className="px-6 py-3 border border-kobra-green/30 text-kobra-green font-bold rounded-lg hover:bg-kobra-green/10 transition-all"
          >
            Contattaci
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-kobra-green border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
