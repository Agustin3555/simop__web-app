import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import { useConfigs } from './useConfigs.hook'
import { useMetaModel } from './useMetaModel.hook'
import { BaseConfig } from '../contexts/configs.context'

export const useConfigModule = () => {
  const { configs, setConfigs } = useConfigs()
  const { key } = useMetaModel()

  const config = configs[key]

  const selectedConfig = useMemo(() => {
    const { selected, items } = config
    return items.find(v => v.id === selected)!
  }, [config])

  const add = useCallback((baseConfig: BaseConfig) => {
    setConfigs(prev => {
      const newState = structuredClone(prev)

      newState[key].currentIdIndex++

      const { currentIdIndex: id } = newState[key]

      newState[key].items.push({ id, ...baseConfig })

      return newState
    })
  }, [])

  const remove = useCallback((id: number) => {
    setConfigs(prev => {
      const newState = structuredClone(prev)

      newState[key].items = newState[key].items.filter(v => v.id !== id)

      return newState
    })
  }, [])

  const clone = useCallback((id: number) => {
    const copy = configs[key].items.find(v => v.id === id)!

    add({ title: `${copy.title} (copia)`, columns: copy.columns })
  }, [])

  const getSetSelected = useCallback<
    (id: number) => Dispatch<SetStateAction<string[]>>
  >(
    id => columns => {
      setConfigs(prev => {
        const newState = structuredClone(prev)

        const item = newState[key].items.find(v => v.id === id)!

        item.columns =
          typeof columns === 'function' ? columns(item.columns) : columns

        return newState
      })
    },
    [],
  )

  const editTitle = useCallback<(id: number, newTitle: string) => void>(
    (id, newTitle) => {
      setConfigs(prev => {
        const newState = structuredClone(prev)

        const item = newState[key].items.find(v => v.id === id)!

        item.title = newTitle

        return newState
      })
    },
    [],
  )

  const selectConfig = useCallback((id: number) => {
    setConfigs(prev => {
      const newState = structuredClone(prev)

      newState[key].selected = id

      return newState
    })
  }, [])

  return {
    config: configs[key],
    selectedConfig,
    add,
    remove,
    clone,
    getSetSelected,
    editTitle,
    selectConfig,
  }
}
