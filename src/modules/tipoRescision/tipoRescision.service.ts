import { createService } from '@/infra/http/service.helper'
import { TipoRescisionModel } from '.'

export const TipoRescisionService =
  createService<TipoRescisionModel.Entity>('tipos-rescisiones')
