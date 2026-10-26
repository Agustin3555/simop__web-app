import './LocalConfig.css'
import { useCallback, useMemo, useState } from 'react'
import { useAppStore } from '@/store/config'
import { useSubmitAction } from '@/hooks'
import { Button, Icon, Input } from '@/components'
import { ConfigItem } from './components'
import { useTableDef } from '../../hooks/useTableDef.hook'
import { useConfigs } from '@/shared/contexts/Configs/useConfigs.hook'
import { ComboboxProps, NewCombobox } from '@/shared/components'

const STATIC_SELECTED = ['id']

const LocalConfig = () => {
  const [creating, setCreating] = useState(false)
  const toasting = useAppStore(s => s.toasting)
  const add = useConfigs(s => s.add)
  const configs = useConfigs(s => s.configs)

  const { columns } = useTableDef()

  const options = useMemo(
    () =>
      columns.map<ComboboxProps['options'][number]>(
        ({ usefulDef: { key: value, title: label } }) => ({ value, label }),
      ),
    [],
  )

  const handleCreatingClick = useCallback(() => setCreating(prev => !prev), [])

  const { actionState, handleSubmit } = useSubmitAction(
    async ({ formData, setSuccess, setError }) => {
      try {
        add({
          title: formData.get('title') as string,
          columns: JSON.parse(
            formData.get('columnFetch') as string,
          ) as string[],
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
      {configs.map(c => (
        <ConfigItem
          key={c.id}
          config={c}
          comboboxProps={{ options, staticSelected: STATIC_SELECTED }}
        />
      ))}
      {creating ? (
        <form className="new-config form-style" onSubmit={handleSubmit}>
          <header>
            <Input
              keyName="title"
              title="Nombre"
              isRequired
              hideLabel
              inputHTMLAttrs={{ placeholder: 'Nombre...', required: true }}
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
            <NewCombobox
              name="columnFetch"
              multiple
              required
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
