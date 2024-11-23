import { MouseEvent, MouseEventHandler } from 'react'
import { ActionCallback, useActionState } from '.'

export const useHandleAction = <E = Element>(
  clickCallback: ActionCallback<{ event: MouseEvent<E> }>
) => {
  const { actionState, setLoading, setError, setSuccess } = useActionState()

  const handleAction: MouseEventHandler<E> = async event => {
    await setLoading()
    await clickCallback({ event, setError, setSuccess })
  }

  return { actionState, handleAction }
}
