'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat, Message } from 'ai/react'

const options = ["to see your portfolio", "just to chat"]
const locationQuestions = ["how's the weather in", "what's up in", "how's the tech scene in", "are you enjoying"]

export default function Chat({ closeChat }: { closeChat: () => void }) {
  const [name, setName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFakeLoading, setIsFakeLoading] = useState(false)
  const isFirstMessage = useRef(true)
  const [isShowingOptions, setIsShowingOptions] = useState(false)

  const { messages, setMessages, input, handleInputChange, handleSubmit: originalHandleSubmit, isLoading } = useChat({
    api: '/api/chat',
    onError: (error) => {
      console.error('Error in chat:', error)
      setMessages([...messages, { id: String(Date.now()) + 'user', role: 'user', content: input }, { id: String(Date.now()) + 'assistant', role: 'assistant', content: 'Sorry... busy right now' }])
    },
    onFinish: (message, options) => {
      const didJustSendFirstMessage = isFirstMessage.current
      isFirstMessage.current = false
      
      if (didJustSendFirstMessage) {
        presentQuestion('anyways, enough about you. why are you here?', ()=>setIsShowingOptions(true))
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
      closeChat()
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
    inputRef.current?.focus()
    setTimeout(() => {
      presentQuestion('What is your name?')
    }, 2000)
  }, [])

  return (
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
