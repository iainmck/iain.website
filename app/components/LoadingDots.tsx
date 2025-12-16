'use client'

import { useEffect, useState } from 'react'

const loadIcons = ['.', '..', '...', '']

export default function LoadingDots() {
  const [index, setIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadIcons.length)
    }, 300)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <span className="text-foreground">{loadIcons[index]}</span>
  )
}
