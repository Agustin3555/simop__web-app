import { createService } from '@/infra/http/service.helper'
import { RepresentanteEmpresaModel } from '.'

export const RepresentanteEmpresaService =
  createService<RepresentanteEmpresaModel.Entity>('representantes-empresas')
