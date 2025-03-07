import { publicInstance, Service } from '@/services/config'
import { PaisModel } from '../models'
import { PaisAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('paises')

export const PaisService: Service<PaisModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return PaisAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return PaisAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return PaisAdapter.getOne.output(response.data)
  },

  create: async (data: PaisModel.CreateData) => {
    const adaptedInput = PaisAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: PaisModel.UpdateData) => {
    const adaptedInput = PaisAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
