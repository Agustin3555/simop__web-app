import { createService } from '@/infra/http/service.helper'
import { TipoFinanciamientoObraModel } from '.'

export const TipoFinanciamientoObraService =
  createService<TipoFinanciamientoObraModel.Entity>(
    'tipos-financiamientos-obra',
  )
