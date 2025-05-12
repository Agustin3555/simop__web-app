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
import { useResetForm, useMetaModel } from '../../hooks'
import { FieldResetFnsContext } from '../../contexts'
import { Button, Toggle } from '@/components'
import { Method } from '@/services/config'

const ContextualizedLocalAdd = () => {
  const { service, getPropGroups } = useMetaModel()

  const toasting = useAppStore(store => store.toasting)
  const [resetOnCompletion, setResetOnCompletion] = useState(true)
  const formRef = useRef<HTMLFormElement | null>(null)
  const resetForm = useResetForm(formRef)

  const createPropGroups = useMemo(() => getPropGroups(Method.Create), [])

  const componentGroups = useMemo(
    () =>
      createPropGroups?.map(({ props, ...rest }) => ({
        components: Object.values(props).map(({ getFieldComponent }) =>
          getFieldComponent(),
        ),
        ...rest,
      })),
    [],
  )

  const { handleSubmit, actionState } = useSubmitAction(
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

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLFormElement>>(
    event => event.key === 'Enter' && event.preventDefault(),
    [],
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
      <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <div className="field-groups">
          {componentGroups?.map(({ key, title, components }) => (
            <div key={key} className="section">
              {title && <small>{title}</small>}
              <div className="fields">{components}</div>
            </div>
          ))}
        </div>
        <Button
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
    <ContextualizedLocalAdd />
  </FieldResetFnsContext.Provider>
)

export default LocalAdd
