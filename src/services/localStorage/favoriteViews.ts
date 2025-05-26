import {
  EmpresaModel,
  FojaMedicionModel,
  ObraModel,
} from '@/pages/Admin/models'
import { LocalStorageEntity } from './config'

export const favoriteViewsEntity = new LocalStorageEntity<string[]>(
  'favorite-views',
  [
    EmpresaModel.metaModel.key,
    ObraModel.metaModel.key,
    FojaMedicionModel.metaModel.key,
    'obraTotales',
    'obraDetalle',
  ],
)
