import { FormEventHandler } from 'react'
import { ActionCallback, useActionState } from '.'

export const useSubmitAction = (
  submitCallback: ActionCallback<{ formData: FormData }>
) => {
  const { actionState, setLoading, setError, setSuccess } = useActionState()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    await submitCallback({ formData, setLoading, setError, setSuccess })
  }

  return { handleSubmit, actionState }
}
