import { LocalStorageEntity } from '..'
import { EmpresaMeta } from '@/pages/Admin/modules/empresa/empresa.meta'
import { FojaMedicionMeta } from '@/pages/Admin/modules/fojaMedicion/fojaMedicion.meta'
import { ObraMeta } from '@/pages/Admin/modules/obra/obra.meta'

export const favoriteViewsEntity = new LocalStorageEntity<string[]>(
  'favorite-views',
  [
    EmpresaMeta.key,
    ObraMeta.key,
    FojaMedicionMeta.key,
    'obraTotales',
    'obraDetalle',
  ],
)
