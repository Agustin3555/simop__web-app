import { FormEventHandler } from 'react'
import { ActionCallback, useActionState } from '.'

export interface FormValues {
  get: {
    string: (key: string) => string
    number: (key: string) => number
    boolean: (key: string) => boolean
  }
  getAll: {
    number: (key: string) => number[]
  }
}

export interface SubmitActionResult {
  handleSubmit: FormEventHandler<HTMLFormElement>
  actionState: ReturnType<typeof useActionState>['actionState']
}

export const useSubmitAction = (
  submitCallback: ActionCallback<{
    formData: FormData
    formValues: FormValues
  }>,
): SubmitActionResult => {
  const { actionState, setLoading, setError, setSuccess } = useActionState()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const formValues: FormValues = {
      get: {
        string: (key: string) => (formData.get(key) as string) || undefined,
        number: (key: string) => Number(formData.get(key)) || undefined,
        boolean: (key: string) => formData.get(key) === 'on',
      },
      getAll: {
        number: (key: string) => formData.getAll(key).map(Number),
      },
    }

    await setLoading()
    await submitCallback({ formData, formValues, setError, setSuccess })
  }

  return { handleSubmit, actionState }
}
