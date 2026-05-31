'use client'

import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  reviews: number
}

export default function StarRating({ rating, reviews }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      <div className="flex flex-shrink-0">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={12}
            className={
              star <= Math.floor(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : star - 0.5 <= rating
                ? 'text-yellow-400 fill-yellow-400/50'
                : 'text-gray-600'
            }
          />
        ))}
      </div>
      <span className="text-xs text-gray-400 leading-none">
        <span className="hidden sm:inline">{rating} ({reviews})</span>
        <span className="sm:hidden">{rating}</span>
      </span>
    </div>
  )
}
