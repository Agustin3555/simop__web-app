import { createService } from '@/infra/http/service.helper'
import { TipoInspectorModel } from '.'

export const TipoInspectorService =
  createService<TipoInspectorModel.Entity>('tipos-inspectores')
