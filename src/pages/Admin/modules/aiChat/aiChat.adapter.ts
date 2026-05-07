import { InputAdapter, OutputAdapter } from '@/adapters/config'
import { AiChatModel } from '.'

const getAll: {
  output: OutputAdapter<AiChatModel.Chat[], AiChatModel.Chat[]>
} = {
  output: response => response,
}

const getMessagesFromOne: {
  output: OutputAdapter<AiChatModel.Message[], AiChatModel.Message[]>
} = {
  output: response => response,
}

const create: {
  input: InputAdapter<AiChatModel.Create, AiChatModel.Create>
  output: OutputAdapter<AiChatModel.NewChat, AiChatModel.NewChat>
} = {
  input: data => data,
  output: response => response,
}

const chat: {
  input: InputAdapter<AiChatModel.Create, AiChatModel.Create>
  output: OutputAdapter<AiChatModel.NewChat, AiChatModel.NewChat>
} = {
  input: data => data,
  output: response => response,
}

const updateOne: {
  input: InputAdapter<AiChatModel.Update, AiChatModel.Update>
  output: OutputAdapter<AiChatModel.Chat, AiChatModel.Chat>
} = {
  input: data => data,
  output: response => response,
}

export const AiChatAdapter = {
  getAll,
  getMessagesFromOne,
  create,
  chat,
  updateOne,
}
