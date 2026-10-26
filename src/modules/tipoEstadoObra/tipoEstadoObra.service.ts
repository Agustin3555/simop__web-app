import { createService } from '@/infra/http/service.helper'
import { TipoEstadoObraModel } from '.'

export const TipoEstadoObraService =
  createService<TipoEstadoObraModel.Entity>('tipos-estados-obra')
