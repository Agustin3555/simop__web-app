import './ChatThread.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useHandleAction } from '@/hooks'
import { useAppStore } from '@/store/config'
import { apiUrl } from '@/env'
import { AiChatService } from '@/pages/Admin/modules/aiChat/aiChat.service'
import { AiChatModel } from '@/pages/Admin/modules/aiChat'
import { Button, Loader } from '@/components'
import { PromptInput, PromptInputProps } from '../PromptInput/PromptInput'
import { Message } from './components'
import { classList } from '@/helpers'
import { useQuery } from '@tanstack/react-query'

const THRESHOLD = 120

type Messages = (Omit<AiChatModel.Message, 'id'> & {
  id: number | string
})[]

interface ChatThreadProps {
  id: number
  onDelete: () => Promise<void>
}

export const ChatThread = ({ id, onDelete }: ChatThreadProps) => {
  const [messages, setMessages] = useState<Messages>([])
  const [answer, setAnswer] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(true)

  const scrollRef = useRef<HTMLDivElement>(null)
  const tempMessageIdRef = useRef(0)

  const toasting = useAppStore(store => store.toasting)

  const { data: initMessages } = useQuery({
    queryKey: ['chats', id, 'messages'],
    queryFn: async () => {
      const messages = await AiChatService.getMessagesFromOne(id)

      const shouldStart = messages.length === 1 && messages[0].role === 'user'
      if (shouldStart && !isStreaming) startStream(id)

      return messages
    },
    retry: false,
  })

  const startStream = useCallback((chatId: number) => {
    setAnswer('')
    setIsStreaming(true)

    let fullAnswer = ''

    const es = new EventSource(`${apiUrl}/ai-chats/${chatId}/generate-response`)

    es.onmessage = e => {
      interface SseData {
        type: 'response-token' | 'data'
        content: string
      }

      const event: SseData = JSON.parse(e.data)

      if (event.type === 'response-token') {
        fullAnswer += event.content
        setAnswer(fullAnswer)
      }

      if (event.type === 'data') {
        // TODO: guardar los datos de la DB
        // console.log('DATASET:', event.data)
        // setTableData(event.data) 👈 cuando lo tengas
      }
    }

    es.onerror = () => {
      es.close()
      setIsStreaming(false)

      setMessages(prev => [
        ...prev,
        {
          id: `temp-${++tempMessageIdRef.current}`,
          role: 'assistant',
          content: fullAnswer,
          createdAt: new Date().toISOString(),
        },
      ])

      setAnswer('')
    }

    return es
  }, [])

  useEffect(() => {
    if (!initMessages) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages(initMessages)
  }, [initMessages])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => {
      const atBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - THRESHOLD

      setIsAtBottom(atBottom)
    }

    el.addEventListener('scroll', handleScroll)

    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!(el && isAtBottom)) return

    el.scrollTop = el.scrollHeight
  }, [messages, answer, isAtBottom, initMessages])

  const handleSendPrompt = useCallback<PromptInputProps['onSendPrompt']>(
    async prompt => {
      const { message } = await AiChatService.chat(id, { userPrompt: prompt })

      setMessages(prev => [...prev, message])
      startStream(id)
    },
    [id, startStream],
  )

  const deleteAction = useHandleAction(async ({ setSuccess, setError }) => {
    try {
      await AiChatService.deleteOne(id)
      toasting('success', 'Chat eliminado con éxito')
      await onDelete()

      await setSuccess()
    } catch (error) {
      await setError()
    }
  })

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    el.scrollTop = el.scrollHeight
  }, [])

  return (
    <>
      <div className="cmp-chat-thread" ref={scrollRef}>
        {initMessages ? (
          <div>
            <div className="actions top">
              <Button
                title="Eliminar este chat"
                faIcon="fa-solid fa-trash"
                size="s"
                type="secondary"
                hold
                {...deleteAction}
              />
            </div>
            <ul>
              {messages.map(({ id, ...rest }) => (
                <Message key={id} {...rest} />
              ))}
              {(isStreaming || answer) && (
                <Message role="assistant" content={answer} isStreaming />
              )}
            </ul>
            <div className={classList('actions', 'bot', { isAtBottom })}>
              <Button
                title="Bajar"
                faIcon="fa-solid fa-angles-down"
                size="m"
                type="secondary"
                onAction={scrollToBottom}
              />
            </div>
          </div>
        ) : (
          <p className="loader-display">
            <Loader />
            Cargando mensajes
          </p>
        )}
      </div>
      <PromptInput onSendPrompt={handleSendPrompt} />
    </>
  )
}
