import { createService } from '@/infra/http/service.helper'
import { ParalizacionModel } from '.'

export const ParalizacionService =
  createService<ParalizacionModel.Entity>('paralizaciones')
