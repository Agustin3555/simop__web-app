import { createService } from '@/infra/http/service.helper'
import { InspectorObraModel } from '.'

export const InspectorObraService =
  createService<InspectorObraModel.Entity>('inspectores-obras')
