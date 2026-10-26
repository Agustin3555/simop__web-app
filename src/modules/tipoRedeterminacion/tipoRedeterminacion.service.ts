import { createService } from '@/infra/http/service.helper'
import { TipoRedeterminacionModel } from '.'

export const TipoRedeterminacionService =
  createService<TipoRedeterminacionModel.Entity>('tipos-redeterminaciones')
