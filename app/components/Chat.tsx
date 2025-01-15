'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat, Message } from 'ai/react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const nameQuestions = ["what is your name?", "who are you?", "who's there?"]
const options = ["to see your portfolio", "just to chat"]
const locationQuestions = ["how's the weather in", "what's up in", "how's the tech scene in", "are you enjoying"]

export default function Chat({ className }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const [name, setName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFakeLoading, setIsFakeLoading] = useState(false)
  const isFirstMessage = useRef(true)
  const [isShowingOptions, setIsShowingOptions] = useState(false)

  const { messages, setMessages, input, handleInputChange, handleSubmit: originalHandleSubmit, isLoading } = useChat({
    api: '/api/chat',
    onError: (error) => {
      console.error('Error in chat:', error)
      setMessages([...messages, { id: String(Date.now()) + 'user', role: 'user', content: input }, { id: String(Date.now()) + 'assistant', role: 'assistant', content: 'sorry... brb' }])
    },
    onFinish: (message, options) => {
      const didJustSendFirstMessage = isFirstMessage.current
      isFirstMessage.current = false
      
      if (didJustSendFirstMessage) {
        setIsFakeLoading(true)
        setTimeout(() => {
          presentQuestion('anyways, enough about you. why are you here?', ()=>setIsShowingOptions(true))
        }, 2000)
      }
    },
  })

  const presentQuestion = (question: string, callback?: () => void) => {
    setIsFakeLoading(true)
    setMessages(prev => [...prev, { 
      id: String(Date.now()), 
      role: 'assistant', 
      content: '',
    }])

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex >= question.length) {
        setIsFakeLoading(false)
        clearInterval(interval)
        callback?.()
        return
      }

      setMessages(prev => {
        const lastMessage = prev[prev.length - 1]
        return [
          ...prev.slice(0, -1),
          { ...lastMessage, content: question.slice(0, currentIndex + 1) }
        ]
      })

      currentIndex++
    }, 20)
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (isLoading || isFakeLoading || isShowingOptions) return
    if (!input.trim()) return

    originalHandleSubmit(e, { body: { isFirstMessage: isFirstMessage.current } })
    if (isFirstMessage.current) {
      setName(input)
    }
  }

  async function handleSubmitOption(index: number) {
    setMessages(prev => {
      return [
        ...prev,
        { id: String(Date.now()), role: 'user', content: options[index] }
      ]
    })

    if (index === 0) {
      router.push('/projects')
    } else {
      setIsShowingOptions(false)
      setIsFakeLoading(true)
      const location = await fetch('/api/location')
      const data = await location.json()
      if (!!data?.city) {
        presentQuestion(`${locationQuestions[Math.floor(Math.random() * locationQuestions.length)]} ${data.city.toLowerCase()}?`)
      } else {
        presentQuestion('ask me anything... what i\'ve been coding, my favourite food, etc.')
      }
    }
  }

  // ON VIEW LOAD
  useEffect(() => {
    setTimeout(() => {
      presentQuestion(nameQuestions[Math.floor(Math.random() * nameQuestions.length)])
    }, 2000)
  }, [])

  const [hideChat, setHideChat] = useState(false)
  useEffect(() => {
    setHideChat(pathname !== '/')
    if (pathname === '/') {
      inputRef.current?.focus()
    }
  }, [pathname])

  return (
    <div className={`
      ${className} bg-[#1e1e1e] rounded-[12px] border-[1px] border-[#999] shadow-[0_8px_6px_-1px_rgba(0,0,0,0.5)] 
      ${hideChat ? 'opacity-0 scale-[0.9] pointer-events-none' : 'opacity-100 scale-100'} transition-all duration-700 origin-center
      hidden md:block
    `}>
      <div className="h-[30px] bg-[#36363B] rounded-t-[12px] border-b border-black flex relative">
        <div className="absolute left-2 h-full flex items-center gap-2 group" onClick={() => setHideChat(true)}>
          <div className="w-[12px] h-[12px] rounded-full bg-[#FF5F57] group-hover:bg-[#ff8d88] cursor-pointer" />
          <div className="w-[12px] h-[12px] rounded-full bg-[#FFBD2E] group-hover:bg-[#ffd484] cursor-pointer" />
          <div className="w-[12px] h-[12px] rounded-full bg-[#28C840] group-hover:bg-[#7de790] cursor-pointer" />
        </div>
        <div className="h-full flex-grow flex items-center justify-center">
          <span className="text-[#ccc] text-sm font-sans font-bold">iain.website -- remote access</span>
        </div>
      </div>

      <div 
        className="w-full h-full flex flex-col justify-start px-3 py-2 text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        <div>
          {messages.map((m) => (
            <div key={m.id} className="flex gap-2">
              <NameBlock name={name} role={m.role} />
              <p className="flex-grow whitespace-pre-wrap">
                {m.content}
              </p>
            </div>
          ))}
        </div>

        {isShowingOptions && <Options onSelect={handleSubmitOption} />}
        
        <form onSubmit={handleSubmit} className={`w-full ${(!messages.length || isLoading || isFakeLoading || isShowingOptions) ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-full flex gap-2">
            <NameBlock name={name} role="user" />
            <input 
              ref={inputRef}
              className={"flex-grow"}
              value={input} 
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(e)
                }
              }}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

function NameBlock({ name, role, className }: { name: string | null, role: Message["role"], className?: string }) {
  return (
    <p className={`whitespace-nowrap ${role === 'user' ? 'text-[#22C6F8]' : 'text-[#F6A31E]'} ${className}`}>
      {role === 'user' ? (name ?? 'you') : 'iain'}
      {' ~ %'}
    </p>
  )
}

function Options({ onSelect }: { onSelect: (index: number) => void }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setIndex(0)
          break
        case 'ArrowDown':
          setIndex(1)
          break
        case 'Enter':
          onSelect(index)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [index, onSelect])

  return (
    <>
      {options.map((option, i) => (
        <div key={i} className="w-full flex gap-2">
          <NameBlock name={null} role="assistant" className="opacity-0"/>
          <p className="whitespace-pre-wrap">&gt; <span className={index === i ? "underline text-[#22C6F8]" : ""}>{option}</span></p>
        </div>
      ))}
    </>
  )
}
