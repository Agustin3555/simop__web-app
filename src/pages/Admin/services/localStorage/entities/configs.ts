import { LocalStorageEntity } from '../localStorageEntity'

export const configsEntity = new LocalStorageEntity(
  'configs',
  data => typeof data === 'object',
)
