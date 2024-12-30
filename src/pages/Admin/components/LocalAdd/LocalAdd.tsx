import './LocalAdd.css'
import { cloneElement, ReactElement, ReactNode, useMemo } from 'react'
import { FormValues, useSubmitAction } from '@/hooks'
import { useScheme } from '../../hooks'
import { Button, Input, StateButton } from '@/components'
import { Checkbox, Combobox, InputArea } from '..'
import { Control } from '@/types'

interface FieldGroup {
  title?: string
  fields: (
    | {
        accessorKey: string
        // getValue: (data: FormValues) => (key: string) => any
        component: ReactNode
      }
    | undefined
  )[]
}

const LocalAdd = () => {
  const scheme = useScheme()

  const fieldGroups = useMemo<FieldGroup[]>(
    () =>
      scheme.groups.map(({ title, props }) => ({
        title,
        fields: Object.values(props).map(
          ({ accessorKey, title, type, field, ...rest }) => {
            if (field === false) return

            let component: ReactElement

            switch (type) {
              case 'text': {
                const { textConfig } = rest

                const { field } = textConfig ?? {}
                const { required } = field ?? {}

                component = (
                  <Input name={accessorKey} {...{ title, required }} />
                )
                break
              }

              case 'textArea': {
                const { textAreaConfig } = rest

                const { field } = textAreaConfig ?? {}
                const { required } = field ?? {}

                component = (
                  <InputArea name={accessorKey} {...{ title, required }} />
                )
                break
              }

              case 'number': {
                const { numberConfig } = rest

                const { field } = numberConfig ?? {}
                const { required } = field ?? {}

                component = (
                  <Input
                    name={accessorKey}
                    type="number"
                    {...{ title, required }}
                  />
                )
                break
              }

              case 'date': {
                const { dateConfig } = rest

                const { field } = dateConfig ?? {}
                const { required } = field ?? {}

                component = (
                  <Input
                    name={accessorKey}
                    type="date"
                    {...{ title, required }}
                  />
                )
                break
              }

              case 'dateTime': {
                const { dateTimeConfig } = rest

                const { field } = dateTimeConfig ?? {}
                const { required } = field ?? {}

                component = (
                  <Input
                    name={accessorKey}
                    type="datetime-local"
                    {...{ title, required }}
                  />
                )
                break
              }

              case 'boolean': {
                const { booleanConfig } = rest

                const { falseText, trueText } = booleanConfig ?? {}

                component = (
                  <Checkbox
                    name={accessorKey}
                    {...{ title, falseText, trueText }}
                  />
                )
                break
              }

              case 'ref': {
                const { refConfig } = rest

                const { getScheme, field } = refConfig ?? {}
                const { required } = field ?? {}
                const { getForConnect } = getScheme!().service

                component = (
                  <Combobox
                    name={accessorKey}
                    {...{ title, required, getForConnect }}
                  />
                )
                break
              }

              case 'refList': {
                break
              }
            }

            // Agrega a cualquier componente la prop key
            component = cloneElement<Control>(component!, {
              key: accessorKey,
            })

            return { accessorKey, component }
          },
        ),
      })),
    [],
  )

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formValues, setError, setSuccess }) => {
      try {
        // const createData = fieldGroups.reduce((acc, { fields }) => {
        //   fields.forEach(({ accessorKey, getValue }) => {
        //     acc[accessorKey] = getValue(formValues)(accessorKey as string)
        //   })

        //   return acc
        // }, {} as Record<keyof T, any>)

        // await scheme.service.create!(createData)

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
                {fields.map(item => item && item.component)}
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
