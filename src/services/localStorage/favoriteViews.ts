import { LocalStorageEntity } from './config'
import { EmpresaMeta } from '@/pages/Admin/modules/empresa'
import { FojaMedicionMeta } from '@/pages/Admin/modules/fojaMedicion'
import { ObraMeta } from '@/pages/Admin/modules/obra'

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
