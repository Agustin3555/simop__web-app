import { publicInstance, Service } from '@/services/config'
import { ObraModel } from '../models'
import { ObraAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('obras')

export const ObraService: Service<ObraModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return ObraAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return ObraAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return ObraAdapter.getOne.output(response.data)
  },

  create: async (data: ObraModel.CreateData) => {
    const adaptedInput = ObraAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
