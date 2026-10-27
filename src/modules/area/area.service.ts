import { createService } from '@/infra/http/service.helper'
import { AreaModel } from '.'

export const AreaService = createService<AreaModel.Entity>('areas')
