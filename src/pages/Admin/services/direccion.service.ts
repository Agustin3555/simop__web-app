import { publicInstance, Service } from '@/services/config'
import { DireccionModel } from '../models'
import { DireccionAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('direcciones')

export const DireccionService: Service<DireccionModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return DireccionAdapter.getAll.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return DireccionAdapter.getOne.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return DireccionAdapter.getForConnect.output(response.data)
  },

  create: async (data: DireccionModel.CreateData) => {
    const adaptedInput = DireccionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
