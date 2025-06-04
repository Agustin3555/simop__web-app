import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { DireccionModel } from '.'
import { DireccionAdapter } from './direccion.adapter'

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

    const response = await publicInstance.post(collection(), adaptedInput)

    return DireccionAdapter.create.output(response.data)
  },

  updateOne: async (id, data: DireccionModel.UpdateEntity) => {
    const adaptedInput = DireccionAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return DireccionAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
