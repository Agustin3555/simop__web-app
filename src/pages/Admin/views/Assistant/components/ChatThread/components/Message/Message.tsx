import './Message.css'
import { AiChatModel } from '@/pages/Admin/modules/aiChat'
import { classList } from '@/helpers'
import { format } from '@formkit/tempo'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const roleMatcher: Record<AiChatModel.Message['role'], string> = {
  user: 'Usuario',
  assistant: 'IA',
}

const normalizeMarkdown = (text: string) => {
  const matches = text.match(/```/g)
  const count = matches ? matches.length : 0

  if (count % 2 !== 0) return text + '\n```'
  return text
}

interface MessageProps
  extends
    Pick<AiChatModel.Message, 'role' | 'content'>,
    Partial<Pick<AiChatModel.Message, 'createdAt'>> {
  isStreaming?: boolean
}

export const Message = ({
  role,
  content,
  createdAt,
  isStreaming = false,
}: MessageProps) => (
  <li className={classList('cmp-message', 'text', role)}>
    <small>
      <strong>{roleMatcher[role]}</strong> •{' '}
      {createdAt && format(createdAt, { date: 'short', time: 'short' })}
    </small>
    <div className="content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {normalizeMarkdown(content)}
      </ReactMarkdown>
    </div>
  </li>
)
