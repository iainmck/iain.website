'use client'

import { useEffect, useState } from 'react'

const loadIcons = ['|', '/', '—', '\\']

export default function LoadingOverlay() {
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1200)

    let imageInterval: NodeJS.Timeout | null = null;
    if (loading) {
      imageInterval = setInterval(() => {
        setIndex((prev) => (prev + 1) % loadIcons.length)
      }, 200)
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
        <div className="text-foreground">getting ready {loadIcons[index]}</div>
      </div>
    </div>
  )
} 