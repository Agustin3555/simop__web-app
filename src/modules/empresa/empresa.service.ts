import { createService } from '@/infra/http/service.helper'
import { EmpresaModel } from '.'

export const EmpresaService = createService<EmpresaModel.Entity>('empresas')
