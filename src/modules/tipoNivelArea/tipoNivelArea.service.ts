import { createService } from '@/infra/http/service.helper'
import { TipoNivelAreaModel } from '.'

export const TipoNivelAreaService =
  createService<TipoNivelAreaModel.Entity>('tipos-niveles-area')
