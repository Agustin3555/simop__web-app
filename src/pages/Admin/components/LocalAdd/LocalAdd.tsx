import { ReactNode } from 'react'
import { SubmitActionResult } from '@/hooks'
import { StateButton } from '@/components'

interface Props extends SubmitActionResult {
  children: ReactNode
}

const LocalAdd = ({ handleSubmit, actionState, children }: Props) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="fields">{children}</div>
      <StateButton
        title="Confirmar"
        text="Confirmar"
        faIcon="fa-solid fa-check"
        {...{ actionState }}
      />
    </form>
  )
}

export default LocalAdd
