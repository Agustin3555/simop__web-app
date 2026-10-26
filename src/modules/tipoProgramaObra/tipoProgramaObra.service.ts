import { createService } from '@/infra/http/service.helper'
import { TipoProgramaObraModel } from '.'

export const TipoProgramaObraService =
  createService<TipoProgramaObraModel.Entity>('tipos-programas-obra')
