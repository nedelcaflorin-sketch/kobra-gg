import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, email, shipping } = body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL || 'https://kobra.gg'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://kobra.gg'}/carrello/`,
      customer_email: email,
      shipping_address_collection: {
        allowed_countries: ['IT', 'DE', 'FR', 'ES', 'NL', 'BE', 'AT'],
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error('Stripe error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
