'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCart } from '@/lib/cart'
import { useState } from 'react'
import StarRating from './StarRating'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)
  const { addItem } = useCart()

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null

  const stockDisplay =
    product.stock <= 10
      ? { text: `Solo ${product.stock} rimasti`, color: 'text-red-400', urgent: true }
      : product.stock <= 30
      ? { text: 'In esaurimento', color: 'text-yellow-400', urgent: false }
      : null

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <div className="group flex flex-col w-full min-w-0 bg-kobra-black rounded-xl border border-kobra-green/10 hover:border-kobra-green/40 transition-all overflow-hidden">
      {/* Image */}
      <Link href={`/prodotto/${product.slug}/`} className="relative w-full aspect-square bg-kobra-gray overflow-hidden block">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <span className="text-4xl">🎮</span>
          </div>
        )}
        {discount && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-kobra-green text-kobra-black text-xs font-bold rounded">
            -{discount}%
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 sm:p-4 gap-2 min-w-0">
        {/* Category */}
        <p className="text-xs text-gray-500 truncate">{product.subcategory || product.category}</p>

        {/* Name */}
        <Link href={`/prodotto/${product.slug}/`}>
          <h3 className="text-sm sm:text-base font-bold leading-snug group-hover:text-kobra-green transition-colors line-clamp-2 min-w-0">
            {product.name}
          </h3>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1">
          <StarRating rating={4.8} reviews={127} />
        </div>

        {/* Stock */}
        {stockDisplay && (
          <p className={`text-xs font-medium flex items-center gap-1 ${stockDisplay.color}`}>
            {stockDisplay.urgent && (
              <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
            )}
            {stockDisplay.text}
          </p>
        )}

        {/* Price + Button pushed to bottom */}
        <div className="mt-auto flex flex-col gap-2 pt-1">
          {/* Prices */}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
            <span className="text-base sm:text-lg font-bold text-kobra-green leading-none">
              {product.price.toFixed(2)} €
            </span>
            {product.original_price && (
              <span className="text-xs text-gray-500 line-through leading-none">
                {product.original_price.toFixed(2)} €
              </span>
            )}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-2 bg-kobra-green/10 border border-kobra-green/20 text-kobra-green rounded-lg hover:bg-kobra-green hover:text-kobra-black transition-all text-xs sm:text-sm font-semibold"
          >
            <ShoppingCart size={14} className="flex-shrink-0" />
            <span className="truncate">Aggiungi</span>
          </button>
        </div>
      </div>
    </div>
  )
}
