'use client'

import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  reviews: number
}

export default function StarRating({ rating, reviews }: StarRatingProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
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
      <span className="text-sm text-gray-400">
        {rating} ({reviews} recensioni)
      </span>
    </div>
  )
}
