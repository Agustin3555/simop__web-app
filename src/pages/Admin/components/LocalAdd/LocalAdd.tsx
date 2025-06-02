import './LocalAdd.css'
import { useMemo, useRef, useState } from 'react'
import { useAppStore } from '@/store/config'
import { useSubmitAction } from '@/hooks'
import { useResetForm, useMetaModel } from '../../hooks'
import { FieldResetFnsContext } from '../../contexts'
import { Toggle } from '@/components'
import { Method } from '@/services/config'
import { Form } from '..'

const ContextualizedLocalAdd = () => {
  const { service, getPropGroups } = useMetaModel()

  const toasting = useAppStore(store => store.toasting)
  const [resetOnCompletion, setResetOnCompletion] = useState(true)
  const formRef = useRef<HTMLFormElement | null>(null)
  const resetForm = useResetForm(formRef)

  const createPropGroups = useMemo(() => getPropGroups(Method.Create), [])

  const fieldGroups = useMemo(
    () =>
      createPropGroups?.map(({ props, ...rest }) => ({
        fields: Object.values(props).map(({ getFieldComponent }) =>
          getFieldComponent(),
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
          Object.values(props).forEach(({ key, verboseKey, getFieldValue }) => {
            const value = getFieldValue(formData, form)

            if (value !== undefined) createData[verboseKey || key] = value
          }),
        )

        await service.create!(createData)
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
        asSwitch
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
