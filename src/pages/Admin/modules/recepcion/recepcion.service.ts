import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { RecepcionModel } from '.'
import { RecepcionAdapter } from './recepcion.adapter'

const collection = buildPath('recepciones')

export const RecepcionService = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return RecepcionAdapter.getAll.output(response.data)
  },

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return RecepcionAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return RecepcionAdapter.getOne.output(response.data)
  },

  create: async (data: RecepcionModel.CreateEntity) => {
    const adaptedInput = RecepcionAdapter.create.input(data)

    const response = await publicInstance.post(collection(), adaptedInput)

    return RecepcionAdapter.create.output(response.data)
  },

  updateOne: async (id, data: RecepcionModel.UpdateEntity) => {
    const adaptedInput = RecepcionAdapter.updateOne.input(data)

    const response = await publicInstance.put(collection(id), adaptedInput)

    return RecepcionAdapter.updateOne.output(response.data)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
} satisfies Service<RecepcionModel.Entity>
