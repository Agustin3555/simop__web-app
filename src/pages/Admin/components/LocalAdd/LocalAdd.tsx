import './LocalAdd.css'
import { useMemo, useRef, useState } from 'react'
import { useAppStore } from '@/store/config'
import { useSubmitAction } from '@/hooks'
import { useResetForm, useMetaModel, UseEntitiesData } from '../../hooks'
import { Toggle } from '@/components'
import { Method } from '@/services/config'
import { Form } from '..'
import { useQueryClient } from '@tanstack/react-query'
import { FieldResetFnsContext } from '../../contexts/fieldResetFns.context'

const ContextualizedLocalAdd = () => {
  const { key, service, getPropGroups } = useMetaModel()

  const queryClient = useQueryClient()
  const toasting = useAppStore(store => store.toasting)
  const [resetOnCompletion, setResetOnCompletion] = useState(true)
  const formRef = useRef<HTMLFormElement | null>(null)
  const resetForm = useResetForm(formRef)

  const createPropGroups = useMemo(() => getPropGroups(Method.Create), [])

  const fieldGroups = useMemo(
    () =>
      createPropGroups?.map(({ props, ...rest }) => ({
        fields: Object.values(props).map(
          ({ getFormField: getFieldComponent }) => getFieldComponent(),
        ),
        ...rest,
      })),
    [],
  )

  const submitActionResult = useSubmitAction(
    async ({ form, formData, setError, setSuccess }) => {
      try {
        const createData: Record<string, unknown> = {}

        createPropGroups?.forEach(({ props }) =>
          Object.values(props).forEach(
            ({ key, verboseKey, getFormFieldValue: getFieldValue }) => {
              const value = getFieldValue(formData, form)

              if (value !== undefined) createData[verboseKey || key] = value
            },
          ),
        )

        const newEntity = await service.create!(createData)

        queryClient.setQueryData<UseEntitiesData>([key], oldData => {
          if (oldData) return [newEntity, ...oldData]
        })

        toasting('success', 'Agregado con éxito')
        if (resetOnCompletion) resetForm()

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

  return (
    <div className="cmp-local-add">
      <Toggle
        title="Limpiar después de crear"
        faIcon="fa-solid fa-eraser"
        style="switch"
        value={resetOnCompletion}
        setValue={setResetOnCompletion}
      />
      <Form {...{ ...submitActionResult, formRef, fieldGroups }} />
    </div>
  )
}

const LocalAdd = () => (
  <FieldResetFnsContext.Provider value={[]}>
    <ContextualizedLocalAdd />
  </FieldResetFnsContext.Provider>
)

export default LocalAdd
