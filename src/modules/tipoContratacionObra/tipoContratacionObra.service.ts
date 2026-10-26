import { createService } from '@/infra/http/service.helper'
import { TipoContratacionObraModel } from '.'

export const TipoContratacionObraService =
  createService<TipoContratacionObraModel.Entity>('tipos-contrataciones-obra')
