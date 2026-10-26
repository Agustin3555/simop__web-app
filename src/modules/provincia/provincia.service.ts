import { createService } from '@/infra/http/service.helper'
import { ProvinciaModel } from '.'

export const ProvinciaService =
  createService<ProvinciaModel.Entity>('provincias')
