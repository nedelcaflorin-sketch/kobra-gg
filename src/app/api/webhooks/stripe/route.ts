import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getOrderBySessionId, updateOrderStatus, invalidateCache } from '@/lib/db'

interface StripeEvent {
  type: string
  data: {
    object: {
      id: string
      [key: string]: unknown
    }
  }
}

export async function POST(request: NextRequest) {
  const payload = await request.text()
  const sig = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event: StripeEvent

  if (webhookSecret && sig) {
    try {
      const stripeEvent = stripe.webhooks.constructEvent(payload, sig, webhookSecret)
      event = stripeEvent as unknown as StripeEvent
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Webhook error'
      console.error('Webhook signature verification failed:', message)
      return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
    }
  } else {
    try {
      event = JSON.parse(payload) as StripeEvent
    } catch {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }
    console.warn('STRIPE_WEBHOOK_SECRET non configurato - verifica firma saltata')
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    try {
      invalidateCache()
      const order = getOrderBySessionId(session.id)
      if (order) {
        updateOrderStatus(order.id, 'paid')
      } else {
        console.warn('Ordine non trovato per session_id:', session.id)
      }
    } catch (dbError) {
      console.error('DB update error:', dbError)
    }
  }

  return NextResponse.json({ received: true })
}
