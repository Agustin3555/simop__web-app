import { LocalStorageEntity } from './config'

export const lastVisitedViewEntity = new LocalStorageEntity<string>(
  'last-visited-view',
)
