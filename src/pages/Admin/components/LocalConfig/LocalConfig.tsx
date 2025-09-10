import './LocalConfig.css'
import { useCallback, useMemo, useState } from 'react'
import { useAppStore } from '@/store/config'
import { useSubmitAction } from '@/hooks'
import { useConfigModule, useMetaModel } from '../../hooks'
import { Button, Icon, Input } from '@/components'
import { Combobox } from '..'
import { Config } from './components'

const STATIC_SELECTED = ['id']

const LocalConfig = () => {
  const [creating, setCreating] = useState(false)

  const toasting = useAppStore(store => store.toasting)
  const { allFields, props } = useMetaModel()

  const { config, add } = useConfigModule()

  const options = useMemo(
    () => allFields.map(k => ({ id: k, title: props[k].title })),
    [],
  )

  const handleCreatingClick = useCallback(() => setCreating(prev => !prev), [])

  const { actionState, handleSubmit } = useSubmitAction(
    async ({ formData, setSuccess, setError }) => {
      try {
        add({
          title: formData.get('title') as string,
          columns: formData.getAll('columns') as string[],
        })

        toasting('success', 'Agregado con éxito')
        setCreating(false)

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

  return (
    <div className="cmp-local-config">
      {config.items.map(item => (
        <Config
          key={item.id}
          staticSelected={STATIC_SELECTED}
          {...{ ...item, options }}
        />
      ))}
      {creating ? (
        <form className="new-config" onSubmit={handleSubmit}>
          <header>
            <Input
              keyName="title"
              title="Nombre"
              required
              hideLabel
              inputHTMLAttrs={{ placeholder: 'Nombre...' }}
            />
            <Button
              title="Descartar configuración"
              faIcon="fa-solid fa-xmark"
              size="s"
              type="secondary"
              onAction={handleCreatingClick}
            />
          </header>
          <div className="content">
            <Combobox
              keyName="columns"
              title="Columnas"
              multiple
              staticSelected={STATIC_SELECTED}
              {...{ options }}
            />
            <Button
              text="Confirmar"
              faIcon="fa-solid fa-check"
              submit
              size="m"
              {...{ actionState }}
            />
          </div>
        </form>
      ) : (
        <button title="Crear nueva configuración" onClick={handleCreatingClick}>
          <Icon faIcon="fa-solid fa-circle-plus" />
          Crear configuración
        </button>
      )}
    </div>
  )
}

export default LocalConfig
