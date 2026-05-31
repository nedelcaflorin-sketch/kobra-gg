import { NextRequest, NextResponse } from 'next/server'
import { getOrders, addOrder, invalidateCache } from '@/lib/db'

export async function GET() {
  try {
    invalidateCache()
    const orders = getOrders()
    return NextResponse.json({ orders })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Errore interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    invalidateCache()
    const order = addOrder({
      email: body.email || '',
      name: body.name || '',
      address: body.address || '',
      city: body.city || '',
      postal_code: body.postal_code || '',
      country: body.country || 'IT',
      phone: body.phone || null,
      total: parseFloat(body.total) || 0,
      status: body.status || 'pending',
      stripe_session_id: body.stripe_session_id || null,
      tracking: body.tracking || null,
    })
    return NextResponse.json({ order }, { status: 201 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Errore interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
