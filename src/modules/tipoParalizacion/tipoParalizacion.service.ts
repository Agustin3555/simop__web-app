import { createService } from '@/infra/http/service.helper'
import { TipoParalizacionModel } from '.'

export const TipoParalizacionService =
  createService<TipoParalizacionModel.Entity>('tipos-paralizaciones')
