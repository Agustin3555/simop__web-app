import './LocalAdd.css'
import { useCallback, useMemo } from 'react'
import { useAppStore } from '@/store/config'
import { useSubmitAction } from '@/hooks'
import { useReset, useScheme } from '../../hooks'
import { FieldResetFnsContext } from '../../contexts'
import { Button, StateButton } from '@/components'

const HydratedLocalAdd = () => {
  const { scheme } = useScheme()
  const { service, groups } = scheme

  const toasting = useAppStore(store => store.toasting)
  const reset = useReset()

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

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

  const handleResetClick = useCallback(() => reset(), [])

  return (
    <div className="cmp-local-add">
      <form onSubmit={handleSubmit}>
        <div className="field-groups">
          {fieldGroups.map(({ title, fields }, index) => (
            <div key={index} className="group">
              {title && <small>{title}</small>}
              <div className="fields">{fields.map(item => item)}</div>
            </div>
          ))}
        </div>
        <div className="actions">
          <Button
            text="Limpiar"
            title="Limpiar formulario"
            faIcon="fa-solid fa-eraser"
            type="reset"
            _type="secondary"
            onClick={handleResetClick}
          />
          <StateButton
            text="Confirmar"
            faIcon="fa-solid fa-check"
            {...{ actionState }}
          />
        </div>
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
