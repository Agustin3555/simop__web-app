import { LocalStorageEntity } from '../localStorageEntity'

export const lastVisitedViewEntity = new LocalStorageEntity(
  'last-visited-view',
  data => typeof data === 'string',
)
