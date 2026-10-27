import { createService } from '@/infra/http/service.helper'
import { RedeterminacionModel } from '.'

export const RedeterminacionService =
  createService<RedeterminacionModel.Entity>('redeterminaciones')
