import { LocalStorageEntity } from '../localStorageEntity'

export const favoriteViewsEntity = new LocalStorageEntity(
  'favorite-views-2',
  data => Array.isArray(data) && data.every(item => typeof item === 'string'),
)
