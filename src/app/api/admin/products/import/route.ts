import { NextRequest, NextResponse } from 'next/server'
import { importCsvProducts, invalidateCache } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { csvText } = await request.json()
    if (!csvText || typeof csvText !== 'string') {
      return NextResponse.json({ error: 'csvText richiesto' }, { status: 400 })
    }
    invalidateCache()
    const result = importCsvProducts(csvText)
    return NextResponse.json(result)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Errore interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
