import { BaseEntity } from '@/models/config'

export interface OwnFields {
  title: string

  createdAt: string
  updatedAt: string
}

export interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string

  createdAt: string
}

export interface Chat extends BaseEntity, OwnFields {}

export interface Create {
  userPrompt: string
}

export interface NewChat extends Chat {
  message: Message
}

export interface Update {
  title: string
}
