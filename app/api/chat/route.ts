import { streamText, convertToModelMessages } from 'ai'

import { model } from '../config'
import promptName from './prompt'
import promptChat from './prompt.secret'

export async function POST(req: Request) {
  const { messages, isFirstMessage } = await req.json()

  // keep only the last 50 messages
  const lastMessages = messages.slice(-50)

  const startTime = new Date()
  
  const result = streamText({
    model,
    system: isFirstMessage ? promptName : promptChat,
    messages: convertToModelMessages(lastMessages),
    maxOutputTokens: 250,
    onFinish(event) {
      try {
        trace(
          isFirstMessage ? 'name' : 'chat', 
          { prompt: messages[messages.length - 1].content, engine: event.response.modelId }, 
          { text: (event.response.messages[0]?.content || '') as string, finishReason: event.finishReason }, 
          startTime
        )
      } catch (error) {
        console.error('Error tracing event:', error)
      }
    },
  })

  return result.toUIMessageStreamResponse({ 
    onError: (error) => {
      console.log('getErrorMessage', error)
      return 'error'
    },
  })
}

interface TraceInput {
  prompt: string
  engine: string
}

interface TraceOutput {
  text: string
  finishReason?: string
}

async function trace(type: 'name' | 'chat', input: TraceInput, output: TraceOutput, startTime: Date) {
  await fetch('https://api.smith.langchain.com/runs', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.LANGSMITH_API_KEY!,
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      session_name: process.env.LANGSMITH_PROJECT || 'default',
      name: `Reply to ${type}`,
      run_type: 'llm',
      inputs: input,
      outputs: output,
      start_time: startTime.toISOString(),
      end_time: new Date().toISOString()
    })
  })
}
