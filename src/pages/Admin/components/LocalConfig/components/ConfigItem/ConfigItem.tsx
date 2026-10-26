import { MouseEventHandler, useCallback, useMemo, useState } from 'react'
import { useAppStore } from '@/store/config'
import { useHandleAction } from '@/hooks'
import { Button } from '@/components'
import { useInputHandler } from '@/pages/Admin/hooks/useInputHandler.hook'
import { useTableDef } from '@/pages/Admin/hooks/useTableDef.hook'
import Checker from '../../../Checker/Checker'
import { Config } from '@/shared/contexts/Configs/configs.store'
import { useConfigs } from '@/shared/contexts/Configs/useConfigs.hook'
import { ComboboxProps, NewCombobox } from '@/shared/components'

interface ConfigProps {
  config: Config
  comboboxProps: Pick<ComboboxProps, 'options' | 'staticSelected'>
}

const ConfigItem = ({
  config: { id, title: initTitle, states },
  comboboxProps: { options, staticSelected },
}: ConfigProps) => {
  const [title, setTitle] = useState(initTitle)
  const toasting = useAppStore(s => s.toasting)

  const {
    tableDef: { key },
  } = useTableDef()

  const isSelected = useConfigs(s => s.selectedId === id)
  const remove = useConfigs(s => s.remove)
  const clone = useConfigs(s => s.clone)
  const editTitle = useConfigs(s => s.editTitle)
  const setColumnFetch = useConfigs(s => s.setColumnFetch)
  const selectConfig = useConfigs(s => s.selectConfig)

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
    <div className="cmp-config-item">
      <header>
        <label title="Seleccionar">
          <input
            name={`config-selectors-${key}`}
            type="radio"
            value={id}
            checked={isSelected}
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
          {!isSelected && (
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
        {/* <Combobox
          keyName={`columns-${key}`}
          title="Columnas"
          selected={states.columnFetch}
          setSelected={getSetSelected(id)}
          isMultiple
          {...{ staticSelected, options }}
        /> */}
        <NewCombobox
          name={`columns-${key}`}
          selected={states.columnFetch}
          multiple
          onChange={selected => setColumnFetch(id, selected)}
          {...{ options, staticSelected }}
        />
      </div>
    </div>
  )
}

export default ConfigItem
