import { NextRequest, NextResponse } from 'next/server'
import { updateProduct, deleteProduct, invalidateCache } from '@/lib/db'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    const updates = await request.json()
    invalidateCache()
    const product = updateProduct(id, updates)
    if (!product) return NextResponse.json({ error: 'Prodotto non trovato' }, { status: 404 })
    return NextResponse.json({ product })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Errore interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    invalidateCache()
    const ok = deleteProduct(id)
    if (!ok) return NextResponse.json({ error: 'Prodotto non trovato' }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Errore interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
