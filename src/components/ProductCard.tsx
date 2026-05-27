'use client'

import Link from 'next/link'
import { Product } from '@/lib/types'
import { useState } from 'react'
import StarRating from './StarRating'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null

  const stockDisplay = product.stock <= 10 
    ? { text: `Solo ${product.stock} rimasti!`, color: 'text-red-400', urgent: true }
    : product.stock <= 30
    ? { text: `In esaurimento`, color: 'text-yellow-400', urgent: false }
    : { text: `${product.stock} disponibili`, color: 'text-gray-400', urgent: false }

  const points = Math.round(product.price)

  return (
    <Link
      href={`/prodotto/${product.slug}/`}
      className="group flex gap-4 bg-kobra-black rounded-xl border border-kobra-green/10 hover:border-kobra-green/40 transition-all overflow-hidden p-3"
    >
      <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 bg-kobra-gray rounded-lg overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <span className="text-3xl">🎮</span>
          </div>
        )}

        {discount && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-kobra-green text-kobra-black text-xs font-bold rounded">
            -{discount}%
          </div>
        )}

        {product.bestseller === 1 && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-kobra-cyan text-kobra-black text-xs font-bold rounded">
            BESTSELLER
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between py-1 flex-1">
        <div>
          <h3 className="font-semibold text-sm md:text-base group-hover:text-kobra-green transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{product.subcategory || product.category}</p>
          <div className="mt-2">
            <StarRating rating={4.8} reviews={127} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-kobra-green">{product.price.toFixed(2)} €</span>
            {product.original_price && (
              <span className="text-sm text-gray-500 line-through">{product.original_price.toFixed(2)} €</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${stockDisplay.color}`}>
              {stockDisplay.urgent && <span className="inline-block w-2 h-2 bg-red-400 rounded-full animate-pulse mr-1"></span>}
              {stockDisplay.text}
            </span>
            <span className="text-xs text-kobra-green">+{points} pts</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
