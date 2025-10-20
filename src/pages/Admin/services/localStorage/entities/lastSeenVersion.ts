import { LocalStorageEntity } from '../localStorageEntity'

export const lastSeenVersionEntity = new LocalStorageEntity<string>(
  'last-seen-version',
  data => typeof data === 'string',
)
