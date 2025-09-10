import { MouseEventHandler, useCallback, useState } from 'react'
import { useAppStore } from '@/store/config'
import {
  useConfigModule,
  useInputHandler,
  useMetaModel,
} from '@/pages/Admin/hooks'
import { useHandleAction } from '@/hooks'
import { Button } from '@/components'
import { Checker } from '../../..'
import Combobox, { ComboboxProps } from '../../../Combobox/Combobox'
import { Config as ConfigCtx } from '@/pages/Admin/contexts/configs.context'

interface ConfigProps
  extends ConfigCtx,
    Pick<ComboboxProps, 'options' | 'staticSelected'> {}

const Config = ({
  id,
  title: initTitle,
  columns,
  staticSelected,
  options,
}: ConfigProps) => {
  const [title, setTitle] = useState(initTitle)

  const toasting = useAppStore(store => store.toasting)
  const { key } = useMetaModel()

  const { config, remove, clone, getSetSelected, editTitle, selectConfig } =
    useConfigModule()

  const handleChange = useInputHandler(id => selectConfig(Number(id)))

  const handleCloneClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    e => {
      clone(Number(e.currentTarget.name))
      toasting('success', 'Copia creada con éxito')
    },
    [],
  )

  const deleteAction = useHandleAction(async ({ setSuccess, setError }) => {
    try {
      remove(id)
      toasting('success', 'Eliminado con éxito')

      await setSuccess()
    } catch (error) {
      await setError()
    }
  })

  const handleTitleChange = useInputHandler(value => setTitle(value))

  const handleTitleBlur = useCallback(
    () => initTitle !== title && editTitle(id, title),
    [title],
  )

  return (
    <div className="cmp-config">
      <header>
        <label title="Seleccionar">
          <input
            name={`config-selectors-${key}`}
            type="radio"
            value={id}
            checked={config.selected === id}
            onChange={handleChange}
          />
          <Checker />
        </label>
        <input
          title="Cambiar nombre"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
        />
        <div className="actions">
          {config.selected !== id && (
            <Button
              title="Eliminar configuración"
              name={String(id)}
              faIcon="fa-solid fa-trash"
              size="s"
              type="secondary"
              hold
              {...deleteAction}
            />
          )}
          <Button
            title="Duplicar configuración"
            name={String(id)}
            faIcon="fa-solid fa-clone"
            size="s"
            type="secondary"
            onAction={handleCloneClick}
          />
        </div>
      </header>
      <div className="content">
        <Combobox
          keyName={`columns-${key}`}
          title="Columnas"
          selected={columns}
          setSelected={getSetSelected(id)}
          multiple
          {...{ staticSelected, options }}
        />
      </div>
    </div>
  )
}

export default Config
