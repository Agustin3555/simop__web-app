import { createContext, Dispatch, SetStateAction } from 'react'

export interface BaseConfig {
  title: string
  columns: string[]
}

export interface Config extends BaseConfig {
  id: number
}

export type Configs = Record<
  string,
  {
    currentIdIndex: number
    selected: number
    items: Config[]
  }
>

export interface ConfigsContextProps {
  configs: Configs
  setConfigs: Dispatch<SetStateAction<Configs>>
}

export const ConfigsContext = createContext<ConfigsContextProps | undefined>(
  undefined,
)
