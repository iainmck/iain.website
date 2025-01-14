'use client'

import Link from 'next/link';
import { asciiArt } from './components/ascii'
import CharacterCycle from './components/CharacterCycle';
import { useState } from 'react';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="h-full animate-fade-in">
      <div className="relative">
        <div className="mt-1 md:mt-10 -ml-[300px] md:ml-0 font-mono whitespace-pre overflow-hidden text-[6px] leading-[6px]">
          {asciiArt.split('\n').map((line, lineIndex) => (
            <div key={lineIndex}>
              {line.split('').map((char, charIndex) => (
                char === ' ' ? (
                  <span key={`${lineIndex}-${charIndex}`}>&nbsp;</span>
                ) : (
                  <CharacterCycle 
                    key={`${lineIndex}-${charIndex}`} 
                    char={char} 
                    shouldShiver={Math.random() < 0.01}
                    //isHovered={isHovered}
                  />
                )
              ))}
            </div>
          ))}
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-[20vh] md:top-1/3 z-2">
          <nav className="flex gap-20 flex-col md:flex-row items-center">
            <Link 
              href="/projects" 
              className="text-xl hover:underline bg-[#588069] px-1 transform transition-transform hover:scale-[1.1] origin-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              projects
            </Link>
            <Link 
              href="/music" 
              className="text-xl hover:underline bg-[#b08383] px-1 transform transition-transform hover:scale-[1.1] origin-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              music
            </Link>
          </nav>
        </div>
      </div>
      
      <p className="fixed bottom-0 left-0 right-0 bg-background p-2 z-2 text-sm">
        iain is not a developer. i mean yeah he codes <Link href="/projects" className='font-bold'>fullstack apps</Link>. but he thinks bigger, about people, products, systems. what is success? how do we iteratively build & measure? is the product cool? and why are there two i&apos;s in his name? who knows. but he uses lowercase so people don&apos;t call him lain. 
      </p>
    </div>
  )
}