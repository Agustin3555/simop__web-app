import { createService } from '@/infra/http/service.helper'
import { TipoProfesionModel } from '.'

export const TipoProfesionService =
  createService<TipoProfesionModel.Entity>('tipos-profesiones')
