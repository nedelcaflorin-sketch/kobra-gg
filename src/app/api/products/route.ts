import { NextRequest, NextResponse } from 'next/server'
import { getProducts, getProductBySlug } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || undefined
    const bestseller = searchParams.get('bestseller') === '1'
    const featured = searchParams.get('featured') === '1'
    const limit = parseInt(searchParams.get('limit') || '50')
    const slug = searchParams.get('slug') || undefined

    if (slug) {
      const product = getProductBySlug(slug)
      return NextResponse.json({ product })
    }

    const products = getProducts({ category, bestseller, featured, limit })
    return NextResponse.json({ products })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ products: [] }, { status: 500 })
  }
}
