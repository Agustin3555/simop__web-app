import './PromptInput.css'
import {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Button } from '@/components'
import { useSubmitAction } from '@/hooks'
import { classList } from '@/helpers'

export interface PromptInputProps {
  onSendPrompt: (prompt: string) => Promise<void>
}

export const PromptInput = ({ onSendPrompt }: PromptInputProps) => {
  const [history, setHistory] = useState<string[]>([])
  const [, setHistoryIndex] = useState<number>()
  const [isListening, setIsListening] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const recognitionRef = useRef<any>(null)
  const speechFinalRef = useRef('')

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()

    recognition.lang = 'es-AR'
    recognition.interimResults = true
    recognition.continuous = true

    recognition.onresult = (event: any) => {
      let interimText = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript

        if (event.results[i].isFinal) {
          speechFinalRef.current += transcript + ' '
        } else {
          interimText += transcript
        }
      }

      if (textareaRef.current) {
        textareaRef.current.value = speechFinalRef.current + interimText
      }
    }

    recognition.onstart = () => {
      speechFinalRef.current = textareaRef.current?.value ?? ''
    }

    recognition.onend = () => {
      if (isListening) recognition.start()
    }

    recognitionRef.current = recognition
  }, [])

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ form, formValues, setError, setSuccess }) => {
      try {
        const prompt = formValues.get.string('prompt')
        setHistory(h => [...h, prompt])
        setHistoryIndex(undefined)
        form.reset()
        await onSendPrompt(prompt)

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>(
    e => {
      const textarea = e.currentTarget

      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        textarea.form?.requestSubmit()
        return
      }

      if (e.ctrlKey && e.key === 'ArrowUp') {
        e.preventDefault()

        setHistoryIndex(i => {
          const next = i === undefined ? history.length - 1 : Math.max(0, i - 1)
          textarea.value = history[next] ?? ''
          return next
        })
      }

      if (e.ctrlKey && e.key === 'ArrowDown') {
        e.preventDefault()

        setHistoryIndex(i => {
          if (i === undefined) return

          const next = i + 1

          if (next >= history.length) {
            textarea.value = ''
            return
          }

          textarea.value = history[next] ?? ''
          return next
        })
      }
    },
    [history],
  )

  const handleClickSpeech = useCallback(() => {
    const recognition = recognitionRef.current
    if (!recognition) return

    isListening ? recognition.stop() : recognition.start()
    setIsListening(l => !l)
  }, [isListening])

  return (
    <form className="cmp-prompt-input" role="textbox" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        name="prompt"
        title="Mensaje"
        placeholder="Pregunta lo que quieras"
        required
        onKeyDown={handleKeyDown}
      />
      <div className="actions">
        <div className="left">
          <Button
            handlingClass={isListening ? 'is-listening' : undefined}
            title={isListening ? 'Detener' : 'Escuchar'}
            faIcon={isListening ? 'fa-solid fa-stop' : 'fa-solid fa-microphone'}
            type="secondary"
            onAction={handleClickSpeech}
          />
          <small className={classList({ isListening })}>Escuchando...</small>
        </div>
        {/*
        TODO: para el futuro, debería usar un botón personalizado, para
        controlar mejor la funcionalidad de parar la generación de la respuesta
        */}
        <Button
          title="Enviar"
          faIcon="fa-solid fa-arrow-up"
          submit
          buttonHTMLAttrs={{ disabled: isListening }}
          {...{ actionState }}
        />
      </div>
    </form>
  )
}
