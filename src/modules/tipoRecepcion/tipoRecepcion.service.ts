import { createService } from '@/infra/http/service.helper'
import { TipoRecepcionModel } from '.'

export const TipoRecepcionService =
  createService<TipoRecepcionModel.Entity>('tipos-recepciones')
