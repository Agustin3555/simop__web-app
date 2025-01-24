import { publicInstance, Service } from '@/services/config'
import { ProvinciaModel } from '../models'
import { ProvinciaAdapter } from '../adapters'
import { deleteManyHandler } from '@/services/handlers'
import { buildPath } from '@/helpers'

const collection = buildPath('provincias')

export const ProvinciaService: Service<ProvinciaModel.Entity> = {
  getAll: async () => {
    const response = await publicInstance.get(collection())

    return ProvinciaAdapter.getAll.output(response.data)
  },

  getForConnect: async () => {
    const response = await publicInstance.get(collection('for-connect'))

    return ProvinciaAdapter.getForConnect.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return ProvinciaAdapter.getOne.output(response.data)
  },

  create: async (data: ProvinciaModel.CreateData) => {
    const adaptedInput = ProvinciaAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },
  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
