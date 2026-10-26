import { TableKey } from '@/pages/Admin/constants/metaModelKey.const'
import {
  ColumnKey,
  TableState,
} from '@/shared/components/Table/contexts/Table/table.store'
import { persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

type Key = number

type SavedTableStates = Pick<
  TableState,
  | 'columnOrder'
  | 'columnVisibility'
  | 'columnWidths'
  | 'columnSorting'
  | 'columnFilters'
  | 'columnCalcs'
>

export type Config = {
  id: Key
  title: string
  states: SavedTableStates & { columnFetch: ColumnKey[] }
}

type ConfigInput = {
  title: string
  columns: ColumnKey[]
}

export interface ConfigsState {
  currentIdIndex: Key
  selectedId: Key
  configs: Config[]

  getSelectedConfig: () => Config
  add: (config: ConfigInput) => void
  remove: (id: Key) => void
  clone: (id: Key) => void
  editTitle: (id: Key, title: string) => void
  selectConfig: (id: Key) => void

  setColumnFetch: (id: Key, columnFetch: ColumnKey[]) => void
  setSelectedStates: (states: SavedTableStates) => void
}

interface CreateConfigsStoreProps {
  tableKey: TableKey
  columnKeys: ColumnKey[]
}

export const createConfigsStore = ({
  tableKey,
  columnKeys: columnFetch,
}: CreateConfigsStoreProps) => {
  const DEFAULT_CONFIG: Config = {
    id: 0,
    title: 'Por defecto',
    states: {
      columnFetch,
      columnOrder: [],
      columnVisibility: [],
      columnWidths: [],
      columnSorting: [],
      columnFilters: [],
      columnCalcs: [],
    },
  }

  return createStore<ConfigsState>()(
    persist<ConfigsState>(
      (set, get) => ({
        currentIdIndex: 0,
        selectedId: 0,
        configs: [DEFAULT_CONFIG],

        getSelectedConfig: () => {
          const { configs, selectedId } = get()

          return configs.find(({ id }) => id === selectedId)!
        },

        add: ({ title, columns }) => {
          set(s => {
            const id = s.currentIdIndex + 1

            return {
              currentIdIndex: id,
              configs: [
                ...s.configs,
                {
                  id,
                  title,
                  states: {
                    ...DEFAULT_CONFIG.states,
                    columnFetch: columns,
                  },
                },
              ],
            }
          })
        },

        remove: id => {
          set(s => ({
            configs: s.configs.filter(config => config.id !== id),
          }))
        },

        clone: id => {
          const config = get().configs.find(item => item.id === id)
          if (!config) throw new Error(`Configuration ${id} was not found`)

          set(s => {
            const newId = s.currentIdIndex + 1

            return {
              currentIdIndex: newId,
              configs: [
                ...s.configs,
                {
                  ...structuredClone(config),
                  id: newId,
                  title: `${config.title} (copia)`,
                },
              ],
            }
          })
        },

        editTitle: (id, title) => {
          set(s => ({
            configs: s.configs.map(c => (c.id === id ? { ...c, title } : c)),
          }))
        },

        selectConfig: selectedId => {
          set({ selectedId })
        },

        setColumnFetch: (id, columnFetch) => {
          set(s => ({
            configs: s.configs.map(c =>
              c.id === id ? { ...c, states: { ...c.states, columnFetch } } : c,
            ),
          }))
        },

        setSelectedStates: states => {
          set(s => ({
            configs: s.configs.map(c =>
              c.id === s.selectedId
                ? { ...c, states: { ...c.states, ...states } }
                : c,
            ),
          }))
        },
      }),

      { name: `${tableKey}-configs-store` },
    ),
  )
}

export type ConfigsStore = ReturnType<typeof createConfigsStore>
