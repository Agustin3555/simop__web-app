import './ChatButton.css'
import { ChangeEventHandler } from 'react'
import { AiChatModel } from '@/pages/Admin/modules/aiChat'
import { format } from '@formkit/tempo'

interface ChatProps extends AiChatModel.Chat {
  selected: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const ChatButton = ({
  id,
  title,
  updatedAt,
  selected,
  onChange,
}: ChatProps) => (
  <label className="cmp-chat-button ui-l" {...{ title }}>
    <span className="title">{title}</span>
    <small>{format(updatedAt, { date: 'medium', time: 'short' })}</small>
    <input
      type="radio"
      name="chat"
      value={id}
      checked={selected}
      onChange={onChange}
    />
  </label>
)
