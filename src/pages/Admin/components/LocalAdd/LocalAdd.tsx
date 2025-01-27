import './LocalAdd.css'
import { useMemo } from 'react'
import { useSubmitAction } from '@/hooks'
import { useScheme } from '../../hooks'
import { Button, StateButton } from '@/components'
import { useAppStore } from '@/store/config'

const LocalAdd = () => {
  const { scheme } = useScheme()
  const { service, groups } = scheme

  const toasting = useAppStore(store => store.toasting)

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
          Object.values(props).forEach(({ key, getFieldValue }) => {
            const value = getFieldValue(formData, form)

            if (value !== undefined) acc[key as keyof typeof acc] = value
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

  return (
    <div className="cmp-local-add">
      <form onSubmit={handleSubmit}>
        <div className="field-groups">
          {fieldGroups.map(({ title, fields }, index) => (
            <div key={title || index} className="group">
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

export default LocalAdd
