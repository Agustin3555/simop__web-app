import './AssistantButton.css'
import { useCallback, useEffect, useRef } from 'react'
import { useViews } from '@/pages/Admin/hooks'
import { palColor } from '@/styles/palette'
import { classList } from '@/helpers'
import { randomBlob } from './AssistantButton.style'

const AssistantButton = () => {
  const shapeRef = useRef<HTMLSpanElement>(null)

  const { select, isActive } = useViews()

  const handleClick = useCallback(() => select('assistant', 0), [select])

  useEffect(() => {
    const shape = shapeRef.current
    if (!shape) return

    const id = setInterval(() => randomBlob(shape), 1000)

    return () => clearInterval(id)
  }, [])

  return (
    <button
      className={classList('cmp-assistant-button', 'ui-l', {
        active: isActive('assistant'),
      })}
      onClick={handleClick}
    >
      Consultar
      <span className="grid" />
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M40.5 19.9959C21 19.9959 20 -0.501898 0 -0.499756L40.5 -0.504089V19.9959Z"
            fill={palColor('AL1')}
            stroke={palColor('AL4')}
          />
          <path
            d="M40.5 20C21 20 20 40.4978 0 40.4957L40.5 40.5V20Z"
            fill={palColor('AL1')}
            stroke={palColor('AL4')}
          />
        </g>
      </svg>
      <span className="shape" ref={shapeRef}>
        IA
      </span>
    </button>
  )
}

export default AssistantButton
