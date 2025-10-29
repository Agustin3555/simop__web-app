import './LocalAdd.css'
import { useMemo, useRef, useState } from 'react'
import { useAppStore } from '@/store/config'
import { useSubmitAction } from '@/hooks'
import { useResetForm, useMetaModel, useConfigModule } from '../../hooks'
import { Toggle } from '@/components'
import { Form } from '..'
import { useQueryClient } from '@tanstack/react-query'
import { FieldResetFnsContext } from '../../contexts/fieldResetFns.context'
import { LooseEntity } from '@/models/config'
import { buildConfigKey } from '../../helpers'

const ContextualizedLocalAdd = () => {
  const [resetOnCompletion, setResetOnCompletion] = useState(true)
  const formRef = useRef<HTMLFormElement | null>(null)

  const { key, service, addProps } = useMetaModel()
  const { groups } = addProps

  const { selectedConfig } = useConfigModule()
  const toasting = useAppStore(store => store.toasting)
  const resetForm = useResetForm(formRef)
  const queryClient = useQueryClient()

  const fieldGroups = useMemo(
    () =>
      groups.map(({ props, ...rest }) => ({
        fields: Object.values(props).map(v => v.getFormField()),
        ...rest,
      })),
    [],
  )

  const submitActionResult = useSubmitAction(
    async ({ form, formData, setError, setSuccess }) => {
      try {
        const createData: Record<string, unknown> = {}

        groups.forEach(v =>
          Object.values(v.props).forEach(
            ({ key, verboseKey, required, getFormFieldValue }) => {
              const value = getFormFieldValue(formData, form)
              if (required && value === undefined) throw new Error('required')
              if (value !== undefined) createData[verboseKey || key] = value
            },
          ),
        )

        const newEntity = await service.create!(createData)

        queryClient.setQueryData<LooseEntity[]>(
          buildConfigKey(key, selectedConfig),
          oldData => {
            if (oldData) return [newEntity, ...oldData]
          },
        )

        toasting('success', 'Agregado con éxito')
        if (resetOnCompletion) resetForm()

        await setSuccess()
      } catch (error) {
        if ((error as Error).message === 'required')
          toasting('error', 'Complete los campos requeridos')

        await setError()
      }
    },
  )

  return (
    <div className="cmp-local-add">
      <Form {...{ ...submitActionResult, formRef, fieldGroups }}>
        <Toggle
          title="Limpiar después de crear"
          faIcon="fa-solid fa-eraser"
          value={resetOnCompletion}
          setValue={setResetOnCompletion}
        />
      </Form>
    </div>
  )
}

const LocalAdd = () => (
  <FieldResetFnsContext.Provider value={[]}>
    <ContextualizedLocalAdd />
  </FieldResetFnsContext.Provider>
)

export default LocalAdd
