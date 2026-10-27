import { createService } from '@/infra/http/service.helper'
import { RecepcionModel } from '.'

export const RecepcionService =
  createService<RecepcionModel.Entity>('recepciones')
