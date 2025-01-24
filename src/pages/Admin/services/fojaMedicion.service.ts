import { publicInstance, Service } from '@/services/config'
import { FojaMedicionModel } from '../models'
import { FojaMedicionAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('fojas-mediciones')

export const FojaMedicionService: Service<FojaMedicionModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return FojaMedicionAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return FojaMedicionAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return FojaMedicionAdapter.getOne.output(response.data)
  },

  create: async (data: FojaMedicionModel.CreateData) => {
    const adaptedInput = FojaMedicionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
