import { createService } from '@/infra/http/service.helper'
import { APGModel } from '.'

export const APGService = createService<APGModel.Entity>('apgs')
