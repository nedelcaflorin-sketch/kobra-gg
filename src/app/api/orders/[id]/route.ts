import { NextRequest, NextResponse } from 'next/server'
import { getOrderById, updateOrderStatus, updateOrderTracking, invalidateCache } from '@/lib/db'

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    invalidateCache()
    const order = getOrderById(parseInt(params.id))
    if (!order) return NextResponse.json({ error: 'Ordine non trovato' }, { status: 404 })
    return NextResponse.json({ order })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Errore interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    invalidateCache()
    let order = null
    if (body.status !== undefined) {
      order = updateOrderStatus(id, body.status)
    }
    if (body.tracking !== undefined) {
      order = updateOrderTracking(id, body.tracking)
    }
    if (!order) return NextResponse.json({ error: 'Ordine non trovato' }, { status: 404 })
    return NextResponse.json({ order })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Errore interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
