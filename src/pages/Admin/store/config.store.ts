import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Key = 'mainServerUrl' | 'commentsReports'
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
        commentsReports: `Estos datos corresponden a gestión administrativa. Por cuestiones burocráticas podría diferir con el avance real de la obra y la disponibilidad presupuestaria.
La mayoría de las obras por Administración son intervenciones menores y de mantenimiento.

Las obras con expedientes electrónicos están confirmadas. Y las obras con expedientes en papel están sujetas a revisión.`,
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
