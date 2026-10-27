import { createService } from '@/infra/http/service.helper'
import { InspectorModel } from '.'

export const InspectorService =
  createService<InspectorModel.Entity>('inspectores')
