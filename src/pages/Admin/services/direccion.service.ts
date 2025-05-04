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

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return DireccionAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return DireccionAdapter.getOne.output(response.data)
  },

  create: async (data: DireccionModel.CreateEntity) => {
    const adaptedInput = DireccionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: DireccionModel.UpdateEntity) => {
    const adaptedInput = DireccionAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
