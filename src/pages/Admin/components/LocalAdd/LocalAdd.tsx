import './LocalAdd.css'
import { ReactNode } from 'react'
import { SubmitActionResult } from '@/hooks'
import { Button, StateButton } from '@/components'

interface Props extends SubmitActionResult {
  children: ReactNode
}

const LocalAdd = ({ handleSubmit, actionState, children }: Props) => {
  return (
    <div className="cmp-local-add">
      <form onSubmit={handleSubmit}>
        <div className="fields">{children}</div>
        <div className="actions">
          <Button
            title="Limpiar"
            faIcon="fa-solid fa-eraser"
            type="reset"
            _type="secondary"
          />
          <StateButton
            text="Confirmar"
            faIcon="fa-solid fa-check"
            {...{ actionState }}
          />
        </div>
      </form>
    </div>
  )
}

export default LocalAdd
