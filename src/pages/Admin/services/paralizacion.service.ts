import { publicInstance, Service } from '@/services/config'
import { ParalizacionModel } from '../models'
import { ParalizacionAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('paralizaciones')

export const ParalizacionService: Service<ParalizacionModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return ParalizacionAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return ParalizacionAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return ParalizacionAdapter.getOne.output(response.data)
  },

  create: async (data: ParalizacionModel.CreateData) => {
    const adaptedInput = ParalizacionAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
