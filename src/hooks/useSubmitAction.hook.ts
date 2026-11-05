import { FormEventHandler } from 'react'
import { ActionCallback, useActionState } from '.'

export interface FormValues {
  get: {
    string: (key: string) => string
    number: (key: string) => number | undefined
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
    form: HTMLFormElement
    formData: FormData
    formValues: FormValues
  }>,
): SubmitActionResult => {
  const { actionState, setLoading, setError, setSuccess } = useActionState()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(event.currentTarget)

    const formValues: FormValues = {
      get: {
        string: (key: string) => (formData.get(key) as string) || undefined,
        number: (key: string) => {
          const value = formData.get(key)
          if (typeof value !== 'string' || value.trim() === '') return undefined

          const number = Number(value)
          return Number.isFinite(number) ? number : undefined
        },
        boolean: (key: string) => formData.get(key) === 'on',
      },
      getAll: {
        number: (key: string) => formData.getAll(key).map(Number),
      },
    }

    await setLoading()
    await submitCallback({ form, formData, formValues, setError, setSuccess })
  }

  return { handleSubmit, actionState }
}
