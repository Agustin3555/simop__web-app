import { createService } from '@/infra/http/service.helper'
import { ModificacionModel } from '.'

export const ModificacionService =
  createService<ModificacionModel.Entity>('modificaciones')
