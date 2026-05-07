import { publicInstance } from '@/services/config'
import { buildPath } from '@/helpers'
import { AiChatAdapter } from './aiChat.adapter'
import { AiChatModel } from '.'

const collection = buildPath('ai-chats')

export const AiChatService = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return AiChatAdapter.getAll.output(response.data)
  },

  getMessagesFromOne: async (id: number) => {
    const response = await publicInstance.get(collection(id, 'messages'))

    return AiChatAdapter.getMessagesFromOne.output(response.data)
  },

  create: async (data: AiChatModel.Create) => {
    const adaptedInput = AiChatAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return AiChatAdapter.create.output(response.data)
  },

  chat: async (id: number, data: AiChatModel.Create) => {
    const adaptedInput = AiChatAdapter.chat.input(data)

    const response = await publicInstance.post(collection(id), adaptedInput)

    return AiChatAdapter.chat.output(response.data)
  },

  updateOne: async (id: number, data: AiChatModel.Update) => {
    const adaptedInput = AiChatAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return AiChatAdapter.updateOne.output(response.data)
  },

  deleteOne: async (id: number) => {
    await publicInstance.delete(collection(id))
  },
}
