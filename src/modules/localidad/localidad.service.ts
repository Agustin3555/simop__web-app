import { createService } from '@/infra/http/service.helper'
import { LocalidadModel } from '.'

export const LocalidadService =
  createService<LocalidadModel.Entity>('localidades')
