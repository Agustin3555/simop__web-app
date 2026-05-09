import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Key = 'mainServerUrl'
type Value = undefined | boolean | number | string

interface ConfigState {
  config: Record<Key, Value>

  setConfig: (key: Key, value: Value) => void
}

export const useConfig = create<ConfigState>()(
  persist(
    set => ({
      config: {
        mainServerUrl: undefined,
      },

      setConfig: (key, value) => {
        set(s => ({ config: { ...s.config, [key]: value } }))
      },
    }),
    {
      name: 'config-store',
      partialize: s => ({
        config: s.config,
      }),
    },
  ),
)
