import { publicInstance, Service } from '@/services/config'
import { ObraModel } from '../models'
import { ObraAdapter } from '../adapters'
import { buildPath } from '@/helpers'

const collection = buildPath('obras')

export const ObraTotalesService: Service<ObraModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection('totales'))

    return ObraAdapter.getAll.output(response.data)
  },
}
