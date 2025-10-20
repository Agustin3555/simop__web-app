import './Note.css'
import { format } from '@formkit/tempo'
import ReactMarkdown from 'react-markdown'

export interface NoteProps {
  version: string
  date: string
  content: string
}

const Note = ({ version, date, content }: NoteProps) => (
  <article className="cmp-note">
    <header>
      <h2>{version}</h2>
      <small>{format(date, 'medium')}</small>
    </header>
    <ReactMarkdown>{content}</ReactMarkdown>
  </article>
)

export default Note
