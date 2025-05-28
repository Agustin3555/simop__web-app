import { LocalStorageEntity } from '..'
import { EmpresaMeta } from '@/pages/Admin/modules/empresa'

export const lastVisitedViewEntity = new LocalStorageEntity(
  'last-visited-view',
  EmpresaMeta.key,
)
