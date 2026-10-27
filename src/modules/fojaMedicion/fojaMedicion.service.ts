import { createService } from '@/infra/http/service.helper'
import { FojaMedicionModel } from '.'

export const FojaMedicionService =
  createService<FojaMedicionModel.Entity>('fojas-mediciones')
