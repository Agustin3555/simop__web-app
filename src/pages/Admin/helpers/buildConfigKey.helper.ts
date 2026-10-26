import { Config } from '@/shared/contexts/Configs/configs.store'

export const buildConfigKey = (modelKey: string, selectedConfig: Config) => {
  const {
    id,
    states: { columnFetch },
  } = selectedConfig

  return [modelKey, id, columnFetch.length]
}
