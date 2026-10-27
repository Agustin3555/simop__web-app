import { createService } from '@/infra/http/service.helper'
import { RescisionModel } from '.'

export const RescisionService =
  createService<RescisionModel.Entity>('rescisiones')
