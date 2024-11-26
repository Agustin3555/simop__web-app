import './LocalAdd.css'
import { ReactNode } from 'react'
import { SubmitActionResult } from '@/hooks'
import { StateButton } from '@/components'

interface Props extends SubmitActionResult {
  children: ReactNode
}

const LocalAdd = ({ handleSubmit, actionState, children }: Props) => {
  return (
    <div className="cmp-local-add">
      <form onSubmit={handleSubmit}>
        <div className="fields">{children}</div>
        <StateButton
          text="Confirmar"
          faIcon="fa-solid fa-check"
          {...{ actionState }}
        />
      </form>
    </div>
  )
}

export default LocalAdd
