import { createService } from '@/infra/http/service.helper'
import { TipoRepresentanteModel } from '.'

export const TipoRepresentanteService =
  createService<TipoRepresentanteModel.Entity>('tipos-representantes')
