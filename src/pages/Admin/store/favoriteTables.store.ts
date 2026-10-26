import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TableKey } from '../constants/metaModelKey.const'

interface FavoriteTablesState {
  tables: TableKey[]
  isFavorite: (tableKey: TableKey) => boolean
  add: (tableKey: TableKey) => void
  remove: (tableKey: TableKey) => void
  toggle: (tableKey: TableKey) => void
}

export const useFavoriteTables = create<FavoriteTablesState>()(
  persist(
    (set, get) => ({
      tables: [],

      isFavorite: (tableKey: TableKey) => get().tables.includes(tableKey),

      add: (tableKey: TableKey) => {
        const { tables } = get()
        if (tables.includes(tableKey)) return

        set({ tables: [...tables, tableKey] })
      },

      remove: (tableKey: TableKey) => {
        set(s => ({
          tables: s.tables.filter(key => key !== tableKey),
        }))
      },

      toggle: (tableKey: TableKey) => {
        const { isFavorite, add, remove } = get()

        if (isFavorite(tableKey)) remove(tableKey)
        else add(tableKey)
      },
    }),
    {
      name: 'favorite-tables-store',
      partialize: s => ({
        tables: s.tables,
      }),
    },
  ),
)
