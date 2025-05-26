import { EmpresaModel } from '@/pages/Admin/models'
import { LocalStorageEntity } from './config'

export const lastVisitedViewEntity = new LocalStorageEntity(
  'last-visited-view',
  EmpresaModel.metaModel.key,
)
