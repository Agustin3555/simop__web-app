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

  getRefs: async () => {
    const response = await publicInstance.get(collection('refs'))

    return ProvinciaAdapter.getRefs.output(response.data)
  },

  getOne: async id => {
    const response = await publicInstance.get(collection(id))

    return ProvinciaAdapter.getOne.output(response.data)
  },

  create: async (data: ProvinciaModel.CreateEntity) => {
    const adaptedInput = ProvinciaAdapter.create.input(data)

    await publicInstance.post(collection(), adaptedInput)
  },

  updateOne: async (id, data: ProvinciaModel.UpdateEntity) => {
    const adaptedInput = ProvinciaAdapter.updateOne.input(data)

    await publicInstance.put(collection(id), adaptedInput)
  },

  deleteMany: async ids => await deleteManyHandler(collection, ids),
}
