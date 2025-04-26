import { publicInstance, Service } from '@/services/config'
import { ObraTotalesModel } from '../models'
import { ObraTotalesAdapter } from '../adapters'
import { buildPath } from '@/helpers'

const collection = buildPath('obras')

export const ObraTotalesService: Service<ObraTotalesModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection('totales'))

    return ObraTotalesAdapter.getAll.output(response.data)
  },
}
