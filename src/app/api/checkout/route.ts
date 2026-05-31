import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { addOrder, invalidateCache } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, email } = body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: { name: string; image?: string; price: number; quantity: number }) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : undefined,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL || 'https://kobra-gg.vercel.app'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://kobra-gg.vercel.app'}/carrello/`,
      customer_email: email,
      shipping_address_collection: {
        allowed_countries: ['IT', 'DE', 'FR', 'ES', 'NL', 'BE', 'AT'],
      },
      locale: 'it',
    })

    // Save pending order to DB
    try {
      const total = items.reduce(
        (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
        0
      )
      invalidateCache()
      addOrder({
        email: email || '',
        name: '',
        address: '',
        city: '',
        postal_code: '',
        country: 'IT',
        phone: null,
        total,
        status: 'pending',
        stripe_session_id: session.id,
        tracking: null,
      })
    } catch (dbError) {
      console.error('DB order save error:', dbError)
      // Don't block checkout if DB fails
    }

    return NextResponse.json({ url: session.url })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Errore interno'
    console.error('Stripe error:', error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
