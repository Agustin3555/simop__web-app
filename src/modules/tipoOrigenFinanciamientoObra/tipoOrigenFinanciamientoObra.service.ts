import { createService } from '@/infra/http/service.helper'
import { TipoOrigenFinanciamientoObraModel } from '.'

export const TipoOrigenFinanciamientoObraService =
  createService<TipoOrigenFinanciamientoObraModel.Entity>(
    'tipos-origenes-financiamientos-obra',
  )
