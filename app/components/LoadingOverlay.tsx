'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function LoadingOverlay() {
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(1)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    let imageInterval: NodeJS.Timeout | null = null;
    if (loading) {
      imageInterval = setInterval(() => {
        setCurrentImage((prev) => (prev % 3) + 1)
      }, 300)
    }

    return () => {
      clearTimeout(timer)
      if (imageInterval) clearInterval(imageInterval)
    }
  }, [loading])

  return (
    <div 
      className={`fixed inset-0 bg-background z-30 flex items-center justify-center transition-opacity duration-500 ${
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* <Image
          src={`/avatars/avatar${currentImage}.png`}
          width={126 * 0.5}
          height={131 * 0.5}
          alt={`Loading avatar ${currentImage}`}
          priority
          className="mr-5"
        /> */}
        <div className="text-foreground">getting ready{'.'.repeat(currentImage - 1)}</div>
      </div>
    </div>
  )
} 