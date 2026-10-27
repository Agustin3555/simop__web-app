import { createService } from '@/infra/http/service.helper'
import { PagoCertificacionModel } from '.'

export const PagoCertificacionService =
  createService<PagoCertificacionModel.Entity>('pagos-certificaciones')
