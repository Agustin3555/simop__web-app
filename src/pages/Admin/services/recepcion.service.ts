import { publicInstance, Service } from '@/services/config'
import { RecepcionModel } from '../models'
import { RecepcionAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('recepciones')

export const RecepcionService: Service<RecepcionModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return RecepcionAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return RecepcionAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return RecepcionAdapter.getOne.output(response.data)
  },

  create: async (data: RecepcionModel.CreateData) => {
    const adaptedInput = RecepcionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
  updateOne: async (id, data: RecepcionModel.UpdateData) => {
    const adaptedInput = RecepcionAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },
  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
