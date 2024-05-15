import React from 'react'
import { Star } from 'lucide-react'

const FiveStars = () => {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} className="w-6 h-6 text-green-600 fill-green-600" />
      ))}
    </div>
  )
}

export default FiveStars
