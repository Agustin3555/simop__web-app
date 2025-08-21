import { createContext } from 'react'

interface BaseConfig {
  title: string
  columns: string[]
}

export interface Config extends BaseConfig {
  id: string
  selected: boolean
}

export type Configs = Record<string, Config[]>

export interface ConfigsContextProps {
  configs: Configs
  add: (baseConfig: BaseConfig) => void
  toggleSelection: (id: Config['id']) => void
}

export const ConfigsContext = createContext<ConfigsContextProps | undefined>(
  undefined,
)
