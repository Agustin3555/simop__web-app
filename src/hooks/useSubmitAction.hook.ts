import { FormEventHandler } from 'react'
import { ActionCallback, useActionState } from '.'

export interface SubmitActionResult {
  handleSubmit: FormEventHandler<HTMLFormElement>
  actionState: ReturnType<typeof useActionState>['actionState']
}

export const useSubmitAction = (
  submitCallback: ActionCallback<{ formData: FormData; resetForm: () => void }>
): SubmitActionResult => {
  const { actionState, setLoading, setError, setSuccess } = useActionState()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const resetForm = event.currentTarget.reset

    await setLoading()
    await submitCallback({ formData, resetForm, setError, setSuccess })
  }

  return { handleSubmit, actionState }
}
