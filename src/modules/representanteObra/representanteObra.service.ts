import { createService } from '@/infra/http/service.helper'
import { RepresentanteObraModel } from '.'

export const RepresentanteObraService =
  createService<RepresentanteObraModel.Entity>('representantes-obras')
