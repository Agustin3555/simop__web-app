import { createService } from '@/infra/http/service.helper'
import { DepartamentoModel } from '.'

export const DepartamentoService =
  createService<DepartamentoModel.Entity>('departamentos')
