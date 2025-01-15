'use client'

import { useState } from 'react'
import Image from 'next/image'
import Chat from './Chat'

export default function ChatOverlay() {
  const [showWarning, setShowWarning] = useState(false)

  const [fadeOut, setFadeOut] = useState(false)
  const [showChat, setShowChat] = useState(true)

  function doFadeOut() {
    setFadeOut(true)
    setTimeout(() => {
      setShowChat(false)
    }, 1000)
  }

  if (!showChat) return null
  
  return (
    <div 
      className={`hidden md:block fixed inset-0 z-20 bg-gradient-to-b from-black via-black to-[#292929] flex cursor-default 
        ${fadeOut ? 'opacity-0 scale-[0.9]' : 'opacity-100 scale-100'} 
        transition-all duration-1000 origin-center`
      }
    >
      <Chat closeChat={() => doFadeOut()} className="w-[800px] max-w-[80vw] h-[600px] max-h-[80vh] ml-[10vw] mt-[10vh]" />

      {/* Home icon */}
      <div 
        className="absolute right-[20px] lg:right-[50px] xl:right-[150px] top-[100px] flex flex-col items-center cursor-pointer"
        onClick={() => doFadeOut()}
      >
        <Image 
          src="/avatars/avatar2.png" 
          alt="Home icon"
          width={63}
          height={58}
          className="opacity-90"
        />
        <span className="text-gray-300 font-sans text-sm pl-[16px] -mt-1 font-bold">home</span>
      </div>

      {/* Warning icon */}
      <div 
        className="absolute -z-10 right-[20px] lg:right-[100px] xl:right-[200px] top-[300px] flex flex-col items-center cursor-pointer"
        onClick={() => setShowWarning(true)}
      >
        <Image 
          src="/post-it-warning.png" 
          alt="Warning icon"
          width={58}
          height={58}
          className="opacity-90"
        />
        <span className="text-gray-300 font-sans text-sm mt-1 font-bold">warning</span>
      </div>

      {showWarning && (
        <div 
          className="fixed inset-0 z-30 flex items-center justify-end"
          onClick={() => setShowWarning(false)}
        >
          <div className="w-[300px] h-[300px] mr-[10vw] bg-[#fff9b1] shadow-[0_8px_16px_-2px_rgba(0,0,0,0.8)] p-6 rotate-2 cursor-default">
            <p className="font-handwritten text-lg text-gray-800">
              ⚠️ if you get my chatbot to say some crazy shi* please tweet <a href="https://x.com/iainxyz" className="font-bold">@iainxyz</a> so we can all laugh
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 