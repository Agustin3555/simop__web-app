import { createService } from '@/infra/http/service.helper'
import { TipoModificacionModel } from '.'

export const TipoModificacionService =
  createService<TipoModificacionModel.Entity>('tipos-modificaciones')
