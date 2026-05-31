import { NextRequest, NextResponse } from 'next/server'
import { getProducts, getProductBySlug, addProduct, invalidateCache } from '@/lib/db'

function toSlug(n: string) {
  return n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, original_price, category, subcategory, image, stock, tags, featured, bestseller } = body
    if (!name || !price) {
      return NextResponse.json({ error: 'name e price richiesti' }, { status: 400 })
    }

    invalidateCache()
    const product = addProduct({
      slug: toSlug(name),
      name,
      description: description || '',
      price: parseFloat(price),
      original_price: original_price ? parseFloat(original_price) : null,
      category: category || 'accessori',
      subcategory: subcategory || null,
      image: image || '/placeholder.jpg',
      stock: parseInt(stock) || 0,
      tags: tags || null,
      featured: featured ? 1 : 0,
      bestseller: bestseller ? 1 : 0,
    })
    return NextResponse.json({ product }, { status: 201 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Errore interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
