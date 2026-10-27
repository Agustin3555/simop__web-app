import { createService } from '@/infra/http/service.helper'
import { AmpliacionModel } from '.'

export const AmpliacionService =
  createService<AmpliacionModel.Entity>('ampliaciones')
