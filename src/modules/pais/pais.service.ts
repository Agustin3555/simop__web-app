import { createService } from '@/infra/http/service.helper'
import { PaisModel } from '.'

export const PaisService = createService<PaisModel.Entity>('paises')
