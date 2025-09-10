import { Configs } from '@/pages/Admin/contexts/configs.context'
import { LocalStorageEntity } from '../localStorageEntity'

export const configsEntity = new LocalStorageEntity<Configs>(
  'configs',
  data => typeof data === 'object',
)
