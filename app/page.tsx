'use client'

import Link from 'next/link';
import { asciiArt } from './components/ascii'
import CharacterCycle from './components/CharacterCycle';
import { useState } from 'react';
import Chat from './components/Chat';

export default function Home() {
  const [animationsEnabled, setAnimationsEnabled] = useState(false);

  return (
    <div className="h-full animate-fade-in">
      <div className="relative">

        {/* ascii art */}
        <div className="mt-1 md:mt-10 -ml-[300px] md:ml-0 font-mono whitespace-pre overflow-hidden text-[6px] leading-[6px]">
          {asciiArt.split('\n').map((line, lineIndex) => (
            <div key={lineIndex}>
              {animationsEnabled ? (
                line.split('').map((char, charIndex) => (
                  char === ' ' ? (
                    <span key={`${lineIndex}-${charIndex}`}>&nbsp;</span>
                  ) : (
                    <CharacterCycle 
                      key={`${lineIndex}-${charIndex}`} 
                      char={char} 
                      shouldShiver={Math.random() < 0.03}
                    />
                  )
                ))
              ) : (
                line
              )}
            </div>
          ))}
        </div>

        {/* mobile nav */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[20vh] md:top-1/3 z-2 block md:hidden">
          <nav className="flex gap-20 flex-col md:flex-row items-center">
            <Link 
              href="/projects" 
              className="text-xl hover:underline bg-[#588069] px-1 transform transition-transform hover:scale-[1.1] origin-center"
            >
              projects
            </Link>
            <Link 
              href="/music" 
              className="text-xl hover:underline bg-[#b08383] px-1 transform transition-transform hover:scale-[1.1] origin-center"
            >
              music
            </Link>
          </nav>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-background p-2 z-2 flex items-end gap-4">
        <p className="text-sm flex-grow">
          iain is not a developer. yeah he codes <Link href="/projects" className='font-bold'>fullstack apps</Link>. but he thinks bigger, about people, products, systems. what is success? how do we iteratively build & measure? is the product cool? and why are there two i&apos;s in his name? who knows.
        </p>
        <button 
          onClick={() => setAnimationsEnabled(!animationsEnabled)}
          className={`${animationsEnabled ? 'bg-foreground text-background' : ''} 
            opacity-30 bg-background border border-foreground px-3 py-1 rounded-full text-xs whitespace-nowrap hover:bg-foreground hover:text-background transition-colors
          `}
        >
          sparkle
        </button>
      </div>
    </div>
  )
}