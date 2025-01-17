'use client'

import { memo, useRef, useEffect } from 'react'

// Memoize the character array and cycle count
const CHARS = ['@', '+', ' ', '.', '~', '%', '8'] as const
const CYCLE_COUNT = 7

interface CharacterCycleProps {
  char: string
  shouldShiver: boolean
  colorize?: boolean
}

// Memoize the CharacterCycle component
const CharacterCycle = memo(({ char, shouldShiver, colorize }: CharacterCycleProps) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  
  const triggerCycle = () => {
    const span = spanRef.current
    if (!span) return

    let cycles = 0;
    const interval = setInterval(() => {
      if (cycles >= CYCLE_COUNT) {
        span.textContent = char
        span.style.transform = 'scale(1)'
        clearInterval(interval)
      } else {
        span.textContent = CHARS[cycles % CHARS.length]
        span.style.transform = 'scale(1.5)'
        cycles++
      }
    }, 100)
  }

  // Randomize the initial delay and interval for each character
  useEffect(() => {
    if (shouldShiver) {
      const initialDelay = Math.random() * 1000; // Random delay 0-2s before first potential shiver
      const intervalTime = 5000 + Math.random() * 500; // Random interval 1-3s between potential shivers
      
      // Initial delay before starting the interval
      const startTimeout = setTimeout(() => {
        if (Math.random() < 0.2) {
          triggerCycle()
        }

        const interval = setInterval(() => {
          if (Math.random() < 0.1) { // 10% chance to trigger
            triggerCycle()
          }
        }, intervalTime)
        
        return () => clearInterval(interval)
      }, initialDelay)
      
      return () => clearTimeout(startTimeout)
    }
  }, [shouldShiver]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span
      ref={spanRef}
      className={`inline-block will-change-transform hover:scale-110 transition-colors duration-1000`}
      style={{ color: colorize ? colorLookup[char] || 'white' : '' }}
      //onMouseEnter={triggerCycle}
    >
      {char}
    </span>
  )
})

CharacterCycle.displayName = 'CharacterCycle'

export default CharacterCycle

const colorLookup: Record<string, string> = {
  '+': '#A49C5D',
  ':': '#ECCAC8',
  '.': '#F1E8E3',
  '&': '#1F1A14',
  '$': '#3B372E',
  'x': '#C05648',
  'X': '#A29D97',
}