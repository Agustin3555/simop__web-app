import { createService } from '@/infra/http/service.helper'
import { TipoTematicaObraModel } from '.'

export const TipoTematicaObraService =
  createService<TipoTematicaObraModel.Entity>('tipos-tematicas-obra')
