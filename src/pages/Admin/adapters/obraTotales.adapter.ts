import { OutputAdapter } from '@/adapters/config'
import { ObraTotalesModel } from '../models'

export const getAll: {
  output: OutputAdapter<ObraTotalesModel.RawEntity[], ObraTotalesModel.Entity[]>
} = {
  output: response => response,
}
