import './LocalAdd.css'
import { FormValues, useSubmitAction } from '@/hooks'
import { useScheme } from '../../hooks'
import { Button, StateButton } from '@/components'
import { cloneElement, ReactElement } from 'react'
import { Control } from '@/types'

interface Props<T> {
  createProvider: (data: T) => Promise<boolean>
  fieldGroups: {
    title?: string
    fields: {
      accessorKey: keyof T
      getValue: (data: FormValues) => (key: string) => any
      component: ReactElement
    }[]
  }[]
}

const LocalAdd = <T,>({ createProvider, fieldGroups }: Props<T>) => {
  const scheme = useScheme()

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formValues, setError, setSuccess }) => {
      try {
        const createData = fieldGroups.reduce((acc, { fields }) => {
          fields.forEach(({ accessorKey, getValue }) => {
            acc[accessorKey] = getValue(formValues)(accessorKey as string)
          })

          return acc
        }, {} as Record<keyof T, any>)

        await createProvider(createData)

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
              <div className="fields">
                {fields.map(({ accessorKey, component }) => {
                  const key = accessorKey as string

                  return cloneElement<Control>(component, { key, name: key })
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="actions">
          <Button
            title="Limpiar"
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
