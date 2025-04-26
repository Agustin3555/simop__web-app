import './LocalAdd.css'
import {
  KeyboardEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useAppStore } from '@/store/config'
import { useSubmitAction } from '@/hooks'
import { useResetForm, useScheme } from '../../hooks'
import { FieldResetFnsContext } from '../../contexts'
import { Button2, Toggle } from '@/components'

const HydratedLocalAdd = () => {
  const { scheme } = useScheme()
  const { service, groups } = scheme

  const toasting = useAppStore(store => store.toasting)
  const [resetOnCompletion, setResetOnCompletion] = useState(true)
  const formRef = useRef<HTMLFormElement | null>(null)
  const resetForm = useResetForm(formRef)

  const fieldGroups = useMemo(
    () =>
      groups.map(({ title, props }) => ({
        title,
        fields: Object.values(props).map(({ getFieldComponent }) =>
          getFieldComponent(),
        ),
      })),
    [],
  )

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ form, formData, setError, setSuccess }) => {
      try {
        const createData = groups.reduce((acc, { props }) => {
          Object.values(props).forEach(({ key, verboseKey, getFieldValue }) => {
            const value = getFieldValue(formData, form)

            if (value !== undefined) acc[verboseKey || key] = value
          })

          return acc
        }, {} as Record<string, unknown>)

        // console.log(createData)

        await service.create!(createData)
        toasting('success', 'Agregado con éxito')
        if (resetOnCompletion) resetForm()

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLFormElement>>(
    e => e.key === 'Enter' && e.preventDefault(),
    [],
  )

  return (
    <div className="cmp-local-add">
      <Toggle
        title="Limpiar después de crear"
        faIcon="fa-solid fa-eraser"
        value={resetOnCompletion}
        setValue={setResetOnCompletion}
      />
      <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <div className="field-groups">
          {fieldGroups.map(({ title, fields }, index) => (
            <div key={index} className="group">
              {title && <small>{title}</small>}
              <div className="fields">{fields.map(item => item)}</div>
            </div>
          ))}
        </div>
        <Button2
          text="Confirmar"
          faIcon="fa-solid fa-check"
          submit
          {...{ actionState }}
        />
      </form>
    </div>
  )
}

const LocalAdd = () => (
  <FieldResetFnsContext.Provider value={[]}>
    <HydratedLocalAdd />
  </FieldResetFnsContext.Provider>
)

export default LocalAdd
