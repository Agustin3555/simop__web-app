import './Assistant.css'
import { Button, Loader } from '@/components'
import { View } from '../../components'
import {
  ChatButton,
  ChatThread,
  PromptInput,
  PromptInputProps,
} from './components'
import { useCallback, useState } from 'react'
import { useInputHandler } from '../../hooks'
import { AiChatService } from '../../modules/aiChat/aiChat.service'
import { useQuery } from '@tanstack/react-query'

const Assistant = () => {
  const [selectedChat, setSelectedChat] = useState<number>()

  const { data: chats, refetch } = useQuery({
    queryKey: ['ai-chats'],
    queryFn: AiChatService.getAll,
    retry: false,
  })

  const handleClick = useCallback(() => setSelectedChat(undefined), [])

  const handleChange = useInputHandler(id => setSelectedChat(Number(id)))

  const handleSendPrompt = useCallback<PromptInputProps['onSendPrompt']>(
    async prompt => {
      const chat = await AiChatService.create({ userPrompt: prompt })
      await refetch()
      setSelectedChat(chat.id)
    },
    [refetch],
  )

  const handleDelete = useCallback(async () => {
    setSelectedChat(undefined)
    await refetch()
  }, [refetch])

  return (
    <View viewKey="assistant">
      <div className="cmp-assistant">
        {chats ? (
          <ul>
            <li>
              <Button
                text="Nuevo chat"
                faIcon="fa-solid fa-plus"
                onAction={handleClick}
              />
            </li>
            {chats.map(props => (
              <li key={props.id}>
                <ChatButton
                  selected={selectedChat === props.id}
                  onChange={handleChange}
                  {...props}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="loader-display">
            <Loader />
            Cargando chats
          </p>
        )}
        <section>
          {selectedChat ? (
            <ChatThread
              key={selectedChat}
              id={selectedChat}
              onDelete={handleDelete}
            />
          ) : (
            <>
              <h2>¿Con qué puedo ayudarte?</h2>
              <PromptInput onSendPrompt={handleSendPrompt} />
            </>
          )}
        </section>
      </div>
    </View>
  )
}

export default Assistant
