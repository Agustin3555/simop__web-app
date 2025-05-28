import { EmpresaMeta } from '@/pages/Admin/modules/empresa/empresa.meta'
import { LocalStorageEntity } from '..'

export const lastVisitedViewEntity = new LocalStorageEntity(
  'last-visited-view',
  EmpresaMeta.key,
)
