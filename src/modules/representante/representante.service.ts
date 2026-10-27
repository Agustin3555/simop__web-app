import { createService } from '@/infra/http/service.helper'
import { RepresentanteModel } from '.'

export const RepresentanteService =
  createService<RepresentanteModel.Entity>('representantes')
