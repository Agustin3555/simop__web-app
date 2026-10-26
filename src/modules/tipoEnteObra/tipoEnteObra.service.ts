import { createService } from '@/infra/http/service.helper'
import { TipoEnteObraModel } from '.'

export const TipoEnteObraService =
  createService<TipoEnteObraModel.Entity>('tipos-entes-obra')
