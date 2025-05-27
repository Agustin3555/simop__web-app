import { publicInstance, Service } from '@/services/config'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'
import { RecepcionModel, RecepcionAdapter } from '.'

const collection = buildPath('recepciones')

export const RecepcionService: Service<RecepcionModel.Entity> = {
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

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: RecepcionModel.UpdateEntity) => {
    const adaptedInput = RecepcionAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
