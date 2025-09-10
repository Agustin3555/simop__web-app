import { Config } from '../contexts/configs.context'

export const buildConfigKey = (modelKey: string, selectedConfig: Config) => {
  const { id, columns } = selectedConfig
  return [modelKey, id, columns.length]
}
