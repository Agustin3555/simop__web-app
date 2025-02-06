import { publicInstance, Service } from '@/services/config'
import { RescisionModel } from '../models'
import { RescisionAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('rescisiones')

export const RescisionService: Service<RescisionModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return RescisionAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return RescisionAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return RescisionAdapter.getOne.output(response.data)
  },

  create: async (data: RescisionModel.CreateData) => {
    const adaptedInput = RescisionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
