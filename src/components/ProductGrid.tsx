'use client'

import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/lib/types'

interface ProductGridProps {
  category?: string
  bestsellerOnly?: boolean
  featuredOnly?: boolean
  limit?: number
}

export default function ProductGrid({ category, bestsellerOnly, featuredOnly, limit = 12 }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const params = new URLSearchParams()
        if (category) params.append('category', category)
        if (bestsellerOnly) params.append('bestseller', '1')
        if (featuredOnly) params.append('featured', '1')
        if (limit) params.append('limit', limit.toString())

        const res = await fetch(`/api/products?${params}`)
        const data = await res.json()
        setProducts(data.products || [])
      } catch {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [category, bestsellerOnly, featuredOnly, limit])

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: Math.min(limit, 8) }).map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-kobra-gray rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Nessun prodotto trovato.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
